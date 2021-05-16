import { AccountBase } from './AccountBase.model';

export class AccountSavings extends AccountBase {

  constructor(balance: number, accountNumber: string) {
    super(balance, accountNumber);
    this.accountType = 'savings';
    this.balanceWithdrawalLimit = 0;
    this.canWithDraw = this.checkWithDraw();
  }

}
