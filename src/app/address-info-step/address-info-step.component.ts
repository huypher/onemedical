import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AddressInfoService} from "./address-info.service";
import {AddressInfoReq} from "./types";

@Component({
  selector: 'app-address-info-step',
  templateUrl: './address-info-step.component.html',
  styleUrls: ['./address-info-step.component.css']
})
export class AddressInfoStepComponent implements OnInit {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  validateForm!: FormGroup;

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

  submit(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
