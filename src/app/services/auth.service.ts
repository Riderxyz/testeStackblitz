import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { LoginObjInterface } from '../models/loginObj.interface';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
@Injectable()
export class AuthService {
    constructor(
      public afAuth: AngularFireAuth,
      private router: Router,
      private toastSrv: ToastService
    ) {

}

async logInWithEmail(userObj: LoginObjInterface, isUserSaveable: boolean) {
  let path = '';
  if (isUserSaveable) {
    path = firebase.auth.Auth.Persistence.LOCAL;
  } else {
    path = firebase.auth.Auth.Persistence.SESSION;
  }
  this.afAuth.auth.setPersistence(path)
    .then(async () => {
      try {
        const loginNormal = await this.afAuth.auth.signInWithEmailAndPassword(userObj.email, userObj.password);
        console.log('Estou aqui!', loginNormal);
        // this.localSrv.setData(config.localStorageKeys.refreshToken, loginNormal.user.refreshToken);
        this.router.navigateByUrl('/dashboard');
      } catch (error) {
        this.onLoginError();
        console.log('erro de login dentro do trycatch', error);
      }
    }).catch((error) => {
      console.log('Erro de Login', error);
    });

}


get currentUserObservable() {
  return this.afAuth.authState;
}

onLoginSucess() {
  this.toastSrv.showToastSucess('Seu login foi efetuado com sucesso')
}
onLoginError() {
  this.toastSrv.showToastError('Seu login não pode ser feito', 'Tente novamente')
}
}
