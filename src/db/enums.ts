export const WishStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
} as const;
export type WishStatus = (typeof WishStatus)[keyof typeof WishStatus];
export const Category = {
  DREAM: 'DREAM',
  HEALTH: 'HEALTH',
  HUMAN_RELATIONSHIP: 'HUMAN_RELATIONSHIP',
  MONEY: 'MONEY',
  ACHEIVE: 'ACHEIVE',
  EDUCATION: 'EDUCATION',
  ETC: 'ETC',
} as const;
export type Category = (typeof Category)[keyof typeof Category];
