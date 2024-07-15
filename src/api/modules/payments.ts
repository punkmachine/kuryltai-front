import type { AxiosInstance } from 'axios';

// eslint-disable-next-line max-lines-per-function
export const payments = (client: AxiosInstance) => {
  return {
    getPaymentsCards: (): Promise<any> => {
      return client.get('/payments/cards/');
    },
    // createPaymentsCard: (payload: any): Promise<any> => {
    //   return client.post('/payments/cards/', payload);
    // },
    editPaymentsCard: (payload: any, uuid: string): Promise<any> => {
      return client.patch(`/payments/cards/${uuid}`, payload);
    },
    deletePaymentsCard: (uuid: string): Promise<any> => {
      return client.delete(`/payments/cards/${uuid}`);
    },
    makeDonate: (payload: any): Promise<any> => {
      return client.post(`/payments/make-donation/`, payload);
    },
    makeMembership: (payload: any): Promise<any> => {
      return client.post(`/payments/make-payment/`, payload);
    },
    getStatistics: (type: 'IN' | 'OUT', page: number): Promise<any> => {
      return client.get(`/payments/payment-statistics/?page=${page}&payment_type=${type}`);
    },
    makePayout: (payload: any): Promise<any> => {
      return client.post(`/payments/make-payout/`, payload);
    },
  };
};
