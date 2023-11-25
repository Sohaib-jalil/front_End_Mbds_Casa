import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  nom:string = "";
  password:string = "";
  message:string= null;

  constructor(private authService:AuthService, private router:Router) { }

  logIn() {
    console.log(this.nom, this.password)
    this.authService.logIn(this.nom, this.password);
    if (this.authService.loggedIn) {
      this.router.navigate(['/home']);
    }
    else {
      this.message = "Nom ou mot de passe incorrect !"
    }
  }

}
