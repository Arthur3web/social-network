import { makeAutoObservable } from "mobx";
import { Post, User, Comment } from "../types/User";

class RootStore {
  currentUser: User | null = null;
  users: User[] = [];
  posts: Post[] = [];
  isLoading = false;

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

    this.posts.unshift(newPost);
  }

  addCommentPost(postId: string, commentText: string) {
    if (!this.currentUser) return;

    const post = this.posts.find((p) => p.id === postId);
    if (!post) {
      console.error(`Post  ${postId} not found`);
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: this.currentUser,
      content: commentText,
      createdAt: new Date(),
    };

    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(newComment);
  }

  likePost(postId: string) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.likes += 1;
    }
  }
}

export const rootStore = new RootStore();
export type { RootStore };
