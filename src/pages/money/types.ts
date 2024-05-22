import type { ICard } from '@/entities/types/types';

export type TMoneyState = 'withdrawal' | 'history' | 'income';

export interface IAsideItems {
  key: TMoneyState;
  label: string;
}

export interface ICreatePaymentBase {
  sum: string;
}

export interface ICreatePaymentWithCard extends ICreatePaymentBase {
  cardId: string;
}

export interface ICreatePaymentWithNewCard extends ICreatePaymentBase {
  cardData: ICard;
}
