import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Iterator} from '../core/util/iterator'
import {delLocalStorage, getLocalStorage, saveLocalStorageWithExpire} from "../core/util/local-storage";
import {stepKey, tokenKey, ttl} from '../constant';
import {AddressInfoSessionData} from "../address-info-step/types";
import {PersonalInfoSessionData} from "../personal-info-step/types";
import {LoginInfoSessionData} from "../login-info-step/types";

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
  isBackVisibility: boolean = false;
  addressInfoSessionData: AddressInfoSessionData = {}
  personalInfoSessionData: PersonalInfoSessionData = {}
  loginInfoSessionData: LoginInfoSessionData = {}

  ngOnInit(): void {
    const init = this.fromStep()
    if (init == 0) {
      this.nextStep(true)
      return
    }
    if (init == steps.length-1) {
      this.restart(true)
      return
    }
    this.currentStep.next(RegistrationRestartStep)
  }

  addressInfoSession(data: AddressInfoSessionData) {
    this.addressInfoSessionData = data
  }

  personalInfoSession(data: PersonalInfoSessionData) {
    this.personalInfoSessionData = data
  }

  loginInfoSession(data: LoginInfoSessionData) {
    this.loginInfoSessionData = data
  }

  checkBackVisibility(stepIdx: number) {
    this.isBackVisibility = stepIdx >= 2 && stepIdx < steps.length-1
  }

  fromStep(): number {
    const step = getLocalStorage(stepKey)
    if (step === '') {
      this.checkBackVisibility(0)
      return 0
    }
    const stepIdx = steps.findIndex(e => e === step)
    this.checkBackVisibility(stepIdx)
    return stepIdx
  }

  nextStep(done: boolean) {
    if (!done) {
      this.rerender = !this.rerender
      return
    }
    const nextStep =  this.stepIterator.next()
    if (nextStep != undefined) {
      this.currentStep.next(nextStep.state)
      this.checkBackVisibility(nextStep.idx)
      this.percent = (nextStep.idx+1) * this.percentUnit
      saveLocalStorageWithExpire(stepKey, nextStep?.state || '', ttl)
    }
  }

  previousStep() {
    const previousStep =  this.stepIterator.previous()
    if (previousStep != undefined) {
      this.currentStep.next(previousStep.state)
      this.checkBackVisibility(previousStep.idx)
      this.percent = (previousStep.idx+1) * this.percentUnit
      saveLocalStorageWithExpire(stepKey, previousStep?.state || '', ttl)
    }
  }

  restart(ok: boolean) {
    if (!ok) {
      this.nextStep(true)
      return
    }
    delLocalStorage(tokenKey)
    delLocalStorage(stepKey)
    this.loginInfoSessionData = {}
    this.addressInfoSessionData = {}
    this.personalInfoSessionData = {}
    this.stepIterator.reset()
    this.nextStep(true)
  }
}
