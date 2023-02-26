import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImoveisComponent } from './imoveis/imoveis.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Inicio',
    },
  },
  {
    path: 'imoveis',
    component: ImoveisComponent,
    data: {
      title: 'Imovel',
    },
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
