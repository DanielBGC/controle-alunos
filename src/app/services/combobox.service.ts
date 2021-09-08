import { Injectable } from '@angular/core';

@Injectable()
export class ComboboxServices {

  constructor() { }

  tipoCarga() {
    return [
      { id: 1, text: 'ESTIVADA'    },
      { id: 2, text: 'PALETIZADA'  },
      { id: 3, text: 'MISTA'       },
      { id: 8, text: 'RECEBIMENTO' }
    ];
  }
}