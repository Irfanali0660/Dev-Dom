import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { signupinterface } from '../../featureModule/user/interface/signup';
import { logininterface } from '../../featureModule/user/interface/login';

import { SafeHtml } from '@angular/platform-browser';
import { addpostinterface } from 'src/app/featureModule/user/interface/addpost';
import { resetpassinterface } from 'src/app/featureModule/user/interface/resetpass';
import { addlistinterface } from 'src/app/featureModule/user/interface/addlist';
import { reportinterface } from 'src/app/featureModule/user/interface/report';


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

  socialsignup(data:string) :Observable<any>{
    console.log(data+"socialsignup");
    return this.http.get(`${this.localhost}/users/socialsignup/${data}`,this.httpOptions)
  }

  loginData(data:logininterface) :Observable<any>{
    console.log(data);
    return this.http.post(`${this.localhost}/users/login`,data,this.httpOptions)
  }

  sociallogin(data:any) :Observable<any>{
    console.log(data);
    console.log("googlee");
    
    return this.http.get(`${this.localhost}/users/sociallogin/${data}`,this.httpOptions)
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

  getsingletag(id:string):Observable<any>{
    return this.http.get(`${this.localhost}/users/getsingletag/${id}`,this.httpOptions)
  }
  getsinglepost(id:string):Observable<any>{
    return this.http.get(`${this.localhost}/users/singlepost/${id}`,this.httpOptions)
  }
  forgotpass(email:string | undefined | null):Observable<any>{
    console.log(email,'userservice');
    return this.http.post(`${this.localhost}/users/forgotpass`,{email},this.httpOptions)
  }
  restpass(formData:resetpassinterface):Observable<any>{
    return this.http.post(`${this.localhost}/users/resetpassword`,formData,this.httpOptions)
  }
  comments(id:string):Observable<any>{
    return this.http.post(`${this.localhost}/users/comments`,{id},this.httpOptions)
  }
  addlike(id:string,value:boolean | undefined):Observable<any>{
    return this.http.put(`${this.localhost}/users/addlike`,{id,value},this.httpOptions)
  }
  getlistcategory():Observable<any>{
    return this.http.get(`${this.localhost}/users/getlistcate`,this.httpOptions)
  }
  addnewlist(formData:addlistinterface,tags:Array<string>):Observable<any>{
    return this.http.post(`${this.localhost}/users/addnewlist`,{formData,tags},this.httpOptions)
  }
  getlist():Observable<any>{
    return this.http.get(`${this.localhost}/users/getlist`,this.httpOptions)
  }
  gettagpost(id:string):Observable<any>{
    return this.http.get(`${this.localhost}/users/gettagpost?id=${id}`,this.httpOptions)
  }
  report(id:string,formData:reportinterface):Observable<any>{
    return this.http.post(`${this.localhost}/users/report`,{id,formData},this.httpOptions)
  }
  gettags():Observable<any>{
    return this.http.get(`${this.localhost}/users/gettags`,this.httpOptions)
  }
  addreadlist(id:string):Observable<any>{
    return this.http.post(`${this.localhost}/users/addreadlist`,{id},this.httpOptions)
  }
  getreadlist():Observable<any>{
    return this.http.get(`${this.localhost}/users/getreadlist`,this.httpOptions)
  }
  removereadlist(id:string):Observable<any>{    
    console.log(id,'userserrvice');
    
    return this.http.delete(`${this.localhost}/users/removereadlist/${id}`,this.httpOptions)
  }
}
