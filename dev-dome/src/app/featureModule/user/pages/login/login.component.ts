import { Component, OnInit } from '@angular/core';  
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "src/app/coreModule/service/users.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as auth from '../../store/action' 
import { isLoadingSelector,errorSelector } from 'src/app/featureModule/user/store/selector';
import { Observable } from 'rxjs';
import { appstateinterface } from 'src/app/appSatate.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading$:Observable<Boolean>
  iserror$!:String | null;
constructor(private store:Store<appstateinterface>, private service:UsersService,private _snackbar: MatSnackBar, private route: Router){

 this.isLoading$=this.store.pipe(select(isLoadingSelector))
 
 this.store.pipe(select(errorSelector)).subscribe((err)=>{
  this.iserror$=err
  setTimeout(() => {
    this.iserror$=null
  }, 3000);
  })
  }
  ngOnInit(): void {}
  error!:string | boolean ;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  Login = new FormGroup({
    'email': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required),
    })

  submitlogin(){
    if(this.Login.valid){
      console.log("HELLO");
      this.store.dispatch(auth.login({formData: this.Login.value, isuser:true}))
    }
  }

  // submitlogin(){
  //   if (this.Login.valid) {
  //   console.log(JSON.stringify(this.Login.value)); 
  //   const data=JSON.stringify(this.Login.value)
  //   this.service.loginData(this.Login.value).subscribe((data)=>{
  //     if (data.success) {
  //       this._snackbar.open('Login successfully', 'close', {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         // duration: 6000,
  //         panelClass: ['my-snackbar'] 
  //       })
  //       localStorage.setItem('token', data.token.token)
  //       localStorage.setItem('tokenExp', data.token.exp)
  //       this.route.navigate(['/'])
  //     } else {
  //       this.error = data.failed;
  //       setTimeout(() => {
  //         this.error = false;
  //       }, 3000);
  //     }
  //   })
  //   }else{
  //     this.error="Enter the values"
  //     setTimeout(() => {
  //       this.error=false
  //     }, 3000);
  //   }
  // }

}
