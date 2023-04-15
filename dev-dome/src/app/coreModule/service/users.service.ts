import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { signupinterface } from '../../featureModule/user/interface/signup';
import { logininterface } from '../../featureModule/user/interface/login';

import { SafeHtml } from '@angular/platform-browser';
import { addpostinterface } from 'src/app/featureModule/user/interface/addpost';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient) {  }

  localhost='http://localhost:4000'

  SignupData(data:signupinterface) :Observable<any>{
    console.log(data+"data");
    return this.http.post(`${this.localhost}/users/signup`,data,this.httpOptions)
  }

  loginData(data:logininterface) :Observable<any>{
    console.log(data);
    return this.http.post(`${this.localhost}/users/login`,data,this.httpOptions)
  }
 
  otp(value:Number):Observable<any>{
    return this.http.post(`${this.localhost}/users/otp`,value,this.httpOptions)
  }

  addpost(data:addpostinterface) :Observable<any>{
    console.log(data);
    console.log("POST+++++");
    let formData = new FormData()
    // formData.append('image',data.image)
    for (const key in data) {
      formData.append(key,data[key])
    }
    console.log(formData);
    
    return this.http.post(`${this.localhost}/users/addpost`,formData)
  }
  gettag():Observable<any>{
    console.log("gettag userservice");
    return this.http.get(`${this.localhost}/users/gettag`,this.httpOptions)
  }
}
