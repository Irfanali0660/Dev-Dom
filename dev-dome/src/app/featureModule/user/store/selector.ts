import { createSelector } from "@ngrx/store";
import { appstateinterface } from "../../../appSatate.interface";

export const selectFeature=(state:appstateinterface)=>state.authentication

export const isLoadingSelector=createSelector(selectFeature,(state)=>state.isLoading)
export const loginSelector=createSelector(selectFeature,(state)=>state.isLogged)
export const errorSelector=createSelector(selectFeature,(state)=>state.error)

export const tagselector=createSelector(selectFeature,(state)=>state.tag)