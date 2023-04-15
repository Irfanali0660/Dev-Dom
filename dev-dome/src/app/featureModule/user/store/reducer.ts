import { createReducer,on } from "@ngrx/store"
import { authstate } from "../interface/authstate"
import * as action from './action'

export const initialState:authstate={
    isLogged: false,
    isLoading: false,
    error: null,
    tag:[]
}

export const reducer=createReducer(initialState,
    on(action.login,(state)=>({...state,isLoading:true,error:null})),
    on(action.loginsuccess,(state,action)=>({...state,isLoading:false,error:null})),
    on(action.loginfailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    
    on(action.signup,(state)=>({...state,isLoading:true,error:null})),
    on(action.signupfailure,(state)=>({...state,isLoading:true,error:null})),

    on(action.addpost,(state)=>({...state,isLoading:true,error:null})),
    on(action.addpostsuccess,(state)=>({...state,isLoading:true,error:null})),
    
    on(action.gettag,(state)=>({...state,isLoading:true,error:null})),
    on(action.gettagsuccess,(state,action)=>({...state,isLoading:true,error:null,tag:action.tag})),

    )