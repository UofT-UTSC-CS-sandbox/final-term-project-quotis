export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDashboard: undefined;
  ProviderDashboard: undefined;
  CreatePost: undefined;
};


export interface Post {
  _id: string;
  title: string;
  description: string;
}
