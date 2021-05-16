
export class AccountBase {

  balance: number;
  balanceWithdrawalLimit: number;
  canWithDraw: boolean;
  accountNumber: string;
  accountType: string;

  constructor(balance: number, accountNumber: string) {
    this.balance = balance;
    this.accountNumber = accountNumber;
  }

  checkWithDraw(): boolean {
    return this.balance > this.balanceWithdrawalLimit ? true : false;
  }

}
