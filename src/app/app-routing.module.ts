
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', loadChildren: () => import('src/app/accounts/accounts.module').then(m => m.AccountsModule)},
  {path: 'accounts', loadChildren: () => import('src/app/accounts/accounts.module').then(m => m.AccountsModule)}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
