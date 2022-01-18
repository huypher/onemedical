import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AddressInfoService} from "./address-info.service";
import {AddressInfoReq} from "./types";
import {getLocalStorage} from "../core/util/local-storage";
import {tokenKey} from '../constant';


@Component({
  selector: 'app-address-info-step',
  templateUrl: './address-info-step.component.html',
  styleUrls: ['./address-info-step.component.css']
})
export class AddressInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  validateForm!: FormGroup;
  states: Array<string> = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon',
  'Paula', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Armed Forces Americas', 'Armed Forces Europe/Middle East/Africa/Canada', 'Armed Forces Pacific']

  areas: Array<string> = ['SF Bay Area', 'New York', 'D.C. Metro Area (DMV)', 'Boston', 'Chicago', 'Los Angeles', 'Phoenix', 'Seattle', 'San Diego', 'Atlanta',
  'Portland', 'Orange County', 'Austin', 'Raleigh-Durham', 'Columbus', 'Houston', 'Alabama', 'Kansas City']

  constructor(
    private fb: FormBuilder,
    private addressInfoService: AddressInfoService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      address1: [null, [Validators.required]],
      address2: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
      area: [null, [Validators.required]],
    });
  }

  allowSubmit() {
    return this.validateForm.valid
  }

  submit(): void {
    if (this.validateForm.valid) {
      const formValue: any = this.validateForm.value
      const body: AddressInfoReq =
        {
          address: {
            address1: formValue.address1,
            address2: formValue.address2,
            city  : formValue.city,
            state_code: formValue.state_code,
            zip: formValue.zipcode,
          },
          service_area_code: formValue.area
        }
      this.addressInfoService.postAddressInfo(body).subscribe(
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
