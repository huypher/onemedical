import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginInfoService} from "./login-info.service";
import {LoginInfoReq} from "./types";
import {loadingTime, tokenKey, ttl} from "../constant";
import {saveLocalStorageWithExpire} from "../core/util/local-storage";

type Rule = (self: any, pwd: string) => boolean

@Component({
  selector: 'app-login-info-step',
  templateUrl: './login-info-step.component.html',
  styleUrls: ['./login-info-step.component.css']
})
export class LoginInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  validateForm!: FormGroup;
  firstNameValidator: boolean | undefined = undefined;
  lastNameValidator: boolean | undefined = undefined;
  emailValidator: boolean | undefined = undefined;
  passwordValidator: boolean | undefined = undefined;
  preferredName: boolean = false;
  showPassword: boolean = false;
  validPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginInfoService: LoginInfoService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      preferredName: [null],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  inputChange(id: string) {
    const formValue = this.validateForm.value
    switch (id) {
      case "firstName":
        this.firstNameValidator = formValue.firstName.length !== 0;
        break;
      case "lastName":
        this.lastNameValidator = formValue.lastName.length !== 0
        break;
      case "email":
        this.emailValidator = formValue.email.length !== 0 && formValue.email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        break;
      case "password":
        this.validatePasswordFormat();
        break;
    }
  }

  showPreferredName() {
    this.preferredName = true
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  pwdLen: boolean = false
  digit: boolean = false
  alphabet: boolean = false
  rules: Array<Rule> = [this.passwordLengthRule, this.digitRule, this.alphabetRule]

  validatePasswordFormat() {
    this.passwordValidator = true
    for (let i = 0; i < this.rules.length; i++) {
      const isMatch = this.rules[i](this, this.validateForm.value.password)
      this.passwordValidator = this.passwordValidator && isMatch
    }
  }

  passwordLengthRule(self: any, pwd: string): boolean {
    self.pwdLen = pwd.length >= 6
    return self.pwdLen
  }

  alphabetRule(self: any, pwd: string): boolean {
    self.alphabet = /.*[a-z].*/.test(pwd) || /.*[A-Z].*/.test(pwd)
    return self.alphabet
  }

  digitRule(self: any, pwd: string): boolean {
    self.digit = /.*\d.*/.test(pwd)
    return self.digit
  }

  allowSubmit() {
    return this.validateForm.valid && this.validPassword
  }

  submitWithDelay() {
    if (this.validateForm.valid) {
      this.loading = true
      setTimeout(() => this.submit(), loadingTime)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submit(): void {
    this.loading = true
    const formValue: any = this.validateForm.value
    const body: LoginInfoReq = {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      preferred_name: formValue.preferredName,
      email: formValue.email,
      password: formValue.password,
    }
    this.loginInfoService.postLoginInfo(body).subscribe(
      resp => {
        const token = resp.body?.data?.token
        if (token === '' || token === undefined) {
          this.done.emit(false)
          return
        }
        saveLocalStorageWithExpire(tokenKey, token, ttl)
        this.done.emit(true)
      },
      error =>  this.done.emit(false)
    )
  }
}
