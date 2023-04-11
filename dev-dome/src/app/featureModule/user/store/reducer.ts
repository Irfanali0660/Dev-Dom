import { createReducer,on } from "@ngrx/store"
import { authstate } from "../interface/authstate"
import * as Authaction from './action'

export const initialState:authstate={
    isLogged: false,
    isLoading: false,
    error: null,
}

export const reducer=createReducer(initialState,
    on(Authaction.login,(state)=>({...state,isLoading:true,error:null})),
    on(Authaction.loginsuccess,(state,action)=>({...state,isLoading:false,error:null})),
    on(Authaction.loginfailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    
    on(Authaction.signup,(state)=>({...state,isLoading:true,error:null})),
    on(Authaction.signupfailure,(state)=>({...state,isLoading:true,error:null}))
    )