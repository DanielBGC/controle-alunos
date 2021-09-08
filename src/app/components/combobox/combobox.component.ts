import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators'

import { ComboboxServices } from '../../services/combobox.service';

@Component({
  selector: 'app-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})

export class ComboboxComponent implements OnInit {
  @Input() url                  : any;              // URL PARA BUSCA
  @Input() formSelect           : any;              // OBJETO DO FORMULÁRIO
  @Input() formControlNameSelect: any;              // CAMPO DO FORMULÁRIO
  @Input() selectedData         : any[];            // DADOS SELECIONADOS
  @Input() intName              : any;              // INDICA QUE OUTRO CAMPO DEPENDE DO MESMO
  @Input() depName              : any;              // INDICA A DEPENDENCIA DE OUTRO CAMPO
  @Input() label                : any;              // LABEL
  @Input() comboFix             : any;              // DETERMINA BUSCA NO COMBOBOX SERVICE
  @Input() dataFix              : boolean = false;  // DETERMINA QUE OS DADOS JÁ VENHAM CARREGADOS POR '%%'
  @Input() items                = [];               // ITEMS DO SELECT
  @Input() custom               : any;              // ATIVA ICONE OU IMAGEM NOS RESULTADOS
  @Input() content              : any;              // ICONE OU IMAGEM A SER EXIBIDA
  @Input() parameterAux         : Object;           // PARÂMETROS AUXILIÁRES
  @Input() disabled             : boolean = false;  // DESABILITA COMPONENTE
  @Input() placeholder          : string  = 'Digite para pesquisar';   // PLACEHOLDER

  @Output() onSelected = new EventEmitter<any>();   // EMITE EVENTO APÓS QUALQUER MUDANÇA NO COMPONENTE

  typeahead = new EventEmitter<string>();           // REALIZA BUSCA DOS DADOS
  public loading      : boolean = false;            // HABILITA E DESABILITA O LOADING

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private comboboxService: ComboboxServices) { }

  ngOnInit() {
    if (this.comboFix) {
      this.items = this.comboboxService[this.comboFix]();
    } else {
      if (this.dataFix) {
        this.loading = true;
        this.getData('%%%%')
          .subscribe(items => {
            this.items = items;
            this.cd.markForCheck();
            this.loading = false;
          }, (err) => {
            this.items = [];
            this.cd.markForCheck();
            this.loading = false;
          });
      } else {
        this.typeahead.pipe(
            distinctUntilChanged(),
            tap(() => this.loading = true),
            debounceTime(200),
            switchMap(term => this.getData(term))
          ).subscribe(items => {
            this.items = items;
            this.cd.markForCheck();
            this.loading = false;
          }, (err) => {
            this.items = [];
            this.cd.markForCheck();
            this.loading = false;
          });
      }
    }
  }

  getData(term) {
    if (term) {
      var parameterDep = this.valueSearch(this.depName);
      let parameterAux = this.parameterAux;
      let objReturn    = (parameterDep != false) ? { parameter: term, parameterDep, parameterAux } : {};
      let headers      = new HttpHeaders().set('dsmodulo', localStorage.getItem('DSMODULO')).set('ids001', localStorage.getItem('ID_USER'));
      return this.http.post<any>(`${localStorage.getItem('URL_API')}${this.url}`, objReturn, { headers });
    } else {
      this.items   = [];
      this.cd.markForCheck();
      this.loading = false;
    }
  };

  changeValue(event){
    this.onSelected.emit(event);
    if (this.intName) this.valueAux(this.intName);
  }

  valueAux(val) {
    var str = val.split(',');
    for (var i = 0; i < str.length; ++i) this.formSelect.controls[str[i]].setValue(null);
  }

  valueSearch(val) {

    if(this.depName != undefined){

      var objStr = {};
      var str    = this.depName.split(',');

      if(str.length > 1) {

        for (var i = 0; i < str.length; ++i) {
          if(this.formSelect.controls[str[i]].value != null) {
            objStr[str[i]] = this.formSelect.controls[str[i]].value.id;
          } else {
            this.formSelect.controls[str[i]].setValidators([Validators.required]);
            return false;
          }
        }

      } else {

        val = null;
        val = str[0].split('_');
        val = (val[1] != undefined ? val[1]:val[0]);

        if(this.formSelect.controls[str[0]].value != null) {
          if(this.formSelect.controls[str[0]].value.id != undefined) {
            objStr[val] = this.formSelect.controls[str[0]].value.id; //# para combo com select
          } else {
            objStr[val] = this.formSelect.controls[str[0]].value; //# para combo com A/I etc..
          }
        } else {
          this.formSelect.controls[str[0]].setValidators([Validators.required]);
          return false;
        }
      }

      return objStr;

    } else {
      return true;
    }

  }

  clearValuesOptions() { this.formSelect.get(this.formControlNameSelect).patchValue([]); }
}
