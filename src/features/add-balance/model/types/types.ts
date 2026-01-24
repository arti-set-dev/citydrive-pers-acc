import { Invoice } from '@/entities/Invoice';

export interface Balance {
  balance: string;
}

export type AddBalanceRequest = Pick<Invoice, 'amount' | 'title'> & {
  employeeId?: Invoice['employeeId'];
  period?: Partial<Invoice['period']>;
};
