import { createAction,props } from "@ngrx/store";
import { logininterface } from "../interface/login";
import { signupinterface } from "../interface/signup";
import { SafeHtml } from '@angular/platform-browser';
import { addpostinterface } from "../interface/addpost";


export const login=createAction('[log] do login',props<{formData:logininterface,isuser:Boolean}>())
export const loginsuccess=createAction('[log] do login success')
export const loginfailure=createAction('[log] do login failure',props<{error:string}>())

export const signup=createAction('[log] do signup',props<{formData:signupinterface}>())
export const signupsuccess=createAction('[log] do signup success')
export const signupfailure=createAction('[log] do signup failure',props<{error:string}>())

export const otp=createAction('[log] otp',props<({value:Number})>())
export const otpsuccess=createAction('[log] otp success')

export const addpost=createAction('Add post',props<{post:any}>())
export const addpostsuccess=createAction('post success')

export const gettag=createAction('get tags')
export const gettagsuccess=createAction('get tagsuccess',props<({tag:any})>())