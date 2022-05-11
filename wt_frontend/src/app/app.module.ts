import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BoekenlijstComponent } from './boekenlijst/boekenlijst.component';
import { ReserveringenComponent } from './reserveringen/reserveringen.component';
import { BoekenpaginaComponent } from './boekenpagina/boekenpagina.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProfielpaginaComponent } from './profielpagina/profielpagina.component';
import { LogboekComponent } from './logboek/logboek.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    BoekenlijstComponent,
    ReserveringenComponent,
    BoekenpaginaComponent,
    UseraccountsComponent,
    ProfielpaginaComponent,
    LogboekComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
