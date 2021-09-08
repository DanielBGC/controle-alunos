import { catchError, map } from 'rxjs/operators';
import { Aluno } from '../components/aluno/aluno.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  alunosUrl2 = "http://localhost:3000/api/alunos"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    
    ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "", {
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


  //NOVA FORMA
  async login(url: any, objLogin) {
      return new Promise(async (resolve, reject) => {
          await this.putRequest(url, objLogin).then(res => {
              resolve(res);
          });
      });
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

}
