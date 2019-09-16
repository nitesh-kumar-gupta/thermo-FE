import { Script } from './../interfaces/script';
import { environment } from 'src/environments/environment';
export const SCRIPTS: Script[] = [
    { name: 'grecaptchaV3', src: `https://www.google.com/recaptcha/api.js?render=${environment.GreCaptchaV3SiteKey}`}
];
