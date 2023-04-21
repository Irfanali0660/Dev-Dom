import { createReducer,on } from "@ngrx/store"
import { authstate } from "../interface/authstate"
import * as action from './action'

export const initialState:authstate={
    isLogged: false,
    isLoading: false,
    error: null,
    tag:[],
    tagdetails:[],
    signup:{},
    postdetails:[],
    singletag:{},
    singlepostdetails:[]
}

export const reducer=createReducer(initialState,
    on(action.login,(state)=>({...state,isLoading:true,error:null})),
    on(action.loginsuccess,(state,action)=>({...state,isLoading:false,error:null,signup:action.signup})),
    on(action.loginfailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    
    on(action.sociallogin,(state)=>({...state,isLoading:true,error:null})),
    on(action.socialloginsuccess,(state,action)=>({...state,isLoading:false,error:null})),

    on(action.signup,(state)=>({...state,isLoading:true,error:null})),
    on(action.signupsuccess,(state,action)=>({...state,isLoading:false,error:null,signup:action.data})),
    on(action.signupfailure,(state,action)=>({...state,isLoading:true,error:action.error})),
    
    on(action.socialsignup,(state)=>({...state,isLoading:true,error:null})),
    on(action.socialsignupsuccess,(state,action)=>({...state,isLoading:false,error:null})),

    on(action.otpfailed,(state,action)=>({...state,isLoading:false,error:action.error})),
    on(action.otpsuccess,(state,action)=>({...state,isLoading:false,error:null,signup:action.signup})),

    on(action.addpost,(state)=>({...state,isLoading:true,error:null})),
    on(action.addpostsuccess,(state)=>({...state,isLoading:false,error:null})),
    
    on(action.gettag,(state)=>({...state,isLoading:true,error:null})),
    on(action.gettagsuccess,(state,action)=>({...state,isLoading:false,error:null,tag:action.tag})),

    on(action.gettagdetails,(state)=>({...state,isLoading:true,error:null})),
    on(action.gettagdetailssuccess,(state,action)=>({...state,isLoading:false,error:null,tagdetails:action.tagdetails})),

    on(action.getuser,(state)=>({...state,isLoading:true,error:null})),
    on(action.getusersuccess,(state,action)=>({...state,isLoading:false,error:null,signup:action.signup})),

    on(action.getpostdetails,(state)=>({...state,isLoading:true,error:null})),
    on(action.getpostdetailssuccess,(state,action)=>({...state,isLoading:false,error:null,postdetails:action.postdetails})),

    on(action.getsingletag,(state)=>({...state,isLoading:true,error:null})),
    on(action.getsingletagsuccess,(state,action)=>({...state,isLoading:false,error:null,singletag:action.tag})),

    on(action.getsinglepost,(state)=>({...state,isLoading:true,error:null})),
    on(action.getsinglepostsuccess,(state,action)=>({...state,isLoading:false,error:null,singlepostdetails:action.singlepost})),

    on(action.forgotpass,(state)=>({...state,isLoading:true,error:null})),
    on(action.forgotpasssuccess,(state)=>({...state,isLoading:false,error:null})),
    )