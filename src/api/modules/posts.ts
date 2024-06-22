import type { AxiosInstance } from 'axios';

// eslint-disable-next-line max-lines-per-function
export const posts = (client: AxiosInstance) => {
  return {
    getMyPosts: (): Promise<any> => {
      return client.get('/contents/post/get/');
    },
    getPostById: (id: number | string): Promise<any> => {
      return client.get(`/contents/post/${id}/`);
    },
    getPostsBySlug: (slug: string): Promise<any> => {
      return client.get(`/contents/post/${slug}/`);
    },
    editPostById: (payload: any, id: number | string): Promise<any> => {
      return client.patch(`/contents/post/${id}/`, payload);
    },
    deletePostById: (id: number | string): Promise<any> => {
      return client.delete(`/contents/post/${id}/`);
    },
    createPost: (payload: any): Promise<any> => {
      return client.post(`/contents/post/`, payload);
    },
  };
};
