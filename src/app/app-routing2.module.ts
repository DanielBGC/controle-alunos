import { Routes } from '@angular/router'; 

// COMPONENTES
import { HomeComponent } from "./views/home/home.component"
import { AlunoReadComponent } from './components/aluno/aluno-read/aluno-read.component';

import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { BackgroundComponent } from './views/background/blank.component'
import { NotfoundComponent } from './views/authentication/404/not-found.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: BackgroundComponent,
    children: [
      {
        path: "home",
        component: HomeComponent 
      }, 
      {
        path: "alunos",
        component: AlunoReadComponent
      },
      {
        path: "pagamentos",
        component: PagamentosComponent
      }
    ]
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
]