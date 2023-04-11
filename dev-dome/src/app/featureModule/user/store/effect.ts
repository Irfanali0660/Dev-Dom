import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authactions from './action'
import { mergeMap, map } from 'rxjs'
import { UsersService } from "../../../coreModule/service/users.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable()
export class authEffects {

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    Login = createEffect(() =>
        this.actoins$.pipe(ofType(authactions.login), mergeMap((action: any) => {
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
                    return authactions.loginsuccess()

                } else {
                    console.log(data.failed);
                    return authactions.loginfailure({ error: data.failed })
                }
            }
            ))
        }))
    )
    signup=createEffect(()=>
    this.actoins$.pipe(ofType(authactions.signup),mergeMap((action)=>{
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
                return authactions.signupsuccess()
              } else {
                return authactions.signupfailure({ error: data.failed })
              }
        }))
    })))

    otp=createEffect(()=>
    this.actoins$.pipe(ofType(authactions.otp),mergeMap((action)=>{
    return this.userservice.otp(action.value).pipe(map(()=>{
        return authactions.otpsuccess()
    }))
   })))
    constructor(private actoins$: Actions, private userservice: UsersService, private _snackbar: MatSnackBar, private route: Router) { }

}

