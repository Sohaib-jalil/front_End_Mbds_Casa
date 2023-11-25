import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titre : string = "Assignments App";
  subTitre : string = "Mon application sur les Assignments !";
  bodyVisible = true;
  showFiller = false;
  formVisible : boolean = false;
  detailsVisible : boolean = false;

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  
  logOut(){
    this.authService.logOut();
    if(!this.authService.loggedIn)
      this.router.navigate(['/home']);
  }

  onMenuClick() {
    this.bodyVisible = !this.bodyVisible
  }

  onAddAssignmentBtnClick() {
    this.formVisible = !this.formVisible;
    this.detailsVisible = !this.detailsVisible
  }
  
  onListAssignmentsBtnClick() {
    this.formVisible = false;
    this.detailsVisible = false
  }

  onCancel() {
    this.formVisible = false;
  }
}
