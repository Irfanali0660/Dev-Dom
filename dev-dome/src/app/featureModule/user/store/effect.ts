import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as Action from './action'
import { mergeMap, map, of, take, exhaustMap } from 'rxjs'
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
                    return Action.loginsuccess({signup:data.user})

                } else {
                    return Action.loginfailure({ error: data.failed })
                }
            }
            ))
        }))
    )

        socialogin=createEffect(()=>
        this.actoins$.pipe(ofType(Action.sociallogin),mergeMap((action)=>{
            return this.userservice.sociallogin(action.formData).pipe(map((data)=>{
                if (data.success) {
                    this._snackbar.open('Login successfully', 'close', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: 4000,
                        panelClass: ['my-snackbar']
                    })
                    console.log()
                    localStorage.setItem('token', data.token.token)
                    localStorage.setItem('tokenExp', data.token.exp)
                    this.route.navigate(['/'])
                    return Action.loginsuccess({signup:data.data})

                } else {
                    return Action.loginfailure({ error: data.failed })
                }
            }))
        }))
        )

    signup=createEffect(()=>
    this.actoins$.pipe(ofType(Action.signup),mergeMap((action)=>{
        return this.userservice.SignupData(action.formData).pipe(map((data)=>{
            if (data.success) {
                console.log(data);
                this._snackbar.open('Login successfully', 'close', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 6000,
                })
                localStorage.setItem('token', data.token.token)
                localStorage.setItem('tokenExp', data.token.exp)
                this.route.navigate(['/'])
                return Action.signupsuccess({data:data.data})
              } else {
                return Action.signupfailure({ error: data.failed })
              }
        }))
    })))

    socialsignup=createEffect(()=>
    this.actoins$.pipe(ofType(Action.socialsignup),mergeMap((action)=>{
        return this.userservice.socialsignup(action.token).pipe(map((data)=>{
            localStorage.setItem('token', data.token.token)
            localStorage.setItem('tokenExp', data.token.exp)
            this.route.navigate(['/'])
            return Action.socialsignupsuccess()
        }))
    }))
    )

    otp=createEffect(()=>
    this.actoins$.pipe(ofType(Action.otp),mergeMap((action)=>{
    return this.userservice.otp(action.value).pipe(map((data)=>{
        if(data.success){
            console.log("BACKKKK");
            
            //   this._snackbar.open('Login successfully', 'close', {
            //       horizontalPosition: this.horizontalPosition,
            //       verticalPosition: this.verticalPosition,
            //       duration: 6000,
            //     })
            //     localStorage.setItem('token', data.token.token)
            //     localStorage.setItem('tokenExp', data.token.exp)
                this.route.navigate(['/'])
                
            return Action.otpsuccess({signup:data.data})
        }else{
            return Action.otpfailed({error:data.failed})
        }
    }))
   })))


   addpost=createEffect(()=>
   this.actoins$.pipe(ofType(Action.addpost),mergeMap((action)=>{
    return this.userservice.addpost(action.post).pipe(map(()=>{
        this._snackbar.open('Post added', 'close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 6000,
          })
        this.route.navigate(['/'])
        return Action.addpostsuccess()
    }))
   })))

   gettag=createEffect(()=>
   this.actoins$.pipe(ofType(Action.gettag),mergeMap(()=>{
    return this.userservice.gettag().pipe(map((data)=>{
        return Action.gettagsuccess({tag:data})
    }))
   }))
   )
   gettagdetails=createEffect(()=>
   this.actoins$.pipe(ofType(Action.gettagdetails),mergeMap(()=>{
    return this.userservice.gettagdetails().pipe(map((data)=>{
        return Action.gettagdetailssuccess({tagdetails:data})
    }))
   }))
   )
   generateotp=createEffect(()=>
   this.actoins$.pipe(ofType(Action.generateotp),mergeMap(()=>{
    return this.userservice.generateotp().pipe(map(()=>{
        console.log('BACK');
        
        this.route.navigate(['/otp'])
        return Action.generateotpsuccess()
    }))
   }))
   )

   getuser=createEffect(()=>
   this.actoins$.pipe(ofType(Action.generateotp),mergeMap(()=>{
    return this.userservice.getuser().pipe(map((data)=>{
        return Action.getusersuccess({signup:data})
    }))
   }))
   )

 

   getpost=createEffect(()=>
   this.actoins$.pipe(ofType(Action.getpostdetails),exhaustMap(()=>{
    return this.userservice.getpost().pipe(map((data)=>{
        console.log(data);
        return Action.getpostdetailssuccess({postdetails:data})
    }))
   }))
   )
   getsingletag = createEffect(() =>
   this.actoins$.pipe(
     ofType(Action.getsingletag),
     exhaustMap((action) => {
       return this.userservice.getsingletag(action.id).pipe(
         map((data) => {
               
           console.log(data);
           return Action.getsingletagsuccess({ tag: data });
         })
       );
     })
   )
 );
 getsinglepost=createEffect(()=>
 this.actoins$.pipe(ofType(Action.getsinglepost),
    exhaustMap((action)=>{
    return this.userservice.getsinglepost(action.postid).pipe(
        map((data)=>{
            return Action.getsinglepostsuccess({singlepost:data})
        })
    )
 })
 )
 )
 
forgotpass=createEffect(()=>
this.actoins$.pipe(ofType(Action.forgotpass),
    mergeMap((action)=>{
        return this.userservice.forgotpass(action.email).pipe(
            map((data)=>{
                this._snackbar.open(data.success, 'close', {
                    horizontalPosition:'center' ,
                    verticalPosition:'top' ,
                    panelClass: ['my-snackbar']
                })
                return Action.forgotpasssuccess()
            })
        )
    })
  )
)
    constructor(private actoins$: Actions, private userservice: UsersService, private _snackbar: MatSnackBar, private route: Router) { }

}

