export type LoginCredentialsDTO = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponse = {
  user: AuthUser;
  token: string;
  refreshToken: string;
};

export type AuthUser = {
  id: string;
  acessType: string;
  email: string;
  name: string;
  companyId: string;
};
