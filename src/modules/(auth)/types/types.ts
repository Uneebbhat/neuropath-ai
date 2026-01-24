export type APIResponse<T = unknown> = {
  data: T;
  message: string;
  error?: string;
  token?: string;
  status: number;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string
}