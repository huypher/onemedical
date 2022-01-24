import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public urlAddress: string = environment.apiUrl
  public apiVersion: string = 'v1'
  public baseUrl: string = `${this.urlAddress}/${this.apiVersion}`
  constructor() { }
}
