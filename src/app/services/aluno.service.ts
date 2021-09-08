import { catchError, map } from 'rxjs/operators';
import { Aluno } from '../components/aluno/aluno.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  alunosUrl = "http://localhost:3001/alunos"
  alunosUrl2 = "http://localhost:3000/api/alunos"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    
    ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError  ? ["msg-error"] : ["msg-success"]
    })
  }

  handleError(error: any): Observable<any> {
    console.log(error)
    this.showMessage("Erro", true);
    return EMPTY
  }

  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.alunosUrl2, aluno).pipe(
      map(obj => obj),
      catchError(error => this.handleError(error))
    )
  }

  read(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.alunosUrl2).pipe(
      map(obj => obj),
      catchError(error => this.handleError(error))
    )
  }

  readById(id: number): Observable<Aluno> {
    const url = this.alunosUrl2 + "/" + id
    return this.http.get<Aluno>(url).pipe(
      map(obj => obj),
      catchError(error => this.handleError(error))
    )
  }

  update(aluno: Aluno): Observable<Aluno> {
    const url = this.alunosUrl2 + "/" + aluno.id
    return this.http.post<Aluno>(url, aluno).pipe(
      map(obj => obj),
      catchError(error => this.handleError(error))
    )
  }

  delete(id: number): Observable<Aluno> {
    const url = this.alunosUrl2 + "/" + id
    return this.http.delete<Aluno>(url).pipe(
      map(obj => obj),
      catchError(error => this.handleError(error))
    )
  }



  //NOVA FORMA

  async get(url: any) {
    var response;
    await this.getRequest(url).then(res => {
        response = res;
    });

    return response;
  }

  async deleteObject(url: any, objectToDeactivate: Aluno) {
    return new Promise(async (resolve, reject) => {
        let body: any = {
            "nome": objectToDeactivate.nome,
            "id": objectToDeactivate.id
        };

        await this.deleteRequest(url, body).then(res => {
            resolve(res);
        });
    });
  }

  async insertObject(url: any, objectToInsert: Aluno) {
      return new Promise(async (resolve, reject) => {
          await this.postRequest(url, objectToInsert).then(res => {
              resolve(res);
          });
      });
  }

  async updateObject(url: any, objectToUpdate: Aluno) {
      return new Promise(async (resolve, reject) => {
          await this.putRequest(url, objectToUpdate).then(res => {
              resolve(res);
          });
      });
  }

  public async getRequest(url: any) {
    return new Promise((resolve, reject) => {
        this.http.get(url).subscribe(res => {
            resolve(res);
        }, err => {
            resolve(err)
        })
    })
  } 

  async postRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
        this.http.post(url, body).subscribe(res => {
            resolve(res);
        }, err => {
            resolve(err)
        })
    })
  }

  async putRequest(url: any, body: any) {
      return new Promise((resolve, reject) => {
          this.http.put(url, body).subscribe(res => {
              resolve(res);
          }, err => {
              resolve(err)
          })
      })
  }

  public async deleteRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
        this.http.request('delete', url, { body: body}).subscribe(res => {
            resolve(res);
        }, err => {
            resolve(err)
        })
    })
  }
}
