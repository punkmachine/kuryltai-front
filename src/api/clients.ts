import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'vue3-toastify';
import Cookies from 'js-cookie';

import { api } from '.';
import { authCookies } from '@/entities/constants/browserStoreKeys';
import { goToLogin } from '@/helpers/goToLoginPage';

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

function errorToast(error: AxiosError<{ error: { message: string } }>) {
  if (error.response?.request?.responseURL.includes('check-email')) return;

  if (error.response?.data?.error?.message) {
    toast.error(error.response.data.error.message);
  }
}

function requestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = Cookies.get(authCookies.access);

  if (token) {
    if (!config.headers) {
      config.headers = {} as any;
    }

    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}

function requestError(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function successResponse<T>(data: AxiosResponse<T>): T {
  return data.data;
}

// eslint-disable-next-line max-lines-per-function
function errorResponse(error: AxiosError<{ error: { message: string } }>): Promise<never> {
  if (error.response?.status === 401) {
    const refresh = Cookies.get(authCookies.refresh);

    if (!refresh) {
      goToLogin();
    } else {
      api.auth
        .getAccessByRefreshToken({ refresh })
        .then(data => {
          Cookies.set(authCookies.access, data.access);

          return axios({
            ...error.config,
            // @ts-ignore
            headers: { ...error.config.headers, Authorization: `Bearer ${data.access}` },
          });
        })
        .catch(() => {
          goToLogin();
        });
    }
  } else {
    errorToast(error);
  }

  return Promise.reject(error);
}

client.interceptors.request.use(requestSuccess, requestError);
client.interceptors.response.use(successResponse, errorResponse);

export { client };
