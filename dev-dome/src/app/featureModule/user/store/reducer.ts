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
    postdetails:[]
}

export const reducer=createReducer(initialState,
    on(action.login,(state)=>({...state,isLoading:true,error:null})),
    on(action.loginsuccess,(state,action)=>({...state,isLoading:false,error:null,signup:action.signup})),
    on(action.loginfailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    
    on(action.signup,(state)=>({...state,isLoading:true,error:null})),
    on(action.signupsuccess,(state,action)=>({...state,isLoading:true,error:null,signup:action.data})),
    on(action.signupfailure,(state)=>({...state,isLoading:true,error:null})),
    
    on(action.otpfailed,(state,action)=>({...state,isLoading:false,error:action.error})),
    on(action.otpsuccess,(state,action)=>({...state,isLoading:true,error:null,signup:action.signup})),

    on(action.addpost,(state)=>({...state,isLoading:true,error:null})),
    on(action.addpostsuccess,(state)=>({...state,isLoading:true,error:null})),
    
    on(action.gettag,(state)=>({...state,isLoading:true,error:null})),
    on(action.gettagsuccess,(state,action)=>({...state,isLoading:true,error:null,tag:action.tag})),

    on(action.gettagdetails,(state)=>({...state,isLoading:true,error:null})),
    on(action.gettagdetailssuccess,(state,action)=>({...state,isLoading:true,error:null,tagdetails:action.tagdetails})),

    on(action.getuser,(state)=>({...state,isLoading:true,error:null})),
    on(action.getusersuccess,(state,action)=>({...state,isLoading:true,error:null,signup:action.signup})),

    on(action.getpostdetails,(state)=>({...state,isLoading:true,error:null})),
    on(action.getpostdetailssuccess,(state,action)=>({...state,isLoading:true,error:null,data:action.postdetails})),
    )