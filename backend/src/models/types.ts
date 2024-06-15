// src/models/types.ts
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDashboard: { userId: string };
  ProviderDashboard: { userId: string };
  CreatePost: undefined;
};

export interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}
