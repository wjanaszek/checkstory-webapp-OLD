import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  registerFormVisible = false;
  loginFormVisible = false;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  showRegisterForm() {
    this.registerFormVisible = true;
    this.loginFormVisible = false;
  }

  showLoginForm() {
    this.loginFormVisible = true;
    this.registerFormVisible = false;
  }
}
