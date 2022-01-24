import {Injectable} from "@angular/core";
import {ConfigService} from "../core/services/configs/config.service"
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LoginInfoReq, LoginInfoResp} from "./types";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class LoginInfoService {
  baseUrl: string = this.cfg.baseUrl

  constructor(
    private httpClient: HttpClient,
    private cfg: ConfigService) {
  }

  public postLoginInfo(body: LoginInfoReq) {
    return this.httpClient.post<LoginInfoResp>(`${this.baseUrl}/register/login-info`, body, {observe: `response`})
  }
}
