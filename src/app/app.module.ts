import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzProgressModule} from "ng-zorro-antd/progress";
import { LoginInfoStepComponent } from './login-info-step/login-info-step.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {AddressInfoStepComponent} from "./address-info-step/address-info-step.component";
import {PersonalInfoStepComponent} from "./personal-info-step/personal-info-step.component";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzRadioModule} from "ng-zorro-antd/radio";
import { TermAgreementStepComponent } from './term-agreement-step/term-agreement-step.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import { SuccessRegistrationComponent } from './success-registration/success-registration.component';
import {NzResultModule} from "ng-zorro-antd/result";
import {RerenderDirective} from "./rerender.directive";
import {httpInterceptorProviders} from "./core/services/http/interceptor-provider";
import { RegistrationRestartComponent } from './registration-restart/registration-restart.component';
import {NzAlertModule} from "ng-zorro-antd/alert";
import { MessageComponent } from './core/component/message/message.component';
import {NzMessageModule} from "ng-zorro-antd/message";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginInfoStepComponent,
    AddressInfoStepComponent,
    PersonalInfoStepComponent,
    TermAgreementStepComponent,
    SuccessRegistrationComponent,
    RerenderDirective,
    RegistrationRestartComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzProgressModule,
    NzSelectModule,
    NzSpaceModule,
    NzCheckboxModule,
    NzRadioModule,
    NzCollapseModule,
    NzResultModule,
    NzAlertModule,
    NzMessageModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
