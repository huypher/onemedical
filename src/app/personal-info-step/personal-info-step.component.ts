import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PersonalInfoStepService} from "./personal-info-step.service";
import {PersonalInfoReq} from "./types";

type Rule = (self: any, pwd: string) => boolean

@Component({
  selector: 'app-personal-info-step',
  templateUrl: './personal-info-step.html',
  styleUrls: ['./personal-info-step.css']
})
export class PersonalInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  validateForm!: FormGroup;
  downloadLinkChecked: boolean = false
  enableGenderInfo: boolean = false

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

  showGenderInfo() {
    this.enableGenderInfo = true
  }

  submit(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const formValue: any = this.validateForm.value
      const body: PersonalInfoReq = {
        date_of_birth: formValue.date_of_birth,
        gender: formValue.gender,
        gender_details: formValue.gender_details,
        phone_number: formValue.phoneNumber,
      }
      this.personalInfoService.postPersonalInfo(body).subscribe(
        resp => console.log(resp),
        error => {console.log(error); this.done.emit(true)}
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
