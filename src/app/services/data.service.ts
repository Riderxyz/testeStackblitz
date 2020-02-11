import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { config } from './config';
import { ArtigosInterface } from '../models/artigo.interface';
@Injectable()
export class DataService {

  colorCaneta = [
    'azul',
    'vermelho',
    'preta',
    'verde',
    'amarelo',
    'rosa',
    'roxo',
    'laranja',
  ]
  constructor
    (
      public db: AngularFireDatabase,
  ) {


  }
  get getArtigos() {
    return this.db.list<ArtigosInterface>(config.url.db).valueChanges();
}

 set saveToDB(ev: ArtigosInterface) {
   console.log('ID', ev.idArtigo);

    this.db.list(config.url.db).set(
      ev.idArtigo,
      {
        titulo: ev.titulo,
        subTitulo:  ev.subTitulo,
        texto: ev.texto,
        data: ev.data.getTime(),
        imageLink: ev.imageLink,
        autor: ev.autor,
        urlOriginal: ev.urlOriginal,
        atualizadoPor: ev.atualizadoPor,
        comentario: ev.comentario,
        sugestaoComentario: ev.sugestaoComentario,
        dataHoraAtualizacao: ev.dataHoraAtualizacao,
        idArtigo: ev.idArtigo,
        isFavorite: false,
      }
    )
  }

set deleteFromDB(ev: any[]) {
  ev.forEach((element) => {
    this.db.list(config.url.db).remove(element.id)
  })
}

  set multipleItemsEdit(ev: any[]) {
    ev.forEach((element) => {
      this.db.list(config.url.db).set(element.id, {
        nome: element.nome,
        id: element.id,
        descricao: element.descricao,
        quantidade: element.quantidade,
        categoria: element.categoria,
        codigo: element.codigo
      })
    })
  }
}
