import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AccountService } from '../services/account.service';
import { MockData } from '../services/mockData';
import { AccountListComponent } from './account-list.component';
import { of } from 'rxjs';
import { AccountListDataSource } from './account-list-datasource';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccountCurrent } from '../models/AccountCurrent.model';
import { AccountSavings } from '../models/AccountSavings.model';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let httpClient: HttpClient;
  let service: AccountService;
  const response = MockData;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountListComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule
      ],
      providers: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AccountService);
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.nativeElement.style.visibility = 'hidden';
  });

  it('should compile the Account List Component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table element', () => {
    const table = fixture.nativeElement.querySelector('[data-test="table"]');
    expect(table).toBeTruthy();
  });

  it('should contain a config for the "Account Number", "Account Type", "Balance" and "Action" columns', () => {
    expect(component.displayedColumns).toContain('number');
    expect(component.displayedColumns).toContain('type');
    expect(component.displayedColumns).toContain('balance');
    expect(component.displayedColumns).toContain('action');
  });

  it('should display a loader on load and when it is fetching data', fakeAsync(() => {
    tick();
    const spinner = fixture.nativeElement.querySelector('[data-test="spinner"]');
    expect(component.isLoadingResults).toBe(true);
    expect(spinner).toBeTruthy();
  }));

  it('should NOT display a loader if isLoadingResults is false', fakeAsync(() => {
    component.isLoadingResults = false;
    tick();
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('[data-test="spinner"]');
    expect(spinner).toBeFalsy();
  }));

  it('should fetch data when the page loads', fakeAsync(() => {

    const dataSpy = jasmine.createSpy('spy');
    spyOn(service, 'getAccounts').and.returnValue(of(response));
    service.getAccounts().subscribe(dataSpy);

    tick();

    expect(service.getAccounts).toHaveBeenCalled();
    expect(dataSpy).toHaveBeenCalledWith(response);
  }));

  it('should display withdraw buttons for each record after data is fetched', () => {
    component.accountData = response;
    component.dataSource = new AccountListDataSource(component.accountData);
    component.dataSource.sort = component.sort;
    component.dataSource.paginator = component.paginator;
    component.table.dataSource = component.dataSource;
    component.isLoadingResults = false;
    component.totalBalance = service.getTotalBalance(response);

    fixture.detectChanges();

    const withdrawBtns = fixture.nativeElement.querySelectorAll('[data-test="withdrawBtn"]');
    expect(withdrawBtns).toBeTruthy();
    expect(withdrawBtns.length).toEqual(response.length);
  });

  it('should disable the withdraw button if canWithdraw property is false', () => {
    response[0].balance = -600;
    component.accountData = component.mapData(response);
    component.dataSource = new AccountListDataSource(component.accountData);
    component.dataSource.sort = component.sort;
    component.dataSource.paginator = component.paginator;
    component.table.dataSource = component.dataSource;
    component.isLoadingResults = false;
    component.totalBalance = service.getTotalBalance(response);
    fixture.detectChanges();

    const withdrawBtns = fixture.nativeElement.querySelectorAll('[data-test="withdrawBtn"]');
    expect(withdrawBtns[0].disabled).toBe(true);

    response[0].balance = 600;
    component.accountData = component.mapData(response);
    component.dataSource = new AccountListDataSource(component.accountData);
    component.dataSource.sort = component.sort;
    component.dataSource.paginator = component.paginator;
    component.table.dataSource = component.dataSource;
    component.isLoadingResults = false;
    component.totalBalance = service.getTotalBalance(response);
    fixture.detectChanges();

    const withdrawBtns2 = fixture.nativeElement.querySelectorAll('[data-test="withdrawBtn"]');

    expect(withdrawBtns2[0].disabled).toBe(false);

  });

  it('should call a withdraw method if withdraw button is clicked', () => {

    spyOn(service, 'withdraw').and.returnValue(null);

    component.accountData = component.mapData(response);
    component.dataSource = new AccountListDataSource(component.accountData);
    component.dataSource.sort = component.sort;
    component.dataSource.paginator = component.paginator;
    component.table.dataSource = component.dataSource;
    component.isLoadingResults = false;
    component.totalBalance = service.getTotalBalance(response);
    fixture.detectChanges();

    const withdrawBtn = fixture.nativeElement.querySelector('[data-test="withdrawBtn"]');
    withdrawBtn.click();

    expect(withdrawBtn).toBeTruthy();
    expect(service.withdraw).toHaveBeenCalled();

  });

  it('should display a total balance', () => {
    response[0].balance = -296.65;
    component.accountData = response;
    component.dataSource = new AccountListDataSource(component.accountData);
    component.dataSource.sort = component.sort;
    component.dataSource.paginator = component.paginator;
    component.table.dataSource = component.dataSource;
    component.isLoadingResults = false;
    component.totalBalance = service.getTotalBalance(response);

    fixture.detectChanges();

    const total = fixture.nativeElement.querySelector('[data-test="total-balance"]');
    expect(total).toBeTruthy();
    expect(total.textContent).toEqual(' R 1,732.47 ');
  });

  it('should not allow type savings, a withdrawal as long as it has a balance of 0 or less', () => {
    const savingsNoWithdraw = new AccountSavings(0, '1234');
    const savingsNoWithdraw2 = new AccountSavings(-10, '1234');
    const savingsCanWithdraw = new AccountSavings(100, '1234');

    expect(savingsNoWithdraw.canWithDraw).toBe(false);
    expect(savingsNoWithdraw2.canWithDraw).toBe(false);
    expect(savingsCanWithdraw.canWithDraw).toBe(true);
  });

  // an account of type cheque will allow a withdraw as long as it does not exceed the overdraft limit of 500
  it('should all type cheque, a withdraw as long as it does not exceed the overdraft limit of 500', () => {
    const chequeNoWithdraw = new AccountCurrent(-600, '1234');
    const chequeWithdraw = new AccountCurrent(-300, '1234');
    const chequeNoWithdraw2 = new AccountCurrent(-550, '1234');
    const chequeWithdraw2 = new AccountCurrent(0, '1234');

    expect(chequeNoWithdraw.canWithDraw).toBe(false);
    expect(chequeWithdraw.canWithDraw).toBe(true);
    expect(chequeNoWithdraw2.canWithDraw).toBe(false);
    expect(chequeWithdraw2.canWithDraw).toBe(true);
  });
});
