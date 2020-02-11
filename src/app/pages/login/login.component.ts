import { Component, OnInit} from '@angular/core';
import { LoginObjInterface } from '../../models/loginObj.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sizetitleTxt = 0;
  titleTxt = 'Login';
  isSaveable = false;
  userObj: LoginObjInterface = {
    email: null,
    password: null
  }
  fullEnvironment = environment;

  constructor(
    private AuthSrv: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.startTypingTitle();

  }




  startTypingTitle() {
    /* console.log(this.titleTxt.length); */
    if (this.sizetitleTxt < 5) {
      document.getElementById('card-title-login').innerHTML += this.titleTxt.charAt(this.sizetitleTxt);
      this.sizetitleTxt++;
      setTimeout(() => {
        this.startTypingTitle();
      }, 100);
    }
  }

  test() {
    /* this.AuthSrv.onLoginSucess(); */
     this.router.navigateByUrl('/dashboard');
  }
  login(ev) {
    console.log('Ativando o form', this.isSaveable);
    this.AuthSrv.logInWithEmail(this.userObj, this.isSaveable);
  }


}
