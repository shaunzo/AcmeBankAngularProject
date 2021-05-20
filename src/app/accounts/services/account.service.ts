import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  isLoadingResults = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    this.isLoadingResults.next(true);
    return this.http.get(environment.api.accounts);
  }

  /**
   * TODO: for production, withdraw() will need to make a call to an API.
   * Basic logic would be to take a param of amount to withdraw which is subtracted from
   * the balance. For purposes of this example, a simple alert() was called.
   */

  withdraw(): void {
    alert('Success!');
  }

  getTotalBalance(accounts: Account[]): number {

    const balances = accounts.map((i) => {
      return +i.balance;
    });

    console.log(balances);

    const total = balances.reduce((a, b) => a + b);
    console.log(total);

    return total;

  }
}
