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

const routes: Routes = [
  { path: 'boekenlijst', component: BoekenlijstComponent},
  { path: 'reserveringen', component: ReserveringenComponent},
  { path: 'boek/:title', component: BoekenpaginaComponent},
  { path: 'useraccounts', component: UseraccountsComponent},
  { path: 'profielpagina', component: ProfielpaginaComponent },
  { path: 'profielpagina/:id', component: ProfielpaginaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  { path: 'logboek', component: LogboekComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
