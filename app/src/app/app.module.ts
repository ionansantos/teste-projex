import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImoveisComponent } from './imoveis/imoveis.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, ImoveisComponent, HomeComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
