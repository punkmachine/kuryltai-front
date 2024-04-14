export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadResetPass {
  password: string;
  confirm_password: string;

  // "profile_uuid": "b281c520-6031-4369-9703-fb79e6d38688",
  // "security_token": "534d4994-7424-423e-9e5f-79aa402ec699e6a817ec-7bb5-4d43-a290-6f3ef51d27be",
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
