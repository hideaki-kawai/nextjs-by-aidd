/**
 * ユーザー情報の型
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  updatedAt: Date;
}
