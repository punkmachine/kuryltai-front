export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadResetPass {
  password: string;
  confirm_password: string;
  profile_uuid: string;
  security_token: string;
}

export interface IPayloadSignUp {
  email: string;
  password: string;
  confirm_password: string;
}

export interface IPayloadCheckEmail {
  email: string;
}

export interface IPayloadGetAccessByRefresh {
  refresh: string;
}

export interface IPayloadLogout {
  refresh: string;
}

export interface IPayloadForgetEmail {
  email: string;
}

export interface IPayloadChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
