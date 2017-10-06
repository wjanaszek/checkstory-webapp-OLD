import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password.validation';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { fadeInAnimation } from '../animations/fadeInAnimation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: PasswordValidation.matchPassword
    });
  }

  submit() {
    console.log('submit');
    this.authenticationService.register(
      this.registerForm.get('login').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value
    ).subscribe(data => {
        this.router.navigate(['/welcome_page']);   //TODO change for something better (?)
      },
      error => {
        console.log('error during registration occured');
      });
  }

  getBack() {
    this.router.navigateByUrl('/home');
  }
}
