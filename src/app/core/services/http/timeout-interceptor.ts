import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {httpReqTimeout} from "../../../constant";
import {catchError, timeout} from "rxjs/operators";
import { empty, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TimeoutInterceptor implements  HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      timeout(httpReqTimeout),
    )
  }
}
