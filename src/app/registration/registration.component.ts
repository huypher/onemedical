import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BehaviorSubject} from "rxjs";

type Step = 'login_info' | 'address_info';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() percent: number = 20;
  currentStep: BehaviorSubject<Step> = new BehaviorSubject<Step>('login_info')

  ngOnInit(): void {
  }
}
