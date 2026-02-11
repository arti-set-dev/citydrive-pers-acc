export interface LoginForm {
  name: string;
  email: string;
  password: string;
  isAuth: boolean;
}

export interface LoginSchema {
  data: LoginForm;
}
