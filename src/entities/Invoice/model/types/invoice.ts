export interface Invoice {
  id: string;
  employeeId: string;
  number: number;
  legalEntity: string;
  INN: number;
  currentAccount: number;
  bank: string;
  BIC: number;
  period: {
    from: string;
    to: string;
  };
  title: string;
  VAT: number;
  amount: string;
}
