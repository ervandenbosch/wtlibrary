import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { BoekenlijstComponent } from './boekenlijst/boekenlijst.component';
import { ReserveringenComponent } from './reserveringen/reserveringen.component';
import { BoekenpaginaComponent } from './boekenpagina/boekenpagina.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProfielpaginaComponent } from './profielpagina/profielpagina.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { LogboekComponent } from './logboek/logboek.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { isAdmin, LoggedIn } from './service/auth.service';
import { MijnhistoryComponent } from './mijnhistory/mijnhistory.component';
import { MijnboekenComponent } from './mijnboeken/mijnboeken.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    BoekenlijstComponent,
    ReserveringenComponent,
    BoekenpaginaComponent,
    UseraccountsComponent,
    ProfielpaginaComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    LogboekComponent,
    MijnhistoryComponent,
    MijnboekenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [authInterceptorProviders, LoggedIn, isAdmin],
  bootstrap: [AppComponent],
})
export class AppModule {}
