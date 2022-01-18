import {Injectable} from "@angular/core";
import {ConfigService} from "../core/services/configs/config.service"
import {HttpClient} from "@angular/common/http";
import {TermAgreementReq, TermAgreementResp} from "./types";

@Injectable({
  providedIn: 'root'
})

export class TermAgreementStepService {
  baseUrl: string = this.cfg.baseUrl

  constructor(
    private httpClient: HttpClient,
    private cfg: ConfigService) {
  }

  public postTermAgreement(body: TermAgreementReq) {
    return this.httpClient.post<TermAgreementResp>(`${this.baseUrl}/register/term-agreement`, body, {observe: `response`})
  }
}
