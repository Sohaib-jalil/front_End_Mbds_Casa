import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService)
  let router = inject(Router)

  let authentifie = authService.isAdmin();
    if(authentifie) {
      console.log("Vous être admin, navigation autorisée !")
      return true;
    } else {
      console.log("Vous n'être pas admin ! navigation refusée !")
      router.navigate(['/home'])
      return false
    }
};

export const logInGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService)
  let router = inject(Router)

  let loggedIn = authService.loggedIn;
    if(loggedIn) {
      console.log("Vous être connecté, navigation autorisée !")
      return true;
    } else {
      console.log("Vous n'être pas connecté ! navigation refusée !")
      router.navigate(['/home'])
      return false
    }
};
