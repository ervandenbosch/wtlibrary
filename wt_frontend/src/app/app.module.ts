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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoedkeurModalComponent } from './reserveringen/modals/goedkeur-modal/goedkeur-modal.component';
import { AfkeurModalComponent } from './reserveringen/modals/afkeur-modal/afkeur-modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    BoekenlijstComponent,
    ReserveringenComponent,
    GoedkeurModalComponent,
    AfkeurModalComponent
  ],
  entryComponents:[
    GoedkeurModalComponent,
    AfkeurModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
