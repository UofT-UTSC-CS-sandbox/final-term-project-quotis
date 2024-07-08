export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDashboard: { userId: string };
  ProviderDashboard: { userId: string };
  CreatePost: undefined;
  Profile: { userId: string };
  UserInfo: { userId: string };
  Services: { userId: string };
  ServiceSearch: { userId: number; serviceType: string };
  UserInbox: { userId: string };
  EditUserProfile: { userId: string };
  CustomerService: undefined;
};

export interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}
