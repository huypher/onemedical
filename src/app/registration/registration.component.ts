import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Iterator} from '../core/util/iterator'
import {delLocalStorage, getLocalStorage, saveLocalStorageWithExpire} from "../core/util/local-storage";
import {stepKey, tokenKey, ttl} from '../constant';

type Step = string | undefined

const steps: Array<string> = ['login-info', 'address-info', 'personal-info', 'term-agreement-step', 'success-registration']
const RegistrationRestartStep : string = 'registration-restart'

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
    const init = this.fromStep()
    if (init == 0) {
      this.nextStep(true)
      return
    }
    this.currentStep.next(RegistrationRestartStep)
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

  restart(ok: boolean) {
    if (!ok) {
      this.nextStep(true)
      return
    }
    delLocalStorage(tokenKey)
    delLocalStorage(stepKey)
    this.stepIterator.reset()
    this.nextStep(true)
  }
}
