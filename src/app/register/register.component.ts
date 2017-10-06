import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password.validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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
  }

  getBack() {
    this.router.navigateByUrl('/home');
  }
}
