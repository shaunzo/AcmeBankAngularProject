import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountService } from './services/account.service';
import { AccountsRoutingModule } from './accounts-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [AccountListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AccountsRoutingModule,
    MatToolbarModule
  ],
  exports: [AccountListComponent],
  providers: [AccountService]
})
export class AccountsModule { }
