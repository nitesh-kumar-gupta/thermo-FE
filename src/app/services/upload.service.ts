import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }
  upload(data) {
    let formData: FormData = new FormData();
    formData.append('file', data, data.name);
    const url = `${this.apiUrl}/file/upload`;
    return this.httpClient.post(url, formData, {}).pipe(map(this.extractData), catchError(this.handleError));
  }
}
