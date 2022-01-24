import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PersonalInfoStepService} from "./personal-info-step.service";
import {PersonalInfoReq, PersonalInfoSessionData} from "./types";
import * as moment from 'moment';
import {loadingTime} from '../constant';
import {AddressInfoSessionData} from "../address-info-step/types";

@Component({
  selector: 'app-personal-info-step',
  templateUrl: './personal-info-step.html',
  styleUrls: ['./personal-info-step.css']
})
export class PersonalInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  @Output() currentSession: EventEmitter<PersonalInfoSessionData> = new EventEmitter<PersonalInfoSessionData>(false)
  @Input() restoreSessionData: PersonalInfoSessionData = {}
  validateForm!: FormGroup;
  enableGenderInfo: boolean = false
  isBirthdayValid: boolean | undefined = undefined
  isPhoneNumberValid: boolean | undefined = undefined
  loading: boolean = false
  isFailed: boolean = false

  constructor(
    private fb: FormBuilder,
    private personalInfoService: PersonalInfoStepService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phoneNumber: [this.restoreSessionData.phone_number || null, [Validators.required]],
      downloadLinkOption: [this.restoreSessionData.download_link_option || null],
      birthday: [this.restoreSessionData.date_of_birth || null, [Validators.required]],
      gender: [this.restoreSessionData.gender || null, [Validators.required]],
      genderInfo: [this.restoreSessionData.gender_details || null],
    });
    if (this.validateForm.value.birthday !== null) {
      this.birthdayValidator()
    }
    if (this.validateForm.value.phoneNumber !== null) {
      this.phoneNumberValidator()
    }
  }

  birthdayValidator() {
    this.isBirthdayValid = moment(this.validateForm.value.birthday, 'MM/DD/YYYY', true).isValid()
  }

  phoneNumberValidator() {
    const phoneNumber: string = this.validateForm.value.phoneNumber
    this.isPhoneNumberValid = /^\d+$/.test(phoneNumber) && (phoneNumber.length == 10 ||
      phoneNumber.length == 11)
  }

  showGenderInfo() {
    this.enableGenderInfo = true
  }

  allowSubmit() {
    return this.validateForm.valid && this.isBirthdayValid && this.isBirthdayValid !== undefined &&
      this.isPhoneNumberValid && this.isPhoneNumberValid !== undefined
  }

  inputChange(id: string) {
    switch (id) {
      case "phoneNumber":
        this.phoneNumberValidator()
        break;
      case "birthday":
        this.birthdayValidator()
        break;
    }
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
    const formValue: any = this.validateForm.value
    const sessionData: PersonalInfoSessionData =
      {
        date_of_birth: formValue.birthday,
        download_link_option: formValue.downloadLinkOption,
        gender: formValue.gender,
        gender_details: formValue.genderInfo,
        phone_number: formValue.phoneNumber,
      }
    const body: PersonalInfoReq = {
      date_of_birth: formValue.birthday,
      download_link_option: formValue.downloadLinkOption,
      gender: formValue.gender,
      gender_details: formValue.genderInfo,
      phone_number: formValue.phoneNumber,
    }
    this.personalInfoService.postPersonalInfo(body).subscribe(
      resp => {
        this.currentSession.emit(sessionData)
        this.done.emit(true)
      },
      error =>  {
        this.isFailed = true
        this.loading = false
      }
    )
  }
}
