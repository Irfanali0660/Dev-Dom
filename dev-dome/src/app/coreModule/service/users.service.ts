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
  generateotp():Observable<any>{
    console.log("hello");
    
    return this.http.get(`${this.localhost}/users/generateotp`,this.httpOptions)
  }
  otp(data:Number):Observable<any>{
    console.log(data,"value");
    return this.http.put(`${this.localhost}/users/otp`,{data},this.httpOptions)
  }

  addpost(data:addpostinterface) :Observable<any>{
    console.log(data);
    console.log("POST+++++");
    let formData = new FormData()
    // formData.append('image',data.image)
    for (const key in data) {
      formData.append(key,data[key])
    }

    
    return this.http.post(`${this.localhost}/users/addpost`,formData)
  }
  gettag():Observable<any>{
    return this.http.get(`${this.localhost}/users/gettag`,this.httpOptions)
  }

  gettagdetails():Observable<any>{
    return this.http.get(`${this.localhost}/users/gettagdetails`,this.httpOptions)
  }
  getuser():Observable<any>{
    return this.http.get(`${this.localhost}/users/getuser`,this.httpOptions)
  }

  getpost():Observable<any>{
    return this.http.get(`${this.localhost}/users/getpostdetails`,this.httpOptions)
  }
}
