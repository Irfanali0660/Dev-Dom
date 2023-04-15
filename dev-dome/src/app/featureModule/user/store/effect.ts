import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as Action from './action'
import { mergeMap, map } from 'rxjs'
import { UsersService } from "../../../coreModule/service/users.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable()
export class authEffects {

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    Login = createEffect(() =>
        this.actoins$.pipe(ofType(Action.login), mergeMap((action: any) => {
            // console.log(action);
            return this.userservice.loginData(action.formData).pipe(map((data) => {
                console.log(data);
                if (data.success) {
                    this._snackbar.open('Login successfully', 'close', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: 4000,
                        panelClass: ['my-snackbar']
                    })
                    localStorage.setItem('token', data.token.token)
                    localStorage.setItem('tokenExp', data.token.exp)
                    this.route.navigate(['/'])
                    return Action.loginsuccess()

                } else {
                    return Action.loginfailure({ error: data.failed })
                }
            }
            ))
        }))
    )
    signup=createEffect(()=>
    this.actoins$.pipe(ofType(Action.signup),mergeMap((action)=>{
        return this.userservice.SignupData(action.formData).pipe(map((data)=>{
            if (data.success) {
                this._snackbar.open('Login successfully', 'close', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 6000,
                })
                localStorage.setItem('token', data.token.token)
                localStorage.setItem('tokenExp', data.token.exp)
                this.route.navigate(['/'])
                return Action.signupsuccess()
              } else {
                return Action.signupfailure({ error: data.failed })
              }
        }))
    })))

    otp=createEffect(()=>
    this.actoins$.pipe(ofType(Action.otp),mergeMap((action)=>{
    return this.userservice.otp(action.value).pipe(map(()=>{
        return Action.otpsuccess()
    }))
   })))


   addpost=createEffect(()=>
   this.actoins$.pipe(ofType(Action.addpost),mergeMap((action)=>{
    return this.userservice.addpost(action.post).pipe(map(()=>{
        return Action.addpostsuccess()
    }))
   })))

   gettag=createEffect(()=>
   this.actoins$.pipe(ofType(Action.gettag),mergeMap(()=>{
    return this.userservice.gettag().pipe(map((data)=>{
        console.log(data);
        
        return Action.gettagsuccess({tag:data})
    }))
   }))
   )
    constructor(private actoins$: Actions, private userservice: UsersService, private _snackbar: MatSnackBar, private route: Router) { }

}

