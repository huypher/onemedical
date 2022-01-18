import {HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {AuthInterceptor} from "./auth-interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
