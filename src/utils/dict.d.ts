import { CHECKOUTERROR } from './dict';

export type TCheckoutError = typeof CHECKOUTERROR[keyof typeof CHECKOUTERROR];
