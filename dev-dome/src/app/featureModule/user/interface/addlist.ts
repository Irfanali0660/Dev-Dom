import { signupinterface } from "./signup"

export interface addlistinterface {
    _id?:string | null
    title?:String | null 
    details?:String| null
    category?:String| null
    expdate?:string | null
    date?:string| null
    location?:string | null
    tag?:string[]
    userId?:{
        _id?:String
         userName?:String | null ,
         email?:String | null,
         phonenumber?:Number | null |String,
         image?:string | null
         date?:Date | null
    }
}