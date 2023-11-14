import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ImoveisComponent } from './imoveis/imoveis.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardFormComponent } from './components/card-form/card-form.component';

import { AuthService } from './services/auth.service';
import { ModalService } from './services/serviceComponents/modal.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ImoveisComponent,
    HomeComponent,
    HeaderComponent,
    AuthComponent,
    SidebarComponent,
    ProfileComponent,
    RegisterComponent,
    CardFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 15000,
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
  ],
  providers: [AuthService, AuthGuard, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
