export type APIResponse<T = unknown> = {
  data: T;
  message: string;
  error?: string;
  token?: string;
  status: number;
};

export interface UserData {
  id: string;
  token: string;
  name: string;
  email: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
