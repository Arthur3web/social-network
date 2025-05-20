export interface User {
  id: string;
  username: string;
  avatar: string;
  online?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}
