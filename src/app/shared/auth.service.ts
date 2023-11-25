import { Injectable } from '@angular/core';
import { User } from '../assignments/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authInfo:User[] = [
    {id:1, nom:"admin", password:"admin", role:"admin"},
    {id:1, nom:"user", password:"user", role:"user"}
  ]

  constructor() { }

  loggedIn = false;
  currentUser:User = null;

  logIn(nom:string, password:string) {
    const authUser = this.authInfo.find(u => u.nom === nom && u.password === password);
    if (authUser) {
      this.loggedIn = true;
      this.currentUser = authUser;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  getUsers(){
    return this.authInfo
  }

  getUser(nom:string){
    return this.authInfo.find(u => u.nom === nom)
  }

  isLogged(){
    return this.loggedIn
  }

  isAdmin(){
    if(this.currentUser!==null && this.currentUser.role == "admin"){
      return true
    }
    return false
  }
}
