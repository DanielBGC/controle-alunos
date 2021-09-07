import { AlunoDeleteComponent } from './components/product/aluno-delete/aluno-delete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 

import { HomeComponent } from "./views/home/home.component"
import { AlunoCrudComponent } from "./views/aluno-crud/aluno-crud.component"
import { AlunoCreateComponent } from './components/product/aluno-create/aluno-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent 
  }, 
  {
    path: "alunos",
    component: AlunoCrudComponent
  },
  {
    path: "alunos/create",
    component: AlunoCreateComponent
  },
  {
    path: "alunos/update/:id",
    component: ProductUpdateComponent
  }, 
  {
    path: "alunos/delete/:id",
    component: AlunoDeleteComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
