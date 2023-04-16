import { createAction,props } from "@ngrx/store";
import { logininterface } from "../interface/login";
import { signupinterface } from "../interface/signup";
import { SafeHtml } from '@angular/platform-browser';
import { addpostinterface } from "../interface/addpost";


export const login=createAction('[log] do login',props<{formData:logininterface,isuser:Boolean}>())
export const loginsuccess=createAction('[log] do login success',props<({signup:signupinterface})>())
export const loginfailure=createAction('[log] do login failure',props<{error:string}>())

export const signup=createAction('[log] do signup',props<{formData:signupinterface}>())
export const signupsuccess=createAction('[log] do signup success',props<({data:signupinterface})>())
export const signupfailure=createAction('[log] do signup failure',props<{error:string}>())

export const otp=createAction('[log] otp',props<({value:Number})>())
export const otpsuccess=createAction('[log] otp success',props<({signup:signupinterface})>())
export const otpfailed=createAction('otpfailed',props<({error:string})>())

export const getuser=createAction('getuser')
export const getusersuccess=createAction('getusersuccess',props<({signup:signupinterface})>())

export const generateotp=createAction('generateotp')
export const generateotpsuccess=createAction('generateotpsuccess')

export const addpost=createAction('Add post',props<{post:any}>())
export const addpostsuccess=createAction('post success')

export const gettag=createAction('get tags')
export const gettagsuccess=createAction('get tagsuccess',props<({tag:any})>())

export const gettagdetails=createAction('gettagdetails')
export const gettagdetailssuccess=createAction('gettagdetailssuccess',props<({tagdetails:Array<any>})>())

export const getpostdetails=createAction('getpostdetails')
export const getpostdetailssuccess=createAction('getpostdetails',props<({postdetails:addpostinterface})>())
export const getpostfailed=createAction('getpostfailed')