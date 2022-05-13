import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoekenlijstComponent } from './boekenlijst/boekenlijst.component';
import { BoekenpaginaComponent } from './boekenpagina/boekenpagina.component';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { ProfielpaginaComponent } from './profielpagina/profielpagina.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { RegisterComponent } from './register/register.component';
import { ReserveringenComponent } from './reserveringen/reserveringen.component';
import { LogboekComponent } from './logboek/logboek.component';
import { CanActivate } from '@angular/router';
import { LoggedIn, isAdmin } from './service/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user', component: BoardUserComponent, canActivate: [LoggedIn]},
  { path: 'boekenlijst', component: BoekenlijstComponent, canActivate: [LoggedIn]},
  { path: 'boek/:title', component: BoekenpaginaComponent, canActivate: [LoggedIn]},
  { path: 'reserveringen', component: ReserveringenComponent , canActivate: [LoggedIn, isAdmin]},
  { path: 'useraccounts', component: UseraccountsComponent, canActivate: [LoggedIn, isAdmin]},
  { path: 'profielpagina', component: ProfielpaginaComponent, canActivate: [LoggedIn]},
  { path: 'profielpagina/:id', component: ProfielpaginaComponent, canActivate: [LoggedIn, isAdmin]},

  { path: 'register', component: RegisterComponent, canActivate: [LoggedIn, isAdmin]},
  { path: 'mod', component: BoardModeratorComponent, canActivate: [LoggedIn, isAdmin]},
  { path: 'admin', component: BoardAdminComponent, canActivate: [LoggedIn, isAdmin]},
  { path: 'logboek', component: LogboekComponent, canActivate: [LoggedIn, isAdmin]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
