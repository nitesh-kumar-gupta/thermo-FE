import { Injectable } from '@angular/core';
import { SCRIPTS } from '../constants/script.constants';
import { Script } from '../interfaces/script';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private scripts: any = [];
  constructor() {
    SCRIPTS.forEach((script: Script) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  loadScripts(...scriptNames) {
    const promises: any = [];
    scriptNames.forEach((sn) => {
      promises.push(this.addScript(sn));
    });
    return Promise.all(promises);
  }

  addScript(scriptName) {
    let script: any;
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, resect) => {
      if (!this.scripts[scriptName].loaded) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[scriptName].src;
        if (script.readyState) {
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[scriptName].loaded = true;
              resolve({script: scriptName, loaded: true});
            }
          };
        } else {
          script.onload = () => {
            this.scripts[scriptName].loaded = true;
            resolve({script: scriptName, loaded: true});
          };
        }
        script.onerror = (error: any) => {
          resolve({script: scriptName, loaded: false});
        };
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  unloadScript(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.removeScript(script)));
    return Promise.all(promises);
  }

  removeScript(name: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      let script;
      if (this.scripts[name].loaded) {
        script = document.getElementsByTagName('script');
        for (let i = script.length - 1; i >= 0; i--) {
          if (script[i] && script[i].getAttribute('src') && script[i].getAttribute('src').indexOf(this.scripts[name].src) !== -1) {
            this.scripts[name].loaded = false;
            resolve({script: name, loaded: false, status: 'Loaded'});
            script[i].parentNode.removeChild(script[i]);
          }
        }
      }
    });
  }
}
