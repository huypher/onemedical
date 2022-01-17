import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Iterator} from '../core/util/iterator'

type Step = string | undefined

const steps: Array<string> = ['login-info', 'address-info', 'personal-info', 'term', 'payment']

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  percent: number = 0;
  currentStep: BehaviorSubject<Step> = new BehaviorSubject<Step>(undefined)
  stepIterator: Iterator<Step> = new Iterator<Step>(this.fromStep(), steps)
  percentUnit: number = 100/steps.length

  ngOnInit(): void {
    this.nextStep()
  }

  fromStep(): number {
    return 0
  }

  nextStep() {
    const nextStep =  this.stepIterator.next()
    if (nextStep != undefined) {
      this.currentStep.next(nextStep.state)
      this.percent = (nextStep.idx+1) * this.percentUnit
    }
  }
}
