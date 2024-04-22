import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'vue3-toastify';
import Cookies from 'js-cookie';

import router from '@/router';
import { api } from '.';
import { authCookies } from '@/constants/browserStoreKeys';

const client = axios.create({
  baseURL: 'https://api-kuryltai.kz/api/v0',
});

function goToLogin() {
  router.push('/auth');
  Cookies.remove(authCookies.access);
  Cookies.remove(authCookies.refresh);
}

function errorToast(error: AxiosError<{ error: { message: string } }>) {
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
    const refresh = Cookies.get('refresh');

    if (!refresh) {
      goToLogin();
    } else {
      api.auth
        .getAccessByRefreshToken({ refresh })
        .then(data => {
          Cookies.set(authCookies.access, data.access);
          Cookies.set(authCookies.refresh, data.refresh);

          return axios({
            ...error.config,
            // @ts-ignore
            headers: { ...error.config.headers, Authorization: `Bearer ${data.token}` },
          });
        })
        .catch(goToLogin);
    }
  } else {
    errorToast(error);
  }

  return Promise.reject(error);
}

client.interceptors.request.use(requestSuccess, requestError);
client.interceptors.response.use(successResponse, errorResponse);

export { client };
