import axios from 'axios';
// import Cookies from 'js-cookie';

// import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// import router from '@/router';

// import { api } from '.';

const client = axios.create({
  baseURL: 'http://kuryltai.kz/api/v0',
});

export { client };
