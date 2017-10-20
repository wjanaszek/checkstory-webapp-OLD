import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password.validation';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { UserService } from '../../shared/services/user-service';
import { User } from '../../shared/models/user.model';
import { RegistrationValidationService } from '../../shared/services/registration.validation.service';

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
              private userService: UserService,
              private registrationValidationService: RegistrationValidationService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      login: ['', [Validators.required], this.validateLoginNotTaken.bind(this)],
      email: ['', [Validators.email], this.validateEmailNotTaken.bind(this)],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: PasswordValidation.matchPassword
    });
  }

  submit() {
    console.log('submit: login = ' + this.registerForm.get('login').value + ', pswd = ' + this.registerForm.get('password').value);
    this.userService.create(new User(this.registerForm.get('login').value, this.registerForm.get('email').value, this.registerForm.get('password').value))
      .subscribe(data => {
        this.router.navigate(['/welcome_page']);
      },
          error => {
        console.log('error during registration occured: ' + JSON.stringify(error));
      });
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.registrationValidationService.checkEmailNotTaken(control.value).map(res => {
      return res ? null : { emailTaken: true };
    });
  }

  validateLoginNotTaken(control: AbstractControl) {
    return this.registrationValidationService.checkLoginNotTaken(control.value).map(res => {
      return res ? null : { loginTaken: true };
    });
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
