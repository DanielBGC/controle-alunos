import { AlunoService } from './../aluno.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Aluno } from '../product.model';

@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.css']
})
export class AlunoCreateComponent implements OnInit {

  aluno: Aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  constructor(
    private alunoService: AlunoService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  createAluno(): void {
    if(this.aluno.nome == "" 
      || this.aluno.nome == " " 
      || this.aluno.nome == undefined 
      || this.aluno.nome == null) {
      this.alunoService.showMessage("Preencha o nome corretamente!")
    }
    else if(this.aluno.idade + "" == "" 
      || this.aluno.idade + "" == " " 
      || this.aluno.idade == undefined 
      || this.aluno.idade == null) {
      this.alunoService.showMessage("Preencha a idade corretamente!")
    }
    else if(this.aluno.turma + "" == "" 
      || this.aluno.turma + "" == " " 
      || this.aluno.turma == undefined 
      || this.aluno.turma == null) {
      this.alunoService.showMessage("Preencha a turma corretamente!")
    }
    else {
      this.alunoService.create(this.aluno).subscribe((data) => {
  
        console.log(data)
        this.alunoService.showMessage("Aluno inserido com sucesso!")
        this.router.navigate(["alunos"])
  
      })
    }
  }

  cancel(): void {
    this.router.navigate(["alunos"])
  }
}
