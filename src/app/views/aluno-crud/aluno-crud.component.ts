import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-aluno-crud',
  templateUrl: './aluno-crud.component.html',
  styleUrls: ['./aluno-crud.component.css']
})
export class AlunoCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService) { 
      this.headerService.headerData = {
        title: "Cadastro de alunos",
        icon: "face",
        routeUrl: "/alunos"
      }
  }

  ngOnInit(): void {
  }

  navigateToAlunoCreate(): void {
    this.router.navigate(["alunos/create"])
  }

}
