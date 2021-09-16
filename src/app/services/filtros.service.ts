import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})

export class FiltroService {
  constructor(
    private http      : HttpClient,
    ) { }

  async alunos(url, body) {
    let retorno = await this.postRequest(url, body)

    return retorno;
  }




  

  async get(url: any, body: any) {
    var response;
    await this.getRequest(url, body).then(res => {
        response = res;
    });

    return response;
  }

  public async getRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
        this.http.get(url, body).subscribe(res => {
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
}
