import { AlunoService } from './../aluno.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Aluno } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  baseUrl = 'http://localhost:3000/api/alunos'

  aluno: Aluno
  aulas: Array<any>
  displayedColumns = ['dia', 'horario']

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id")
    // this.alunoService.readById(id).subscribe(aluno => {
    //   this.aluno = aluno;
    //   this.aulas = aluno.aulas;
    // });

    let alunoRes : Aluno;

    await this.alunoService.get(this.baseUrl + '/' + id)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          alunoRes = element;
        });
    })

    this.aluno = alunoRes;
  }

  updateProduct(): void {
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
        this.router.navigate(["alunos"])
      })
    }
  }

  cancel(): void {
    this.router.navigate(["alunos"])
  }

}
