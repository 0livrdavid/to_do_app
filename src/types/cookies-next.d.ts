declare module 'cookies-next' {
    export function setCookie(name: string, value: any, options?: any): void;
    export function getCookie(name: string, options?: any): any;
    export function deleteCookie(name: string, options?: any): void;
  }