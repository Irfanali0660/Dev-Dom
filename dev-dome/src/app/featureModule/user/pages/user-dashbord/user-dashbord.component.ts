import { Component } from '@angular/core';
import { userinterface } from '../../interface/user';
import { appstateinterface } from 'src/app/appSatate.interface';
import { Store, select } from '@ngrx/store';
import { signupSelector } from '../../store/selector';
import moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as action from '../../store/action' 


@Component({
  selector: 'app-user-dashbord',
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css']
})
export class UserDashbordComponent {
  model=false
  userData!:userinterface
  constructor(private store:Store<appstateinterface>){
   this.user()
  }
  user(){
    this.store.pipe(select(signupSelector)).subscribe((data)=>{
      this.userData=data
      console.log(data,'dataa');
    })
  }

  getexpdate(date:string | null | undefined |Date): string {
    return moment(date).format('MMM DD YYYY');
  }

  updateBio = new FormGroup({
    'userName': new FormControl('', [Validators.required, Validators.pattern(/^.{4,}$/)]),
    'phone': new FormControl('', [Validators.required, Validators.pattern(/^([7-9]\d{9})$/)]),
    'location': new FormControl('', [Validators.required]),
    'gender': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'birthday': new FormControl('', [Validators.required]),
    'work': new FormControl('', [Validators.required]),
  })

  bio(){
    if(this.updateBio.valid){
      console.log(this.updateBio.value);
      this.store.dispatch(action.updateBio({form:this.updateBio.value}))
      this.user()
    } 
  }
}
