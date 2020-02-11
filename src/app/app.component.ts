import { Component, OnInit, ViewChild } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, slideInLeftOnEnterAnimation, slideOutLeftOnLeaveAnimation } from 'angular-animations';
import { MatSidenav } from '@angular/material';
import { CentralRxJsService } from './services/centralRXJS.service';

import { config } from './services/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    slideInLeftOnEnterAnimation(),
    slideOutLeftOnLeaveAnimation(),
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  constructor(
    private centralRXJS: CentralRxJsService
  ) {
    this.centralRXJS.DataToReceive.subscribe((resRXJS) => {
      if (resRXJS.key === config.rxjsCentralKeys.openSideMenu) {
        this.sidenav.toggle();
      }
    })
  }

  ngOnInit() {
  }


}
