import {Injectable} from "@angular/core";
import {ConfigService} from "../core/services/configs/config.service"
import {HttpClient} from "@angular/common/http";
import {AddressInfoReq, AddressInfoResp} from "./types";

@Injectable({
  providedIn: 'root'
})

export class AddressInfoService {
  baseUrl: string = this.cfg.baseUrl

  constructor(
    private httpClient: HttpClient,
    private cfg: ConfigService) {
  }

  public postAddressInfo(body: AddressInfoReq) {
    return this.httpClient.post<AddressInfoResp>(`${this.baseUrl}/register/address-info`, body, {observe: `response`})
  }
}
