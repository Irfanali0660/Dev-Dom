import { createAction,props } from "@ngrx/store";
import { logininterface } from "../interface/login";
import { signupinterface } from "../interface/signup";
import { SafeHtml } from '@angular/platform-browser';
import { addpostinterface } from "../interface/addpost";
import { googlesign } from "../interface/googlesign";
import { taginterface } from "../../admin/interfaces/taginterface";
import { resetpassinterface } from "../interface/resetpass";


export const login=createAction('[log] do login',props<{formData:logininterface,isuser:Boolean}>())
export const loginsuccess=createAction('[log] do login success',props<({signup:signupinterface})>())
export const loginfailure=createAction('[log] do login failure',props<{error:string}>())

export const sociallogin=createAction('sociallogin',props<({formData:googlesign})>())
export const socialloginsuccess=createAction('socialoginsuccess')

export const signup=createAction('[log] do signup',props<{formData:signupinterface}>())
export const signupsuccess=createAction('[log] do signup success',props<({data:signupinterface})>())
export const signupfailure=createAction('[log] do signup failure',props<{error:string}>())


export const socialsignup=createAction('socialsignup',props<({token:string})>())
export const socialsignupsuccess=createAction('socialsignup')

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

export const getsingletag=createAction('getsingletag',props<({id:string})>())
export const getsingletagsuccess=createAction('getsingletag',props<({tag:taginterface})>())

export const getsinglepost=createAction('getsinglepost',props<({postid:string})>())
export const getsinglepostsuccess=createAction('getsinglepostsuccess',props<({singlepost:any})>())

export const forgotpass=createAction('forgotpass',props<({email:string|null|undefined})>())
export const forgotpasssuccess=createAction('forgotpasssuccess')

export const resetpass=createAction('resetpass',props<({formData:resetpassinterface})>())
export const resetpasssuccess=createAction('resetpasssuccess')

export const comments=createAction('comments',props<({id:string})>())
export const commentssuccess=createAction('commentsuccess',props<({data:Array<string>})>())

export const addlike=createAction('addlike',props<({id:string})>())
export const addlikesuccess=createAction('addlikesuccess')