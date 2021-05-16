
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';

const accountsRoutes: Routes = [
  {path: '', component: AccountListComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(accountsRoutes)],
  exports: [ RouterModule ]
})

export class AccountsRoutingModule {}
