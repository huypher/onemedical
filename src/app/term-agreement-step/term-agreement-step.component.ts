import {Component, EventEmitter, Output} from '@angular/core';
import {TermAgreementStepService} from "./term-agreement-step.service";
import {TermAgreementReq} from "./types";
import {getLocalStorage} from "../core/util/local-storage";
import {loadingTime, tokenKey} from '../constant';

@Component({
  selector: 'app-term-agreement-step',
  templateUrl: './term-agreement-step.component.html',
  styleUrls: ['./term-agreement-step.component.css']
})
export class TermAgreementStepComponent {
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  memberShipTerm: boolean = false;
  medicalTerm: boolean = false;
  privacyPolicyTerm: boolean = false;
  noticePolicyTerm: boolean = false;
  loading: boolean = false
  isMemberShipTermActive: boolean = false
  isMedicalTermActive: boolean = false
  isPrivacyPolicyTermActive: boolean = false
  isNoticePolicyTermTermActive: boolean = false

  constructor(private termAgreementService: TermAgreementStepService) {}

  collapseChange(id: string, isActive: boolean) {
    switch (id) {
      case "memberShipTerm":
        this.isMemberShipTermActive = isActive
        break;
      case "medicalTerm":
        this.isMedicalTermActive = isActive
        break;
      case "privacyPolicyTerm":
        this.isPrivacyPolicyTermActive = isActive
        break;
      case "noticePolicyTerm":
        this.isNoticePolicyTermTermActive = isActive
        break;
    }
  }

  allowSubmit() {
    return this.memberShipTerm && this.medicalTerm && this.privacyPolicyTerm && this.noticePolicyTerm
  }

  submitWithDelay() {
    this.loading = true
    setTimeout(() => this.submit(), loadingTime)
  }

  submit() {
    if (this.allowSubmit()) {
      const body: TermAgreementReq = {term_accepted: true}
      this.termAgreementService.postTermAgreement(body).subscribe(
        resp => this.done.emit(true),
        error =>  this.done.emit(false),
      )
    }
  }
}
