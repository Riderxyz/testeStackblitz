import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { ArtigosInterface } from '../../models/artigo.interface';

@Component({
  selector: 'app-modal-edicao',
  templateUrl: './modal-edicao.component.html',
  styleUrls: ['./modal-edicao.component.scss']
})
export class ModalEdicaoComponent implements OnInit {


  @ViewChild('title', { static: true }) titleElement: ElementRef;
  modalValues: ArtigosInterface = {
    atualizadoPor: '',
    autor: '',
    comentario: '',
    sugestaoComentario: '',
    data: '',
    dataHoraAtualizacao: '',
    idArtigo: '',
    imageLink: '',
    subTitulo: '',
    isFavorite: false,
    texto: '',
    titulo: '',
    urlOriginal: '',
  }
  titleTxt = 'EDITANDO'
  sizetitleTxt = 0

  colTextAreas = {
    comentario: 'p-col-6',
    sugestaoComentario: 'p-col-6'
  }
  onSugestComentarioFocus = false;
  constructor(
    public dialogRef: MatDialogRef<ModalEdicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArtigosInterface,
    private dataSrv: DataService
  ) { }


  ngOnInit() {
    this.modalValues = this.data;
    this.modalValues.data = new Date(this.data.data)
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
      setTimeout(() => {
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
    console.log(this.modalValues);
    const retorno = this.modalValues.data;
    let res = null
    this.modalValues.atualizadoPor = 'admin'
    if (typeof this.modalValues.data === 'string') {
      res = new Date(retorno)
      console.log(res);
      this.modalValues.data = res;
    }
    this.modalValues.dataHoraAtualizacao = new Date().getTime();
    this.dataSrv.saveToDB = this.modalValues
    this.dialogRef.close();
  }
}
