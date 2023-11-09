import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImoveisComponent } from './imoveis/imoveis.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    data: {
      title: 'login',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'register',
    },
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'imoveis',
        component: ImoveisComponent,
        data: { title: 'Imovel' },
      },
    ],
  },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
