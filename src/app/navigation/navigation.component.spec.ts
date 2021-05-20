import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.nativeElement.style.visibility = 'hidden';
  });

  it('should compile the navigation component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the menu toggle with the wording "Menu"', () => {
    const menuBtn = fixture.nativeElement.querySelector('[data-test="menu-toggle"]');
    expect(menuBtn).toBeTruthy();
    expect(menuBtn.textContent).toEqual('Menu');
  });

  it('should contain the company name', () => {
    const companyName = fixture.nativeElement.querySelector('[data-test="companyName"]');
    expect(companyName).toBeTruthy();
    expect(companyName.textContent).toEqual('Acme Bank');
  });
});
