import {Component, EventEmitter, Output} from '@angular/core';
import {delLocalStorage} from "../core/util/local-storage";
import {stepKey, tokenKey} from "../constant";

@Component({
  selector: 'app-registration-restart',
  templateUrl: './registration-restart.component.html',
  styleUrls: ['./registration-restart.component.css'],
})
export class RegistrationRestartComponent {
  @Output() restart: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  continueRegister() {
    this.restart.emit(false)
  }

  restartRegister() {
    this.restart.emit(true)
  }
}
