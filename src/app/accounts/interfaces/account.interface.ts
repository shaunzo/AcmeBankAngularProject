export interface Account {
  account_number: string;
  account_type: 'cheque' | 'savings';
  balance: number;
}
