import type { AxiosInstance } from 'axios';
import type {
  IPayloadLogin,
  IPayloadLogout,
  IPayloadCheckEmail,
  IPayloadSignUp,
  IPayloadGetAccessByRefresh,
  IPayloadResetPass,
  IPayloadForgetEmail,
  IPayloadChangePassword,
} from '@/entities/types/backend/user/user.payload';
import type { IResponseLogin, IResponseSignUp } from '@/entities/types/backend/user/user.response';
import type { IResponseStandard } from '@/entities/types/backend/responses';

// eslint-disable-next-line max-lines-per-function
export const auth = (client: AxiosInstance) => {
  return {
    login: (payload: IPayloadLogin): Promise<IResponseLogin> => {
      return client.post('/users/login/', payload);
    },
    signUp: (payload: IPayloadSignUp): Promise<IResponseSignUp> => {
      return client.post('/users/signup/', payload);
    },
    checkEmail: (payload: IPayloadCheckEmail): Promise<any> => {
      return client.post('/users/check-email/', payload);
    },
    getAccessByRefreshToken: (payload: IPayloadGetAccessByRefresh): Promise<IResponseLogin> => {
      return client.post('/users/token/refresh/', payload);
    },
    logout: (payload: IPayloadLogout): Promise<IResponseStandard> => {
      return client.post('/users/logout/', payload);
    },
    resetPassword: (payload: IPayloadResetPass): Promise<IResponseStandard> => {
      return client.post('/profiles/reset-password/', payload);
    },
    forgetPassword: (payload: IPayloadForgetEmail): Promise<IResponseStandard> => {
      return client.post('/profiles/forget-password/', payload);
    },
    changePassword: (payload: IPayloadChangePassword): Promise<IResponseStandard> => {
      return client.post('/profiles/change-password/', payload);
    },
    googleAuth: (queryUrl: string): Promise<IResponseLogin> => {
      return client.get(`/users/auth/login/google/${queryUrl}`);
    },
  };
};
