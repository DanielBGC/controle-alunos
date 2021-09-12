import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComboboxServices } from 'src/app/services/combobox.service';
import { UtilsServices } from './../../../services/utils.service';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../aluno.model';
import { ApiUrl } from 'src/app/constants';
import { HeaderService } from '../../template/header/header.service';


@Component({
  selector: 'app-aluno-read',
  templateUrl: './aluno-read.component.html',
  styleUrls: ['./aluno-read.component.css']
})

export class AlunoReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("modalAulas") modalAulas;

  //VARIÁVEIS
  displayedColumns = ['id', 'nome', 'turma', 'action']
  displayedColumnsAulas = ['dia', 'horario']

  contentView = 1;

  alunos: Aluno[];
  selectAlunos = [];
  selectedValue: string;

  dataSource = new MatTableDataSource();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  aluno: Aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  alunoView = {
    nome: '',
    aulas: [
        {dia: 'Segunda-feira', horario: '08h00 - 09h00'}
      , {dia: 'Quarta-feira', horario: '13h00 - 14h30'}
    ] 
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
  }

  public  objFormRegister : FormGroup;
  public  objFormAulas    : FormArray;

  constructor(
    private headerService   : HeaderService,
    private modalService    : NgbModal, 
    private toastr          : ToastrService,
    private alunoService    : AlunoService,
    private formBuilder     : FormBuilder,
    private utilServices    : UtilsServices,
    public  comboboxServices: ComboboxServices
  ) { 
    this.headerService.headerData = {
      title: "Alunos",
      icon: "face",
      routeUrl: ""
    }

    this.objFormRegister = this.formBuilder.group({
        nome : ['', Validators.required]
      , turma: ['', Validators.required]
      , aulas: [[], Validators.required]
    })

    this.objFormAulas = this.formBuilder.array([
      this.getFormAula()
    ])
  }

  async ngOnInit() {
    this.filtrarTabela();
  }

  async filtrarTabela() {
    let arrAlunos = []

    await this.alunoService.get(ApiUrl + "/alunos")
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

    this.selectAlunos = this.alunos.filter(aluno => aluno.nome.toLowerCase().includes(filterNome))

    this.dataSource = new MatTableDataSource(this.selectAlunos);
    this.dataSource.sort = this.sort;
  }

  limparFiltros() {
    this.objFormFilter = {
        nome : ''
    }

    this.filtrarAlunos()
  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  goHome(): void {
    this.contentView = 1;
  }

  close() {
    this.modalService.dismissAll();
  }

  openAulas(obj): void {
    this.contentView = 5;
    // this.openModal(this.modalAulas)

    this.alunoView.nome = obj.nome;
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

  getFormAula() {
    return this.formBuilder.group({
        dia             : ['', Validators.required]
      , horarioInicio   : ['', Validators.required]
      , horarioFim      : ['', Validators.required]
    })
  }

  addFormAula() {
    this.objFormAulas.push(this.getFormAula())
  }

  removeFormAula(i) {
    this.objFormAulas.removeAt(i)
  }

  async openUpdate(obj) {
    console.log(obj)
    this.contentView = 3;
    let id = obj.id;

    let alunoRes : Aluno;

    await this.alunoService.get(ApiUrl + '/alunos/' + id)
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

    await this.alunoService.get(ApiUrl + '/alunos/' + id)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          alunoRes = element;
        });
    })

    this.alunoDelete = alunoRes;
  }

  saveCreate(): void {

    if(this.objFormRegister.controls['nome'].value == "" 
      || this.objFormRegister.controls['nome'].value == " " 
      || this.objFormRegister.controls['nome'].value == undefined 
      || this.objFormRegister.controls['nome'].value == null) {
      this.alunoService.showMessage("Preencha o nome corretamente!")
    }
    else if(this.objFormRegister.controls['turma'].value + "" == "" 
      || this.objFormRegister.controls['turma'].value + "" == " " 
      || this.objFormRegister.controls['turma'].value == undefined 
      || this.objFormRegister.controls['turma'].value == null) {
      this.alunoService.showMessage("Preencha a turma corretamente!")
    }
    else {
      if(this.objFormAulas.length > 0) {
        this.objFormRegister.controls['aulas'].setValue(this.objFormAulas.value)
      }

      console.log(this.objFormRegister.value)
      
      this.alunoService.create(this.objFormRegister.value).subscribe((data) => {  
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
