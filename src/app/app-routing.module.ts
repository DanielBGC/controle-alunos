import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

import { HomeComponent } from "./views/home/home.component"
import { AlunoCrudComponent } from "./views/aluno-crud/aluno-crud.component"


const routes: Routes = [
  {
    path: "",
    component: HomeComponent 
  }, 
  {
    path: "alunos",
    component: AlunoCrudComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
