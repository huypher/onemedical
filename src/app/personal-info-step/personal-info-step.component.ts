import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PersonalInfoStepService} from "./personal-info-step.service";
import {PersonalInfoReq} from "./types";
import * as moment from 'moment';
import {getLocalStorage} from "../core/util/local-storage";
import {tokenKey} from '../constant';

@Component({
  selector: 'app-personal-info-step',
  templateUrl: './personal-info-step.html',
  styleUrls: ['./personal-info-step.css']
})
export class PersonalInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  validateForm!: FormGroup;
  enableGenderInfo: boolean = false
  validBirthday: boolean | undefined = undefined
  validPhoneNumber: boolean | undefined = undefined

  constructor(
    private fb: FormBuilder,
    private personalInfoService: PersonalInfoStepService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phoneNumber: [null, [Validators.required]],
      downloadLinkOption: [null],
      birthday: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      genderInfo: [null],
    });
  }

  validateBirthday() {
    if (moment(this.validateForm.value.birthday, 'MM/DD/YYYY', true).isValid()) {
      this.validBirthday = true
      return
    }
    this.validBirthday = false
  }

  validatePhoneNumber() {
    const phoneNumber: string = this.validateForm.value.phoneNumber
    this.validPhoneNumber = /^\d+$/.test(phoneNumber) && (phoneNumber.length == 10 ||
      phoneNumber.length == 11)
  }

  showGenderInfo() {
    this.enableGenderInfo = true
  }

  allowSubmit() {
    return this.validateForm.valid && this.validBirthday && this.validBirthday !== undefined &&
      this.validPhoneNumber && this.validPhoneNumber !== undefined
  }

  submit(): void {
    if (this.validateForm.valid) {
      const formValue: any = this.validateForm.value
      const body: PersonalInfoReq = {
        date_of_birth: formValue.birthday,
        download_link_option: formValue.downloadLinkOption,
        gender: formValue.gender,
        gender_details: formValue.genderInfo,
        phone_number: formValue.phoneNumber,
      }
      this.personalInfoService.postPersonalInfo(body).subscribe(
        resp => this.done.emit(true),
        error =>  this.done.emit(false),
      )
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
