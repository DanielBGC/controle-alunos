import { AlunoService } from './../aluno.service';
import { Product, Aluno } from './../product.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  baseUrl = 'http://localhost:3000/api/alunos'
  alunos: Aluno[]
  displayedColumns = ['id', 'name', 'age', 'class', 'action']

  constructor(private alunoService: AlunoService) { }

  async ngOnInit() {
    // this.alunoService.read().subscribe(data => {
    //   console.log(data)
    //   this.alunos = data;
    // })
    let arrAlunos = []

    await this.alunoService.get(this.baseUrl)
      .then(function (res: any) {
        res.forEach((element: Aluno) => {
          arrAlunos.push(element)
        });
    })

    this.alunos = arrAlunos;
    console.log(this.alunos)
  }

}
