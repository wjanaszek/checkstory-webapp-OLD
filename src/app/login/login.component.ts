import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // animations: [
  //   trigger('visibilityChanged', [
  //     state('shown', style({ opacity: 1 })),
  //     state('hidden', style({ opacity: 0 })),
  //     transition('shown => hidden', animate('.5s')),
  //     transition('hidden => shown', animate('.4s'))
  //   ])
  // ]
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;

  // @Input()
  // isVisible: boolean = false;
  // visibility = 'hidden';

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

  // ngOnChanges() {
  //   this.visibility = this.isVisible ? 'shown' : 'hidden';
  // }

  login() {
    console.log('logging: ' + this.loginForm.get('login').value + ', ' + this.loginForm.get('password').value);
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        }
      );
  }

  getBack() {
    this.router.navigateByUrl('/home');
  }
}
