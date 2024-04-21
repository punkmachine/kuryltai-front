import axios, { type AxiosResponse, type AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
// import Cookies from 'js-cookie';

// import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// import router from '@/router';

// import { api } from '.';

const client = axios.create({
  baseURL: 'https://api-kuryltai.kz/api/v0',
});

function successResponse(data: AxiosResponse) {
  return data.data;
}

function errorResponse(error: AxiosError<{ error: { message: string } }>) {
  if (error.response?.data?.error?.message) {
    toast.error(error.response.data.error.message);
  }

  throw error;
}

client.interceptors.response.use(successResponse, errorResponse);

export { client };
