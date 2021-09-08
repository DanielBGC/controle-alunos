import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../aluno.model';


@Component({
  selector: 'app-aluno-read',
  templateUrl: './aluno-read.component.html',
  styleUrls: ['./aluno-read.component.css']
})

export class AlunoReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;

  //VARIÁVEIS
  baseUrl = 'http://localhost:3000/api/alunos'
  displayedColumns = ['id', 'nome', 'idade', 'turma', 'action']
  contentView = 1;
  displayedColumnsUpdate = ['dia', 'horario']

  alunos: Aluno[];
  selectAlunos = [];
  selectedValue: string;

  dataSource = new MatTableDataSource([{id: 1, nome: 'José', idade: 5}, {id: 2, nome: 'Maria', idade: 9}]);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

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

  objFormFilter = {
      nome : ''
    , idade: null
  }

  constructor(
    private alunoService: AlunoService
  ) { }

  async ngOnInit() {
    this.filtrarTabela();
  }

  async filtrarTabela() {
    let arrAlunos = []

    await this.alunoService.get(this.baseUrl)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          arrAlunos.push(element)
        });
    })

    this.alunos = arrAlunos;

    this.selectAlunos = arrAlunos;

    this.dataSource = new MatTableDataSource(this.selectAlunos);
    this.dataSource.sort = this.sort;
  }

  filtrarAlunos() {
    console.log(this.objFormFilter)
    let filterNome = this.objFormFilter.nome.toLowerCase();
    let filterIdade = this.objFormFilter.idade;

    this.selectAlunos = this.alunos.filter(aluno => aluno.nome.toLowerCase().includes(filterNome))

    if(filterIdade != null) {
      this.selectAlunos = this.selectAlunos.filter(aluno => aluno.idade == +filterIdade)
    }

    this.dataSource = new MatTableDataSource(this.selectAlunos);
    this.dataSource.sort = this.sort;
  }

  limparFiltros() {
    this.objFormFilter = {
        nome : ''
      , idade: null
    }

    this.filtrarAlunos()
  }

  goHome(): void {
    this.contentView = 1;
  }

  openCreate(): void {
    this.contentView = 2;

    this.alunoCreate = {
      nome: '',
      idade: null,
      turma: '',
      aulas: []
    }  
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
        this.filtrarTabela();

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
        this.filtrarTabela();
      })
    }
  }

  saveDelete(id): void {
    this.alunoService.delete(id).subscribe(() => {
      this.alunoService.showMessage("Aluno excluído com sucesso!")
      this.goHome();
      this.filtrarTabela();
    })
  }


}
