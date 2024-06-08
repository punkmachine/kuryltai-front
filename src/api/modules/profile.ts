import type { AxiosInstance } from 'axios';

// eslint-disable-next-line max-lines-per-function
export const memberships = (client: AxiosInstance) => {
  return {
    getMyProfile: (): Promise<any> => {
      return client.get('/profiles/profile/me/');
    },
    getProfileBySlug: (slug: string): Promise<any> => {
      return client.get(`/profiles/profile/get-by-slug/${slug}/`);
    },
    searchProfileByUsername: (name: string): Promise<any> => {
      return client.get(`/profiles/profile/?search=${name}`);
    },
    toggleFollowProfile: (slug: string): Promise<any> => {
      return client.post(`/profiles/profile/${slug}/follow/`);
    },
    getMySubscribers: (): Promise<any> => {
      return client.get(`/profiles/profile/subscribers/`);
    },
    getMySubscribed: (): Promise<any> => {
      return client.get(`/profiles/profile/subscribed/`);
    },
  };
};
