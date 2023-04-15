import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Modify the request here
    if (request.url.includes('/admin')) {
      console.log("INTERCEPTOR");
      
      if(localStorage.getItem('adtoken')){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('adtoken')}`
          }
        });
      }
    }else{
      if(localStorage.getItem('token')){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
    }
    return next.handle(request);
  }

}
