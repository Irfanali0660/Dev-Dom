import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../store/action'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{
  ngOnInit(): void { }

  constructor(private store:Store){}
  otp!:Number
  
  verifyotp(){
    
    this.store.dispatch(auth.otp({value:this.otp}))

  }

}

