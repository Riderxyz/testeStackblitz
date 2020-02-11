import { Component, OnInit } from '@angular/core';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private centralRXJS: CentralRxJsService, public AuthSrv: AuthService) { }

  ngOnInit() {
  }

  openSideMenu() {
    this.centralRXJS.sendData = { key: config.rxjsCentralKeys.openSideMenu};
  }

}
