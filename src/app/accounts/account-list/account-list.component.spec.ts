import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AccountService } from '../services/account.service';

import { AccountListComponent } from './account-list.component';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let httpClient: HttpClient;
  let service: AccountService;

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
      providers: [AccountService]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AccountService);
    httpClient = TestBed.get(HttpClient);
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
