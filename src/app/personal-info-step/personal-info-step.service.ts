import {Injectable} from "@angular/core";
import {ConfigService} from "../core/services/configs/config.service"
import {HttpClient} from "@angular/common/http";
import {PersonalInfoReq, PersonalInfoResp} from "./types";

@Injectable({
  providedIn: 'root'
})

export class PersonalInfoStepService {
  baseUrl: string = this.cfg.baseUrl

  constructor(
    private httpClient: HttpClient,
    private cfg: ConfigService) {
  }

  public postPersonalInfo(body: PersonalInfoReq, token: string) {
    return this.httpClient.post<PersonalInfoResp>(`${this.baseUrl}/register/personal-info`, body, {headers: {token: token}, observe: `response`})
  }
}
