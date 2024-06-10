import type { AxiosInstance } from 'axios';

// eslint-disable-next-line max-lines-per-function
export const profile = (client: AxiosInstance) => {
  return {
    getMyProfile: (): Promise<any> => {
      return client.get('/profiles/profile/me/');
    },
    getProfileBySlug: (slug: string): Promise<any> => {
      return client.get(`/profiles/profile/${slug}`);
    },
    searchProfileByUsername: (name: string): Promise<any> => {
      return client.get(`/profiles/profile/?search=${name}`);
    },
    // toggleFollowProfile: (slug: string): Promise<any> => {
    //   return client.post(`/profiles/profile/${slug}/follow/`);
    // },
    getMySubscribers: (): Promise<any> => {
      return client.get(`/profiles/profile/subscribers/`);
    },
    getMySubscribed: (): Promise<any> => {
      return client.get(`/profiles/profile/subscribed/`);
    },
    editMyProfile: (payload: any): Promise<any> => {
      return client.patch('/profiles/profile/edit/', payload);
    },
    getBalance: (): Promise<any> => {
      return client.get('/profiles/profile/get_balance/');
    },
  };
};
