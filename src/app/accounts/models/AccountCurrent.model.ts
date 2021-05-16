
import { AccountBase } from './AccountBase.model';

export class AccountCurrent extends AccountBase {

  overdraft = 500;

  constructor(balance: number, accountNumber: string) {

    super(balance, accountNumber);
    this.accountType = 'cheque';
    this.balanceWithdrawalLimit = -Math.abs(this.overdraft);
    this.canWithDraw = this.checkWithDraw();
  }

}
