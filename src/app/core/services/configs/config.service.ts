import { Injectable } from '@angular/core';
import {environment} from "./environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public urlAddress: string = environment.urlAddress
  public apiVersion: string = environment.apiVersion
  public baseUrl: string = `${this.urlAddress}/${this.apiVersion}`
  constructor() { }
}
