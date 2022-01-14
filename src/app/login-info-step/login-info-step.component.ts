import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import {LoginInfoService} from "./login-info.service";
import {LoginInfoReq} from "./types";

type Rule = (self: any, pwd: string) => boolean

@Component({
  selector: 'app-login-info-step',
  templateUrl: './login-info-step.component.html',
  styleUrls: ['./login-info-step.component.css']
})
export class LoginInfoStepComponent implements OnInit {
  validateForm!: FormGroup;
  preferredName: boolean = false;
  showPassword: boolean = false;
  validPassword: boolean = false;

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

  showPreferredName() {
    this.preferredName = true
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  pwdLen: boolean = false
  upperLower: boolean = false
  digit: boolean = false
  noRepetitive: boolean = false
  noSequential: boolean = false
  rules: Array<Rule> = [this.passwordLengthRule, this.uppercaseAndLowercaseRule, this.digitRule, this.noRepetitiveCharsRule, this.noSequentialCharsRule]

  validatePasswordFormat() {
    this.validPassword = true
    for (let i = 0; i < this.rules.length; i++) {
      const isMatch = this.rules[i](this, this.validateForm.value.password)
      this.validPassword = this.validPassword && isMatch
    }
  }

  passwordLengthRule(self: any, pwd: string): boolean {
    self.pwdLen = pwd.length >= 8
    return self.pwdLen
  }

  uppercaseAndLowercaseRule(self: any, pwd: string): boolean {
    self.upperLower = /.*[a-z].*/.test(pwd) && /.*[A-Z].*/.test(pwd)
    return self.upperLower
  }

  digitRule(self: any, pwd: string): boolean {
    self.digit = /.*\d.*/.test(pwd)
    return self.digit
  }

  noRepetitiveCharsRule(self: any, pwd: string): boolean {
    if (pwd.length == 0) {
      self.noRepetitive = false
      return self.noRepetitive
    }
    if (pwd.length < 3) {
      self.noRepetitive = true
      return self.noRepetitive
    }
    for (let i = 0; i < pwd.length; i++) {
      if (+pwd[+i+1] == +pwd[i] && +pwd[+i+2] == +pwd[i]) {
        self.noRepetitive = false
        return self.noRepetitive
      }
    }
    pwd = pwd.toUpperCase()
    for (let i = 0; i < pwd.length; i++) {
      if (String.fromCharCode(pwd.charCodeAt(i)) == pwd[+i+1] && String.fromCharCode(pwd.charCodeAt(i)) == pwd[+i+2]) {
        self.noRepetitive = false
        return self.noRepetitive
      }
    }
    self.noRepetitive = true
    return self.noRepetitive
  }

  noSequentialCharsRule(self: any, pwd: string): boolean {
    if (pwd.length == 0) {
      self.noSequential = false
      return self.noSequential
    }
    if (pwd.length < 3) {
      self.noSequential = true
      return self.noSequential
    }
    for (let i = 0; i < pwd.length; i++) {
      if (+pwd[+i+1] == +pwd[i]+1 && +pwd[+i+2] == +pwd[i]+2) {
        self.noSequential = false
        return self.noSequential
      }
    }
    pwd = pwd.toUpperCase()
    for (let i = 0; i < pwd.length; i++) {
      if (String.fromCharCode(pwd.charCodeAt(i)+1) == pwd[+i+1] && String.fromCharCode(pwd.charCodeAt(i)+2) == pwd[+i+2]) {
        self.noSequential = false
        return self.noSequential
      }
    }
    self.noSequential = true
    return self.noSequential
  }

  submit(): void {
    if (this.validateForm.valid && this.validPassword) {
      console.log('submit', this.validateForm.value);
      const body: LoginInfoReq =
        {
          first_name: this.validateForm.value.firstName,
          last_name: this.validateForm.value.lastName,
          preferred_name: this.validateForm.value.preferredName,
          email: this.validateForm.value.email,
          password: this.validateForm.value.password,
        }
      this.loginInfoService.postLoginInfo(body)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
