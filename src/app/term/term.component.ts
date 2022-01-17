import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent{
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  memberShipTerm: boolean = false;
  medicalTerm: boolean = false;
  privacyPolicyTerm: boolean = false;
  noticePolicyTerm: boolean = false;

  allowSubmit() {
    return this.memberShipTerm && this.medicalTerm && this.privacyPolicyTerm && this.noticePolicyTerm
  }

  submit() {
    if (this.allowSubmit()) {
      this.done.emit(true)
    }
  }
}
