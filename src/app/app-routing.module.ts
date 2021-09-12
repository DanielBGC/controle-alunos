import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

// COMPONENTES
import { HomeComponent } from "./views/home/home.component"
import { AlunoCrudComponent } from "./views/aluno-crud/aluno-crud.component"
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { LoginComponent } from './views/authentication/login/login.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent 
  }, 
  {
    path: "home",
    component: HomeComponent 
  }, 
  {
    path: "alunos",
    component: AlunoCrudComponent
  },
  {
    path: "pagamentos",
    component: PagamentosComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
