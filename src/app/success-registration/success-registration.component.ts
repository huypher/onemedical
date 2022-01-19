import {Component, OnInit} from '@angular/core';
import {delLocalStorage} from "../core/util/local-storage";
import {stepKey, tokenKey} from "../constant";

@Component({
  selector: 'app-success-registration',
  templateUrl: './success-registration.component.html'
})
export class SuccessRegistrationComponent implements OnInit{
  ngOnInit() {
    delLocalStorage(tokenKey)
    delLocalStorage(stepKey)
  }
}
