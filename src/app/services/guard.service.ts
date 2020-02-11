import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isAuthenticated = false;


  constructor(
    private AuthSrv: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private ToastSrv: ToastService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
/*     if (this.AuthSrv.isAuthenticated) {
      return true;

    } */
    return this.AuthSrv.currentUserObservable
      .pipe(
        take(1),
        map((user) => {
          return !!user;
        }), tap(loggedIn => {
          if (!loggedIn) {
            console.log('access denied');
            this.ToastSrv.showToastError('Precisa de login!', 'Por favor, logue na aplicação para acessar esta area');
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  /* else {
    return false;
  } */
}
