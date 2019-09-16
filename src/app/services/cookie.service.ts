import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() {
  }
  static writeCookie(name: string, value: string, days: any = 1) {
    if (name) {
      value = CookieService.encrypt(value);
      const expDate = new Date();
      expDate.setTime(expDate.getTime() + (days * 24 * 60 * 60 * 1000));
      const expireIn = expDate.toUTCString();
      const domain = environment.APP_EXTENSION;
      document.cookie = `${name}=${value};expires=${expireIn};domain=${domain};path=/;`;
    }
  }
  static readCookie(name: string) {
    const cookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookie ? CookieService.decrypt(cookie.pop()) : null;
  }
  static eraseCookie(name: string) {
    CookieService.writeCookie(name, '', -1);
  }
  static encrypt(text) {
    const cipherText = crypto.AES.encrypt(text, environment.SECRET);
    return cipherText;
  }
  static decrypt(text) {
    try {
      const bytes = crypto.AES.decrypt(text.toString(), environment.SECRET);
      return bytes.toString(crypto.enc.Utf8);
    } catch (err) {
        return text;
    }
  }
}
