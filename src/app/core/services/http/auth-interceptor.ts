import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {getLocalStorage} from "../../util/local-storage";
import {tokenKey} from "../../../constant";

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements  HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authReq = this.attachToken(req)
    return next.handle(authReq)
  }

  private attachToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = getLocalStorage(tokenKey)
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
