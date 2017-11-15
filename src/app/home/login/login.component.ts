import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  apiError: boolean;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService) {
    this.apiError = false;
  }

  ngOnInit() {
    // create form
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // reset login status
    this.authenticationService.logout();
  }

  login() {
    console.log('logging: ' + this.loginForm.get('login').value + ', ' + this.loginForm.get('password').value);
    this.authenticationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value)
      .subscribe(
        data => {
          console.log('logged in user');
          this.apiError = false;
          this.router.navigate(['dashboard/story-list']);
        },
        error => {
          console.log('error: ' + JSON.stringify(error));
          this.apiError = true;
        }
      );
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
