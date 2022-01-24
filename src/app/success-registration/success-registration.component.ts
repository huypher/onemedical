import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {delLocalStorage} from "../core/util/local-storage";
import {stepKey, tokenKey} from "../constant";

@Component({
  selector: 'app-success-registration',
  templateUrl: './success-registration.component.html',
  styleUrls: ['./success-registration.component.css'],
})
export class SuccessRegistrationComponent implements OnInit {
  @Output() restart: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  ngOnInit() {
  }

  restartRegister() {
    this.restart.emit(true)
  }
}
