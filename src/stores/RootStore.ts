import { makeAutoObservable } from "mobx";
import { Post, User, Comment } from "../types/User";

class RootStore {
  currentUser: User | null = null;
  users: User[] = [];
  posts: Post[] = [];
  isLoading = false;
  // authStore: AuthStore;

  // constructor(authStore: AuthStore) {
  //   this.authStore = authStore;
  //   makeAutoObservable(this);
  // }

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  addPost(content: string) {
    if (!this.currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: this.currentUser,
      content,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };

    this.posts = [newPost, ...this.posts]; // Иммутабельное добавление в начала массива
  }

  addCommentToPost(postId: string, commentText: string) {
    if (!this.currentUser) return;

    // Иммутабельное добавление комментария
    this.posts = this.posts.map((post) => {
      if (post.id !== postId) return post;

      const newComment: Comment = {
        id: Date.now().toString(),
        author: this.currentUser!,
        content: commentText,
        createdAt: new Date(),
      };

      return {
        ...post,
        comments: [...(post.comments || []), newComment],
      };
    });
  }

  likePost(postId: string) {
    // Иммутабельное обновление лайков
    this.posts = this.posts.map((post) => {
      if (post.id !== postId) return post;
      return { ...post, likes: post.likes + 1 };
    });
  }
}

export const rootStore = new RootStore();
export type { RootStore };
