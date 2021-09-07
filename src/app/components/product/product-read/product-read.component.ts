import { AlunoService } from './../aluno.service';
import { Aluno } from './../product.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  aluno: Aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  alunoCreate: Aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  alunoUpdate: Aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  alunoDelete: Aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  baseUrl = 'http://localhost:3000/api/alunos'
  alunos: Aluno[]
  displayedColumns = ['id', 'name', 'age', 'class', 'action']
  contentView = 1;
  displayedColumnsUpdate = ['dia', 'horario']


  constructor(
    private alunoService: AlunoService,
    ) { }

  async ngOnInit() {
    // this.alunoService.read().subscribe(data => {
    //   console.log(data)
    //   this.alunos = data;
    // })
    this.filtrar();
  }

  async filtrar() {
    let arrAlunos = []

    await this.alunoService.get(this.baseUrl)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          arrAlunos.push(element)
        });
    })

    this.alunos = arrAlunos;
  }

  goHome(): void {
    this.contentView = 1;
  }

  // navigateToAlunoCreate(): void {
  //   this.router.navigate(["alunos/create"])
  // }

  openCreate(): void {
    this.contentView = 2;
  }

  async openUpdate(obj) {
    console.log(obj)
    this.contentView = 3;
    let id = obj.id;

    let alunoRes : Aluno;

    await this.alunoService.get(this.baseUrl + '/' + id)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          alunoRes = element;
        });
    })

    this.alunoUpdate = alunoRes;
  }

  async openDelete(obj) {
    console.log(obj)
    this.contentView = 4;

    let alunoRes : Aluno;
    let id = obj.id;

    await this.alunoService.get(this.baseUrl + '/' + id)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          alunoRes = element;
        });
    })

    this.alunoDelete = alunoRes;
  }

  saveCreate(): void {
    if(this.alunoCreate.nome == "" 
      || this.alunoCreate.nome == " " 
      || this.alunoCreate.nome == undefined 
      || this.alunoCreate.nome == null) {
      this.alunoService.showMessage("Preencha o nome corretamente!")
    }
    else if(this.alunoCreate.idade + "" == "" 
      || this.alunoCreate.idade + "" == " " 
      || this.alunoCreate.idade == undefined 
      || this.alunoCreate.idade == null) {
      this.alunoService.showMessage("Preencha a idade corretamente!")
    }
    else if(this.alunoCreate.turma + "" == "" 
      || this.alunoCreate.turma + "" == " " 
      || this.alunoCreate.turma == undefined 
      || this.alunoCreate.turma == null) {
      this.alunoService.showMessage("Preencha a turma corretamente!")
    }
    else {
      this.alunoService.create(this.alunoCreate).subscribe((data) => {
  
        console.log(data)
        this.alunoService.showMessage("Aluno inserido com sucesso!")
        this.goHome();
        this.filtrar();

      })
    }
  }

  saveUpdate(): void {
    if(this.alunoUpdate.nome == "" 
      || this.alunoUpdate.nome == " " 
      || this.alunoUpdate.nome == undefined 
      || this.alunoUpdate.nome == null) {
      this.alunoService.showMessage("Preencha o nome corretamente!")
    }
    else if(this.alunoUpdate.idade + "" == "" 
          || this.alunoUpdate.idade + "" == " " 
          || this.alunoUpdate.idade == undefined 
          || this.alunoUpdate.idade == null) {
      this.alunoService.showMessage("Preencha a idade corretamente!")
    }
    else {
      this.alunoService.update(this.alunoUpdate).subscribe(() => {
        this.alunoService.showMessage("Aluno atualizado com sucesso!")
        this.goHome();
        this.filtrar();
      })
    }
  }

  saveDelete(id): void {
    this.alunoService.delete(id).subscribe(() => {
      this.alunoService.showMessage("Aluno excluído com sucesso!")
      this.goHome();
      this.filtrar();
    })
  }


}
