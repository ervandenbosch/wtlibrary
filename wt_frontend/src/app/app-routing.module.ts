import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoekenlijstComponent } from './boekenlijst/boekenlijst.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { ProfielpaginaComponent } from './profielpagina/profielpagina.component';

const routes: Routes = [
  { path: '', component: BoekenlijstComponent },
  { path: 'login', component: LoginComponent },
  { path: 'boekenlijst', component: BoekenlijstComponent},
  { path: 'useraccounts', component: UseraccountsComponent},
  { path: 'profielpagina', component: ProfielpaginaComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule {}
