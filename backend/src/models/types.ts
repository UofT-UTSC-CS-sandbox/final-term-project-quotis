import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // Add any other properties you need here
  };
}

// Ensure this is exported
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDashboard: { userId: string };
  ProviderDashboard: { userId: string };
  CreatePost: { userId: string };
  PostList: { userId: string };
  Profile: { userId: string };
  UserInfo: { userId: string };
  ServiceSearch: { userId: string; serviceType: string };
  UserInbox: { userId: string };
  EditUserProfile: { userId: string };
  MyJobs: { userId: string };
  ProviderInfo: { userId: string };
  Verification: undefined;
  EditProviderInfo: { userId: string };
  UserPost: { postId: string; userId: string };
  ProviderProfile: { userId: string };
  ProviderInbox: { userId: string };
  Services: { userId: string };
  QuoteForm: {
    postId: string;
    providerId: string;
    userId: string;
    jobDate: string;
    clientName: string; 
  };
  ProviderReview: { userId: string; clientId: string; clientName: string };
  ClientReview: { userId: string; providerId: string; providerName: string }; // Add this line
};

export interface Post {
  _id: string;
  userId: string;
  title: string;
  description: string;
  photoUrl: string;
  createdAt: string;
  likes: number;
  jobDate: string;
}

export interface PostWithUser extends Post {
  user: {
    firstName: string;
    lastName: string;
  };
}
