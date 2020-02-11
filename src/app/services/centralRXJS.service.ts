import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SenderRXJS } from '../models/senderRXJS.interface';
// import { of } from 'rxjs';

@Injectable()
export class CentralRxJsService {
  private InputStream = new ReplaySubject<SenderRXJS>();
  // tslint:disable-next-line: variable-name
  private _OutputStrem = this.InputStream;
  constructor() { }

/**
 * Esta função é a que deve ser usada para enviar os comandos para os outros componentes.
 *
 *
 */
public set sendData(value: SenderRXJS) {
  this.InputStream.next(value);
}

/**
 * Esta função deverá ser instanciada de preferencia no ngOnInit dos componentes, ou no constructor,
 * caso o mesmo não posso ser utilizado. Feito isso, é só usar o subscribe e pronto.
 */
public get DataToReceive() {
  return this._OutputStrem;
}

}
