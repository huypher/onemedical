import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginInfoService} from "./login-info.service";
import {LoginInfoReq, LoginInfoSessionData} from "./types";
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
  @Output() currentSession: EventEmitter<LoginInfoSessionData> = new EventEmitter<LoginInfoSessionData>(false)
  @Input() restoreSessionData: LoginInfoSessionData = {}
  validateForm!: FormGroup;
  isFirstNameValid: boolean | undefined = undefined;
  isLastNameValid: boolean | undefined = undefined;
  isEmailValid: boolean | undefined = undefined;
  isPasswordValid: boolean | undefined = undefined;
  isPreferredNameVisibility: boolean = false;
  isPasswordVisibility: boolean | undefined = undefined;
  loading: boolean = false;
  isFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginInfoService: LoginInfoService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [this.restoreSessionData.first_name || null, [Validators.required]],
      lastName: [this.restoreSessionData.last_name || null, [Validators.required]],
      preferredName: [this.restoreSessionData.preferred_name || null],
      email: [this.restoreSessionData.email || null, [Validators.required]],
      password: [this.restoreSessionData.password || null, [Validators.required]],
    });
    if (this.validateForm.value.password !== null) {
      this.passwordValidator()
    }
    if (this.validateForm.value.preferredName !== null) {
      this.showPreferredName()
    }
  }

  inputChange(id: string) {
    switch (id) {
      case "firstName":
        this.firstNameValidator()
        break;
      case "lastName":
        this.lastNameValidator()
        break;
      case "email":
        this.emailValidator()
        break;
      case "password":
        this.passwordValidator();
        break;
    }
  }

  firstNameValidator() {
    this.isFirstNameValid = this.validateForm.value.firstName.length !== 0;
  }

  lastNameValidator() {
    this.isLastNameValid = this.validateForm.value.lastName.length !== 0
  }

  emailValidator() {
    this.isEmailValid = this.validateForm.value.email.length !== 0 && this.validateForm.value.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  showPreferredName() {
    this.isPreferredNameVisibility = true
  }

  togglePassword() {
    this.isPasswordVisibility = !this.isPasswordVisibility
  }

  pwdLen: boolean = false
  digit: boolean = false
  alphabet: boolean = false
  rules: Array<Rule> = [this.passwordLengthRule, this.digitRule, this.alphabetRule]

  passwordValidator() {
    this.isPasswordValid = true
    for (let i = 0; i < this.rules.length; i++) {
      const isMatch = this.rules[i](this, this.validateForm.value.password)
      this.isPasswordValid = this.isPasswordValid && isMatch
    }
  }

  passwordLengthRule(self: any, pwd: string): boolean {
    self.pwdLen = pwd !== null && pwd.length >= 6
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
    return this.validateForm.valid && this.isPasswordValid
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
    const sessionData: LoginInfoSessionData =
      {
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        preferred_name: formValue.preferredName,
        email: formValue.email,
        password: formValue.password,
      }
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
        this.currentSession.emit(sessionData)
        this.done.emit(true)
      },
      error =>   {
        this.isFailed = true
        this.loading = false
      },
    )
  }
}
