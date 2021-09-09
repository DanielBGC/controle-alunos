import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ComboboxServices {

  constructor() { }

  diasDaSemana = [
      {id: 1, text: 'Domingo'       }
    , {id: 2, text: 'Segunda-feira' }
    , {id: 3, text: 'Terça-feira'   }
    , {id: 4, text: 'Quarta-feira'  }
    , {id: 5, text: 'Quinta-feira'  }
    , {id: 6, text: 'Sexta-feira'   }
    , {id: 7, text: 'Sábado'        }
  ]  

  mesesDoAno = [
      {id: 1, text: 'Janeiro'   }
    , {id: 2, text: 'Fevereiro' }
    , {id: 3, text: 'Março'     }
    , {id: 4, text: 'Abril'     }  
    , {id: 5, text: 'Maio'      }
    , {id: 6, text: 'Junho'     }
    , {id: 7, text: 'Julho'     }
    , {id: 8, text: 'Agosto'    }
    , {id: 9, text: 'Setembro'  }
    , {id: 10, text: 'Outubro'  }
    , {id: 11, text: 'Novembro' }
    , {id: 12, text: 'Dezembro' }
  ] 
  
}