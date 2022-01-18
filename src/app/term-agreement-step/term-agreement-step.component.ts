import {Component, EventEmitter, Output} from '@angular/core';
import {TermAgreementStepService} from "./term-agreement-step.service";
import {TermAgreementReq} from "./types";
import {getLocalStorage} from "../core/util/local-storage";
import {tokenKey} from '../constant';

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

  constructor(private termAgreementService: TermAgreementStepService) {}

  allowSubmit() {
    return this.memberShipTerm && this.medicalTerm && this.privacyPolicyTerm && this.noticePolicyTerm
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
