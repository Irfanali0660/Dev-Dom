import { addpostinterface } from "./addpost";
import { signupinterface } from "./signup";

export interface authstate{
    isLogged:Boolean;
    isLoading:Boolean,
    error:String|null; 
    tag:[] 
    tagdetails:string[]
    signup:signupinterface
    postdetails:any;
    singletag:{}
    singlepostdetails:[]
}