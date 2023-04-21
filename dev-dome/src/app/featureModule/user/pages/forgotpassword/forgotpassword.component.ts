import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as auth from '../../store/action' 
import { Observable } from 'rxjs';
import { isLoadingSelector } from '../../store/selector';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{
  
  ngOnInit(): void {
   
  }
isLoading$:Observable<Boolean>
constructor(private store:Store<appstateinterface>){
   this.isLoading$=this.store.pipe(select(isLoadingSelector))
}
  forgot= new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),  
  })
 
    forgotpass(){
      if(this.forgot.valid){
        console.log(this.forgot.value);
        this.store.dispatch(auth.forgotpass({email:this.forgot.value.email}))
      }
    }
}
