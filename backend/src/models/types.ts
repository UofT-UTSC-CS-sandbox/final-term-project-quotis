export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDashboard: { userId: string };
  ProviderDashboard: { userId: string };
  CreatePost: { userId: string }; // 여기서 userId를 매개변수로 정의합니다.
  PostList: { userId: string };
  Profile: { userId: string };
  UserInfo: { userId: string };
  Services: { userId: string };
  ServiceSearch: { userId: number; serviceType: string };
  UserInbox: { userId: string };
  EditUserProfile: { userId: string }; // Added this line
  ProviderInfo: { userId: string };
  Verification: undefined;
  EditProviderInfo: {userId:string}
};

export interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // 필요한 다른 속성들 추가
  };
}