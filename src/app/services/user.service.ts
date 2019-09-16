import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) {
    super();
  }
  retrieveUser() {
    const url = `${this.apiUrl}/user`;
    return this.httpClient.get(url, this.getOptions()).pipe(map(this.extractData), catchError(this.handleError));
  }
  setUser(data) {
    this.user.next(data);
  }
  getUser() {
    return this.user.asObservable();
  }
  upload(data) {
    let formData: FormData = new FormData();
    formData.append('file', data, data.name);
    const url = `${this.apiUrl}/file/upload`;
    return this.httpClient.post(url, formData, {}).pipe(map(this.extractData), catchError(this.handleError));
  }
}
