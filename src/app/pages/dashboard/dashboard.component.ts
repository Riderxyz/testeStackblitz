import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { StatusCardInterface } from '../../models/statusCard.interface';
import { ArtigosInterface } from '../../models/artigo.interface';
import { MatSnackBar } from '@angular/material';
import { CleanerService } from '../../services/cleaner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
   /*  fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    flipInYOnEnterAnimation({delay: 1000}),
    flipOutYOnLeaveAnimation() */
  ]
})
export class DashboardComponent implements OnInit {
  artigoArr: ArtigosInterface[] = []
  statsCardData: StatusCardInterface[] = []
  onUserGrid = false;
  valueInStock = [];
  display = false;
  constructor(
    private snackbar: MatSnackBar,
    private dataSrv: DataService,
    private db: AngularFireDatabase,
    private cleanerSrv: CleanerService
  ) { }


  ngOnInit() {

    this.dataSrv.getArtigos
      .subscribe((res) => {
        this.artigoArr = res;
        // this.repopular();
        this.startCardRender();
      });
  }

  startCardRender() {

    this.statsCardData = [
      {
        icone: 'fas fa-warehouse',
        titulo: 'Quantidade de items cadastrados',
        valor: this.artigoArr.length,
        totalValue: 'his.warehouseSize()',
        cor: 'card-header-warning',
      },
      {
        icone: 'fas fa-dollar-sign',
        titulo: 'Lucro(apenas proposta)',
        valor: this.artigoArr.length * 7,
        cor: 'card-header-success',
      }
    ]
  }

  restart() {
    this.cleanerSrv.getJson()
  }

  test() {
    const snack = this.snackbar.open('Atualização disponivel', 'Carregar Atualização');
    snack
      .onAction()
      .subscribe(() => {
        window.location.reload();
        console.log('estou aqui no dismiss');
        snack.dismiss()
      });

  }

}
