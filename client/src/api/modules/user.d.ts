export interface UserSignin {
  username: string;
  password: string;
}

export interface UserSignup {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface UserPasswordUpdate {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
