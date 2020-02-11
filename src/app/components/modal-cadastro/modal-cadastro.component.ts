import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { ArtigosInterface } from '../../models/artigo.interface';
/*
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
*/

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss']
})
export class ModalCadastroComponent implements OnInit {

  modalValues: ArtigosInterface = {
    titulo: '',
    subTitulo: '',
    texto: '',
    data: '',
    imageLink: '',
    autor: '',
    urlOriginal: '',
    atualizadoPor: '',
    comentario: '',
    sugestaoComentario: '',
    dataHoraAtualizacao: '',
    idArtigo: '',
    isFavorite: false,
  }
  titleTxt = 'ADICIONANDO'
  sizetitleTxt = 0
  colTextAreas = {
    comentario: 'p-col-6',
    sugestaoComentario: 'p-col-6'
  }
  onSugestComentarioFocus = false;
  constructor(
    public dialogRef: MatDialogRef<ModalCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArtigosInterface,
    private dataSrv: DataService
  ) { }

  ngOnInit() {
    /* this.modalValues.id = this.data.id; */
    const XYZ = document.getElementsByClassName('mat-dialog-container')
    const res = document.getElementById(XYZ[0].id)
    res.style.boxShadow = 'unset';
    res.style.backgroundColor = 'transparent';
    setTimeout(() => {
      this.startTypingTitle()
       }, 500);
  }


  startTypingTitle() {
    /* console.log(this.titleTxt.length); */
    if (this.sizetitleTxt < this.titleTxt.length) {
      document.getElementById('title').innerHTML += this.titleTxt.charAt(this.sizetitleTxt);
      this.sizetitleTxt++;
      setTimeout(()=> {
        this.startTypingTitle();
      }, 100);
    }
  }



  expandTextArea(textAreaName: string) {
    if (textAreaName === 'ModalValueComentario') {
      this.colTextAreas.comentario = 'p-col-12',
      this.colTextAreas.sugestaoComentario = 'p-col-12'
    } else {
      this.onSugestComentarioFocus = true
      this.colTextAreas.comentario = 'p-col-12';
      this.colTextAreas.sugestaoComentario = 'p-col-12';
    }
  }
  closeTextArea(textAreaName: string) {
    if (textAreaName === 'ModalValueComentario') {
      this.colTextAreas.comentario = 'p-col-6',
      this.colTextAreas.sugestaoComentario = 'p-col-6'
    } else {
      this.onSugestComentarioFocus = false
      this.colTextAreas.comentario = 'p-col-6';
      this.colTextAreas.sugestaoComentario = 'p-col-6';
    }
  }


  save(ev) {
    const finalValues = this.modalValues;
    const randomID = Math.random().toString(36).substr(2, 9);
    finalValues.dataHoraAtualizacao = new Date().getTime();
    finalValues.idArtigo = randomID;
    this.dataSrv.saveToDB = this.modalValues;
    console.log(finalValues);
    this.dialogRef.close();
  }


}
