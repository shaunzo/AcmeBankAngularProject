import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account.interface';
// import { AccountCurrent } from '../models/AccountCurrent.model';
// import { AccountSavings } from '../models/AccountSavings.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  isLoadingResults = new Subject<boolean>();

  /**
   * This is merely mock data to be used for development and testing
   */

  mockAccountDataResponse: Account[] = [
    {
      account_number: '6331103626640816',
      account_type: 'cheque',
      balance: -296.65
    }, {
      account_number: '5248117462997084',
      account_type: 'savings',
      balance: -20.00
    }, {
      account_number: '3581474249964105',
      account_type: 'savings',
      balance: 980.20
    }, {
      account_number: '6709502417011422',
      account_type: 'savings',
      balance: 905.81
    }, {
      account_number: '5308160489139568',
      account_type: 'cheque',
      balance: -986.10
    }, {
      account_number: '3559243852997209',
      account_type: 'cheque',
      balance: 531.75
    }, {
      account_number: '3585913435866604',
      account_type: 'cheque',
      balance: 253.14
    }, {
      account_number: '3564003756077737',
      account_type: 'savings',
      balance: 896.79
    }, {
      account_number: '3543910523783643',
      account_type: 'cheque',
      balance: -590.47
    }, {
      account_number: '3532070362684767',
      account_type: 'savings',
      balance: 58.00
    }
  ];

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {

    this.isLoadingResults.next(true);
    return this.http.get(environment.api.accounts);
    // const res: any[] = this.mockAccountDataResponse.map( (i: Account) => {
    //   if (i.account_type === 'cheque') {
    //     return new AccountCurrent(i.balance, i.account_number);
    //   } else if (i.account_type === 'savings') {
    //     return new AccountSavings(i.balance, i.account_number);
    //   }
    // });
    // this.isLoadingResults.next(false);
    // return res;
  }

  /**
   * TODO: for production, withdraw() will need to make a call to an API.
   * Basic logic would be to take a param of amount to withdraw which is subtracted from
   * the balance. For purposes of this example, a simple alert() was called.
   */

  withdraw(): void {
    alert('Success!');
  }
}
