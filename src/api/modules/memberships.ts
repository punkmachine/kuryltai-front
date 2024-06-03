import type { AxiosInstance } from 'axios';

// eslint-disable-next-line max-lines-per-function
export const memberships = (client: AxiosInstance) => {
  return {
    createMembership: (payload: any): Promise<any> => {
      return client.post('/profiles/membership/', payload);
    },
    deactivateMembership: (payload: any): Promise<any> => {
      return client.post('/profiles/membership/deactivate_membership_subscription/', payload);
    },
    deleteMembership: (payload: any, id: number): Promise<any> => {
      return client.delete(`/profiles/membership/${id}/`, payload);
    },
    getMembershipById: (payload: any, id: number): Promise<any> => {
      return client.get(`/profiles/membership/${id}/`, payload);
    },
    getUserMemberships: (): Promise<any> => {
      return client.get(`/profiles/membership/`);
    },
    editMembership: (payload: any, id: number): Promise<any> => {
      return client.patch(`/profiles/membership/${id}/`, payload);
    },
  };
};
