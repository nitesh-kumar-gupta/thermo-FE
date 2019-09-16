import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CookieService } from './cookie.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected apiUrl: string;
  protected httpHeaders: HttpHeaders;
  constructor() {
    this.apiUrl = environment.API;
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }
  protected getHeaders() {
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const token = CookieService.readCookie('token');
    if (token) {
      this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `JWT ${token}`);
    }
    return {headers: this.httpHeaders};
  }
  protected postOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected getOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected putOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected deleteOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected patchOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected extractData(httpResponse: HttpResponse<object>) {
    // tslint:disable-next-line: no-string-literal
    return httpResponse['data'] || {};
  }
  protected handleError(httpErrorResponse: HttpErrorResponse) {
    if (httpErrorResponse.status === 0) {
      return throwError({
          message: 'Please check internet connection!'
      });
    } else if (httpErrorResponse.error.error.message === 'Session expired please re-login.') {
      CookieService.eraseCookie('token');
      window.location.href = `http://localhost:4200`;
    }
    return throwError(httpErrorResponse.error.error || {});
  }
}
