import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AddressInfoService} from "./address-info.service";
import {AddressInfoReq, AddressInfoSessionData} from "./types";
import {loadingTime} from '../constant';

@Component({
  selector: 'app-address-info-step',
  templateUrl: './address-info-step.component.html',
  styleUrls: ['./address-info-step.component.css']
})
export class AddressInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  @Output() currentSession: EventEmitter<AddressInfoSessionData> = new EventEmitter<AddressInfoSessionData>(false)
  @Input() restoreSessionData: AddressInfoSessionData = {}
  validateForm!: FormGroup;
  states: Array<string> = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon',
  'Paula', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Armed Forces Americas', 'Armed Forces Europe/Middle East/Africa/Canada', 'Armed Forces Pacific']

  areas: Array<string> = ['SF Bay Area', 'New York', 'D.C. Metro Area (DMV)', 'Boston', 'Chicago', 'Los Angeles', 'Phoenix', 'Seattle', 'San Diego', 'Atlanta',
  'Portland', 'Orange County', 'Austin', 'Raleigh-Durham', 'Columbus', 'Houston', 'Alabama', 'Kansas City']

  address1Validator: boolean | undefined = undefined;
  cityValidator: boolean | undefined = undefined;
  zipCodeValidator: boolean | undefined = undefined;
  loading: boolean = false
  isFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addressInfoService: AddressInfoService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      address1: [this.restoreSessionData.address1 || null, [Validators.required]],
      address2: [this.restoreSessionData.address2 || null, [Validators.required]],
      city: [this.restoreSessionData.city || null, [Validators.required]],
      state: [this.restoreSessionData.state_code || null, [Validators.required]],
      zipcode: [this.restoreSessionData.zip || null, [Validators.required]],
      area: [this.restoreSessionData.service_area_code || null, [Validators.required]],
    });
  }

  inputChange(id: string) {
    const formValue = this.validateForm.value
    switch (id) {
      case "address1":
        this.address1Validator = formValue.address1.length !== 0;
        break;
      case "city":
        this.cityValidator = formValue.city.length !== 0;
        break;
      case "zipcode":
        this.zipCodeValidator = formValue.zipcode.length !== 0;
        break;
    }
  }

  allowSubmit() {
    return this.validateForm.valid
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
    const sessionData: AddressInfoSessionData =
      {
        address1: formValue.address1,
        address2: formValue.address2,
        city  : formValue.city,
        state_code: formValue.state,
        zip: formValue.zipcode,
        service_area_code: formValue.area
    }
    const body: AddressInfoReq =
      {
        address: {
          address1: formValue.address1,
          address2: formValue.address2,
          city  : formValue.city,
          state_code: formValue.state,
          zip: formValue.zipcode,
        },
        service_area_code: formValue.area
      }
    this.addressInfoService.postAddressInfo(body).subscribe(
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
