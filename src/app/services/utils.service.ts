import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsServices {

  constructor() { }

  formataDataEN(date) {
    date = date.split("/")

    date = new Date(date[2], parseInt(date[1]) -1, date[0]);

    return date;
  }

  formataDataBR(date) {
    var dia = String(date.getDate()).padStart(2, '0');
    var mes = String(date.getMonth() + 1).padStart(2, '0'); 
    var ano = date.getFullYear();

    let dataString = `${dia}/${mes}/${ano}`

    return dataString;
  }

  turmas(i) {
    let retorno: any;

    switch(i) {
      case '1º ano': {
        retorno = 1;
        break;
      }
      case '2º ano': {
        retorno = 2;
        break;
      }
      case '3º ano': {
        retorno = 3;
        break;
      }
      case "4º ano": {
        retorno = 4;
        break;
      }
      case '5º ano': {
        retorno = 5;
        break;
      }
      default: {
        retorno = null;
      }
    }

    return retorno;
  } 
  
}