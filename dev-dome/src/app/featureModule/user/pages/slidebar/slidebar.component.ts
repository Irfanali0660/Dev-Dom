import { Component } from '@angular/core';
import { signupinterface } from '../../interface/signup';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import { signupSelector } from '../../store/selector';
import { UsersService } from 'src/app/coreModule/service/users.service';
import * as auth from '../../store/action' 

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {
  signup!:signupinterface
  notification=false
constructor(private store:Store<appstateinterface>,private userservice: UsersService){}
  ngOnInit(): void {
    this.apilogincheck()
    this.store.pipe(select(signupSelector)).subscribe((data)=>{
      this.signup=data
      console.log(data,'dataa');
      })
  }
  user!:string | boolean
  logout(){
    localStorage.clear()
    this.apilogincheck()
  }

  apilogincheck(){
    if(localStorage.getItem('token')){
      this.getuser()
      this.user=true
    }else{
      this.user=false
    }
  }
  generateotp(){
    this.store.dispatch(auth.generateotp())
  }
  getuser(){
    this.store.dispatch(auth.getuser())
  }
notfi(){
  this.notification=!this.notification
  console.log(this.notification);
  
}
}
