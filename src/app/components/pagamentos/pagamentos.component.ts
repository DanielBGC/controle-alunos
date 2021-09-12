import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoService } from 'src/app/services/aluno.service';
import { UtilsServices } from 'src/app/services/utils.service';
import { HeaderService } from '../template/header/header.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  //VARIÁVEIS
  baseUrl = 'http://localhost:3000/api/alunos'
  displayedColumns = ['responsavel', 'aluno', 'data', 'mes', 'valor', 'action']
  contentView = 1;

  alunos = [];
  selected = [];
  selectedValue: string;

  DATA_TESTE = [
      {responsavel: 'Maria Cardoso Silva', aluno: 'Daniel Rodrigo', data: '05/08/2021', mes: 'Julho', valor: 150}
    , {responsavel: 'Josias do Nascimento', aluno: 'Maria Joaquina', data: '06/09/2021', mes: 'Agosto', valor: 120}
  ]

  dataSource = new MatTableDataSource(this.DATA_TESTE);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  aluno = {
    nome: '',
    idade: null,
    turma: '',
    aulas: []
  }

  pagamento = {
    aluno: '',
    valor: null,
    data: ''
  }

  objFormFilter = {
    responsavel : ''
    , aluno       : ''
    , mes         : ''
    , valor       : null
    , data        : {
        inicio: ''
      , fim: ''
    }
  }

  comboboxMeses = [
      {id: 1, text: 'Janeiro'}
    , {id: 2, text: 'Fevereiro'}
    , {id: 3, text: 'Março'}
    , {id: 4, text: 'Abril'}
    , {id: 5, text: 'Maio'}
    , {id: 6, text: 'Junho'}
    , {id: 7, text: 'Julho'}
    , {id: 8, text: 'Agosto'}
    , {id: 9, text: 'Setembro'}
    , {id: 10, text: 'Outubro'}
    , {id: 11, text: 'Novembro'}
    , {id: 12, text: 'Dezembro'}
  ]

  constructor(
    private headerService : HeaderService,
    private alunoService  : AlunoService,
    private utilServices  : UtilsServices,
  ) { 
    this.headerService.headerData = {
      title: "Relatório de Pagamentos",
      icon: "attach_money",
      routeUrl: ""
    }
  }

  async ngOnInit() {
    // this.filtrarTabela();
  }

  async filtrarTabela() {
    let arrAlunos = []

    await this.alunoService.get(this.baseUrl)
      .then(function (res: any) {
        res.forEach((element) => {
          arrAlunos.push(element)
        });
    })

    this.alunos = arrAlunos;

    this.selected = arrAlunos;

    // this.dataSource = new MatTableDataSource(this.selectAlunos);
    // this.dataSource.sort = this.sort;
  }

  filtrarPagamentos() {
    console.log(this.objFormFilter)
    let filterResponsavel = this.objFormFilter.responsavel.toLowerCase();
    let filterAluno = this.objFormFilter.aluno.toLowerCase();

    this.selected = this.DATA_TESTE.filter(item => item.responsavel.toLowerCase().includes(filterResponsavel))

    this.selected = this.selected.filter(item => item.aluno.toLowerCase().includes(filterAluno))

    if(this.objFormFilter.data.inicio != '' && this.objFormFilter.data.fim != '') {
      let dataInicio = this.utilServices.formataDataBR(this.objFormFilter.data.inicio);
      let dataFim = this.utilServices.formataDataBR(this.objFormFilter.data.fim);
      let from = this.utilServices.formataDataEN(dataInicio)
      let to = this.utilServices.formataDataEN(dataFim)

      this.selected = this.selected.filter(item => {
        let currentData = this.utilServices.formataDataEN(item.data)

        return (currentData >= from && currentData <= to);
      })
    }

    if(this.objFormFilter.mes != undefined) {
      this.selected = this.selected.filter(item => item.mes.includes(this.objFormFilter.mes))
    }

    if(this.objFormFilter.valor != null) {
      this.selected = this.selected.filter(item => item.valor == this.objFormFilter.valor)
    }

    this.dataSource = new MatTableDataSource(this.selected);
    this.dataSource.sort = this.sort;
  }

  limparFiltros() {
    this.objFormFilter = {
        responsavel : ''
      , aluno       : ''
      , mes         : ''
      , valor       : null
      , data        : {
          inicio: ''
        , fim: ''
      }
    }

    this.filtrarPagamentos()
  }

  goHome(): void {
    this.contentView = 1;
  }

  openCreate(): void {
    this.contentView = 2;
  }

  async openUpdate(obj) {
    console.log(obj)
    this.contentView = 3;
    let id = obj.id;

    let alunoRes;

    await this.alunoService.get(this.baseUrl + '/' + id)
      .then(function (res: any) {
        res.forEach((element) => {
          alunoRes = element;
        });
    })

    this.aluno = alunoRes;
  }

  async openDelete(obj) {
    console.log(obj)
    this.contentView = 4;

    let alunoRes;
    let id = obj.id;

    await this.alunoService.get(this.baseUrl + '/' + id)
      .then(function (res: any) {
        res.forEach((element) => {
          alunoRes = element;
        });
    })

    this.aluno = alunoRes;
  }

  saveCreate(): void {
    console.log(this.pagamento)

    if(this.pagamento.data != '') {
      let data = new Date(this.pagamento.data)

      var dia = String(data.getDate()).padStart(2, '0');
      var mes = String(data.getMonth() + 1).padStart(2, '0'); 
      var ano = data.getFullYear();
  
      let stringData = `${dia}/${mes}/${ano}`
  
      this.pagamento.data = stringData;
    }

    console.log(this.pagamento)

    if(this.pagamento.aluno == "" 
      || this.pagamento.aluno == " " 
      || this.pagamento.aluno == undefined 
      || this.pagamento.aluno == null) {
      this.alunoService.showMessage("Preencha o nome do aluno corretamente!")
    }
    else if(this.pagamento.valor == "" 
      || this.pagamento.valor == " " 
      || this.pagamento.valor == undefined 
      || this.pagamento.valor == null) {
      this.alunoService.showMessage("Preencha o valor do pagamento corretamente!")
    }
    else if(this.pagamento.data == "" 
      || this.pagamento.data == " " 
      || this.pagamento.data == undefined 
      || this.pagamento.data == null) {
      this.alunoService.showMessage("Preencha a data do pagamento corretamente!")
    }
    else {
      this.alunoService.create(this.aluno).subscribe((data) => {
  
        console.log(data)
        this.alunoService.showMessage("Pagamento registrado com sucesso!")
        this.goHome();
        this.filtrarTabela();
      })
    }
  }

  saveUpdate(): void {
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
    else {
      this.alunoService.update(this.aluno).subscribe(() => {
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

