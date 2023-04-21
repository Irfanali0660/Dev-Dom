import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { taginterface } from 'src/app/featureModule/admin/interfaces/taginterface';
import { deletetag } from 'src/app/featureModule/admin/store/action';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient) {  }

  localhost='http://localhost:4000'

  adminlogin(data:any) :Observable<any>{
    return this.http.post(`${this.localhost}/admin/adminlogin`,data,this.httpOptions)
  }
  userData() :Observable<any>{
    return this.http.get(`${this.localhost}/admin/users`,this.httpOptions)
  }
  status(id: string):Observable<any>{
    console.log(id);
    return this.http.put(`${this.localhost}/admin/status/${id}`,this.httpOptions)
  }
  addtag(data:any,file:any):Observable<any>{
    console.log(file);
    console.log("Fileeeee");
    
    // const body:any[]=[data,file]
    let formData = new FormData()
    formData.append('image',file[0])
    for (const key in data) {
      formData.append(key,data[key])
    }
    console.log(formData);
    return this.http.post(`${this.localhost}/admin/addtag`,formData)
  }
  edittag(data:any,file:any):Observable<any>{
    console.log(file);
    console.log("Fileeeee");
    
    // const body:any[]=[data,file]
    let formData = new FormData()
    formData.append('image',file[0])
    for (const key in data) {
      formData.append(key,data[key])
    }
    console.log(formData);
    return this.http.post(`${this.localhost}/admin/edittag`,formData)
  }
  gettags() :Observable<any>{
    return this.http.get(`${this.localhost}/admin/gettags`,this.httpOptions)
  }
  deletetag(id:string) :Observable<any>{
    console.log(id);
    return this.http.delete(`${this.localhost}/admin/deletetag/${id}`,this.httpOptions)
  }
  gettagDetails(id:string) :Observable<any>{
    console.log(id+"gettagdetails");
    return this.http.get(`${this.localhost}/admin/tagdetails/${id}`,this.httpOptions)
  }
}
