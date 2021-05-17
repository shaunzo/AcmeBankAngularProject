import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AccountListDataSource } from './account-list-datasource';
import { AccountService } from '../services/account.service';
import { AccountCurrent } from '../models/AccountCurrent.model';
import { AccountSavings } from '../models/AccountSavings.model';
import { Account } from '../interfaces/account.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Account>;
  dataSource: AccountListDataSource;
  accountData: Account[];
  isLoadingResults = true;
  unsubscribe = new Subject();
  totalBalance: number;

  displayedColumns = ['number', 'type', 'balance', 'action'];

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getAccounts().pipe(takeUntil(this.unsubscribe))
    .subscribe( (data: Account[]) => {

      const res: any[] = data.map((i: Account) => {
        if (i.account_type === 'cheque') {
          return new AccountCurrent(i.balance, i.account_number);
        } else if (i.account_type === 'savings') {
          return new AccountSavings(i.balance, i.account_number);
        }
      });

      this.accountData = res;
      this.dataSource = new AccountListDataSource(this.accountData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.isLoadingResults = false;
      this.totalBalance = this.accountService.getTotalBalance(data);
    });

    this.accountService.isLoadingResults.pipe(takeUntil(this.unsubscribe))
    .subscribe((isLoading: boolean) => {
      this.isLoadingResults = isLoading;
    });
  }

  withdraw(): void {
    this.accountService.withdraw();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
