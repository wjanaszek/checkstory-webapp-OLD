import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user-service';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {
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
    this.router.navigate(['/register']);
  }

  showLoginForm() {
    this.router.navigate(['/login']);
  }
}
