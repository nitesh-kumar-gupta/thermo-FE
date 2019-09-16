import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
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
    }
    return throwError(httpErrorResponse.error.error || {});
  }
}
