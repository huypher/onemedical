import {Injectable} from "@angular/core";
import {ConfigService} from "../core/services/configs/config.service"
import {HttpClient} from "@angular/common/http";
import {LoginInfoReq, LoginInfoResp} from "./types";

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
    const file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
    return this.httpClient.post<LoginInfoResp>(`${this.baseUrl}/register/step1`, body, {observe: `response`})
  }
}
