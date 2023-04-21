import { createSelector } from "@ngrx/store";
import { appstateinterface } from "../../../appSatate.interface";

export const selectFeature=(state:appstateinterface)=>state.authentication

export const isLoadingSelector=createSelector(selectFeature,(state)=>state.isLoading)
export const loginSelector=createSelector(selectFeature,(state)=>state.isLogged)
export const errorSelector=createSelector(selectFeature,(state)=>state.error)

export const signupSelector=createSelector(selectFeature,(state)=>state.signup)

export const otpselector=createSelector(selectFeature,(state)=>state.error)

export const tagselector=createSelector(selectFeature,(state)=>state.tag)

export const tagdetailsselector=createSelector(selectFeature,(state)=>state.tagdetails)

export const getpostdetailsselector=createSelector(selectFeature,(state)=>state.postdetails)

export const singletag=createSelector(selectFeature,(state)=>state.singletag)

export const singlepostdetails=createSelector(selectFeature,(state)=>state.singlepostdetails)
