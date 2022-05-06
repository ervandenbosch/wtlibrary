import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoekenlijstComponent } from './boekenlijst/boekenlijst.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReserveringenComponent } from './reserveringen/reserveringen.component';
import { ProfielpaginaComponent } from './profielpagina/profielpagina.component';

const routes: Routes = [
  { path: '', component: BoekenlijstComponent },
  { path: 'login', component: LoginComponent },
  { path: 'boekenlijst', component: BoekenlijstComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'reserveringen', component: ReserveringenComponent},
  { path: 'profielpagina', component: ProfielpaginaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
