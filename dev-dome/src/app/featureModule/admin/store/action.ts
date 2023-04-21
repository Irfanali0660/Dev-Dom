import { createAction,props } from "@ngrx/store";
import { taginterface } from "../interfaces/taginterface"

export const addtag=createAction('add tag',props<{TagData:any,image:any}>())
export const addtagsuccess=createAction('tag added successfully')
export const addtagfailure=createAction('tag added failure',props<{error:string}>())

export const gettag=createAction('get tag')
export const gettagsuccess=createAction('gettag successfull',props<{tagdetails:any}>())
export const gettagfailure=createAction('gettag failure',props<{error:string}>())

export const deletetag=createAction('delete tag',props<{id:string}>())
export const deletesuccess=createAction('delete tag is successfully')

export const gettagDetails=createAction('gettagDetails',props<{id:string}>())
export const gettagdetailssuccess=createAction('gettagdetailssuccess',props<{tagdetails:any}>())

export const edittag=createAction('edittag',props<({TagData:any,image:any})>())
export const edittagsuccess=createAction('edit added successfully')
export const editfailure=createAction('edit added failure',props<{error:string}>())
