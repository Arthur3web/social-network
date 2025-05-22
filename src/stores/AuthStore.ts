import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosError } from "axios";

class AuthStore {
  token: string | null = localStorage.getItem("token") || null;
  isAuthenticated: boolean = !!this.token;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.validateToken();
  }

  async login(email: string, password: string): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post<{ token: string }>("/api/auth/login", {
        email,
        password,
      });

      runInAction(() => {
        this.token = response.data.token;
        this.isAuthenticated = true;
        localStorage.setItem("token", this.token!);
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      runInAction(() => {
        this.error = error.response?.data?.message || "Login failed";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout(): void {
    try {
      localStorage.removeItem("token");
      runInAction(() => {
        this.token = null;
        this.isAuthenticated = false;
      });
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  }

  private async validateToken(): Promise<void> {
    if (!this.token) return;

    this.isLoading = true;
    try {
      await axios.get("/api/auth/validate", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      runInAction(() => {
        this.isAuthenticated = true;
      });
    } catch (err) {
      runInAction(() => {
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem("token");
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const authStore = new AuthStore();
