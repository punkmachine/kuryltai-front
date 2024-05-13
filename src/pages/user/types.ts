import type { ICard } from '@/types/types';

export interface ISendDonateBase {
  sum: string;
}

export interface ISendDonateWithCard extends ISendDonateBase {
  cardId: string;
}

export interface ISendDonateWithNewCard extends ISendDonateBase {
  cardData: ICard;
}

export interface ISubscribeWithNewCard extends ICard {}
export interface ISubscribeWithCard {
  cardId: string;
}
