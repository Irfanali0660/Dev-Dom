import { Component,OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as auth from '../../store/action'
import { FormControl, Validators } from '@angular/forms';
import { errorSelector, signupSelector } from '../../store/selector';
import { appstateinterface } from 'src/app/appSatate.interface';
import { signupinterface } from '../../interface/signup';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{
  iserror$!: String | null;
  ngOnInit(): void { 
 
      this.store.pipe(select(errorSelector)).subscribe((err)=>{
        this.iserror$=err 
        setTimeout(() => {
          this.iserror$=null
        }, 3000);
      })
  }

  constructor(private store:Store<appstateinterface>){
 
  }
  otp!:Number

  verifyotp(){
    console.log(this.otp);
    this.store.dispatch(auth.otp({value:this.otp}))
  }

}

