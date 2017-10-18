import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
// import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // create form
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log('logging: ' + this.loginForm.get('login').value + ', ' + this.loginForm.get('password').value);
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value)
      .subscribe(
        data => {
          console.log('logged in user: ' + JSON.stringify(data));
          this.router.navigate(['dashboard/story-list']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
