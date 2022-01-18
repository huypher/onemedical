import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Iterator} from '../core/util/iterator'
import {getLocalStorage, saveLocalStorageWithExpire} from "../core/util/local-storage";
import {stepKey, tokenKey, ttl} from '../constant';

type Step = string | undefined

const steps: Array<string> = ['login-info', 'address-info', 'personal-info', 'term-agreement-step', 'success-registration']

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
  rerender: boolean = false

  ngOnInit(): void {
    this.nextStep(true)
  }

  fromStep(): number {
    const step = getLocalStorage(stepKey)
    if (step === '') {
      return 0
    }
    return steps.findIndex(e => e === step)
  }

  nextStep(done: boolean) {
    if (!done) {
      this.rerender = !this.rerender
      return
    }
    const nextStep =  this.stepIterator.next()
    if (nextStep != undefined) {
      this.currentStep.next(nextStep.state)
      this.percent = (nextStep.idx+1) * this.percentUnit
      saveLocalStorageWithExpire(stepKey, nextStep?.state || '', ttl)
    }
  }
}
