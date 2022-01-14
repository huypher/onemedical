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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginInfoStepComponent,
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
        NgbModule,
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
