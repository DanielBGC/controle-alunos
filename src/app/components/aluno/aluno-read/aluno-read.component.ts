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

  public  objFormFilter   : FormGroup;
  public  objFormRegister : FormGroup;
  public  objFormAulas    : FormArray;

  //VARIÁVEIS
  contentView = 1;

  displayedColumns = ['id', 'nome', 'turma', 'action']
  displayedColumnsAulas = ['dia', 'hora_inicio', 'hora_fim']

  alunos: Aluno[];
  selectAlunos = [];
  selectedValue: string;

  dataSource = new MatTableDataSource();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  aluno: Aluno = {
    nome: '',
    turma: '',
    aulas: []
  }

  alunoView = {
    nome: '',
    aulas: [] 
  }

  alunoDelete: Aluno = {
    nome: '',
    turma: '',
    aulas: []
  }

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
      routeUrl: "/alunos"
    }

    this.objFormFilter = this.formBuilder.group({ 
        nome : ['']
      , turma: ['']
    })

    this.objFormRegister = this.formBuilder.group({
        id   : ['']
      , nome : ['', Validators.required]
      , turma: ['', Validators.required]
      , aulas: [[], Validators.required]
    })

    this.objFormAulas = this.formBuilder.array([
      this.getFormAula()
    ])
  }

  async ngOnInit() {
    this.findDataTable();
  }

  async findDataTable() {
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
    let filterNome = this.objFormFilter.value['nome'] != null ? this.objFormFilter.value['nome'].toLowerCase() : '';
    let filterTurma = this.objFormFilter.value['turma'] != null ? this.objFormFilter.value['turma'] : '';

    this.selectAlunos = this.alunos.filter(aluno => aluno.nome.toLowerCase().includes(filterNome))
    this.selectAlunos = this.selectAlunos.filter(aluno => aluno.turma.includes(filterTurma))

    this.dataSource = new MatTableDataSource(this.selectAlunos);
    this.dataSource.sort = this.sort;
  }

  limparFiltros() {
    this.objFormFilter.reset()
  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  goHome(): void {
    this.contentView = 1;
    this.objFormRegister.reset();
    this.findDataTable()
  }

  close() {
    this.modalService.dismissAll();
  }

  openCreate(): void {
    this.contentView = 2;
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

    this.objFormRegister.controls['id'].setValue(obj.id);
    this.objFormRegister.controls['nome'].setValue(obj.nome);
    this.objFormRegister.controls['turma'].setValue(obj.turma)

    // let alunoRes : Aluno;

    // await this.alunoService.get(ApiUrl + '/alunos/' + id)
    //   .then(function (res: any) {
    //     res.forEach((element: Aluno) => {
    //       alunoRes = element;
    //     });
    // })

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
    if(this.objFormRegister.value['nome'] == "" 
      || this.objFormRegister.value['nome'] == " " 
      || this.objFormRegister.value['nome'] == undefined 
      || this.objFormRegister.value['nome'] == null) {
      this.alunoService.showMessage("Preencha o nome corretamente!")
    }
    else if(this.objFormRegister.value['turma'] + "" == "" 
      || this.objFormRegister.value['turma'] + "" == " " 
      || this.objFormRegister.value['turma'] == undefined 
      || this.objFormRegister.value['turma'] == null) {
      this.alunoService.showMessage("Preencha a turma corretamente!")
    }
    else {
      if(this.objFormAulas.length > 0) {
        this.objFormRegister.value['aulas'] = this.objFormAulas.value;
      } else {
        this.objFormRegister.value['aulas'] = []
      }

      console.log(this.objFormRegister.value)
      
      this.alunoService.create(this.objFormRegister.value).subscribe((data) => {  
        console.log(data)
        this.alunoService.showMessage("Aluno inserido com sucesso!")
        this.goHome();
        this.findDataTable();
      })
    }
  }

  saveUpdate(): void {
    if(this.objFormRegister.value['nome'] == "" 
      || this.objFormRegister.value['nome'] == " " 
      || this.objFormRegister.value['nome'] == undefined 
      || this.objFormRegister.value['nome'] == null) {
      this.alunoService.showMessage("Preencha o nome corretamente!")
    }
    else if(this.objFormRegister.value['turma'] == "" 
          || this.objFormRegister.value['turma'] == " " 
          || this.objFormRegister.value['turma'] == undefined 
          || this.objFormRegister.value['turma'] == null) {
      this.alunoService.showMessage("Preencha a turma corretamente!")
    }
    else {
      delete this.objFormRegister.value['aulas'];

      console.log(this.objFormRegister.value)
      this.alunoService.update(this.objFormRegister.value).subscribe(() => {
        this.alunoService.showMessage("Aluno atualizado com sucesso!")
        this.goHome();
        this.findDataTable();
      })
    }
  }

  saveDelete(id): void {
    this.alunoService.delete(id).subscribe(() => {
      this.alunoService.showMessage("Aluno excluído com sucesso!")
      this.goHome();
      this.findDataTable();
    })
  }

  async openAulas(obj) {
    this.contentView = 5;

    let arrAulas = []
    await this.alunoService.putRequest(ApiUrl + '/alunos/aulas/' + obj.id, {})
    .then((res: any) => {
      res.forEach(aula => {
        arrAulas.push({dia: aula.dia, hora_inicio: aula.hora_inicio, hora_fim: aula.hora_fim})
      })
    })

    this.alunoView.nome = obj.nome;
    this.alunoView.aulas = arrAulas;
  }
}
