export type RootStackParamList = {
  UserDashboard: undefined;
  ProviderDashboard: undefined;
  Register: undefined; // Register 화면 추가
  // 다른 화면들도 여기에 추가
};

export type Post = {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
};
