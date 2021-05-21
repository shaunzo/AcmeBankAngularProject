import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockData } from '../services/mockData';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Account } from '../interfaces/account.interface';

describe('AccountService', () => {
  let service: AccountService;
  let http: HttpClient;
  const response = MockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AccountService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return accounts data', fakeAsync(() => {
    const spy = jasmine.createSpy('spy');
    spyOn(http, 'get').and.returnValue(of(response));
    service.getAccounts().subscribe(spy);

    tick();

    expect(http.get).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(response);
  }));

  it('should be able to calculate a balance sum from an array of accounts', () => {
    const array: Account[] = [
      {
        account_number: '6331103626640816',
        account_type: 'cheque',
        balance: 10
      }, {
        account_number: '5248117462997084',
        account_type: 'savings',
        balance: 15
      }
    ];
    const sum = service.getTotalBalance(array);

    expect(sum).toEqual(25);
  });
});
