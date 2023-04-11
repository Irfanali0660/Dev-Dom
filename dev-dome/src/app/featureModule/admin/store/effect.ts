import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as adminAction from './action'
import { mergeMap, map } from 'rxjs'
import { AdminService } from "../../../coreModule/service/admin.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { appstateinterface } from "src/app/appSatate.interface";
import * as tag from '../store/action'


@Injectable()
export class adminEffect{

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

Tag = createEffect(()=>
this.action.pipe(ofType(adminAction.addtag),mergeMap((action:any)=>{
   
    return this.adminservice.addtag(action.TagData,action.image).pipe(map((data)=>{
        console.log(data);
        if(data.success){
            this._snackbar.open('Tag added successfully', 'close', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 4000,
                panelClass: ['my-snackbar']
            })
            this.route.navigate(['/admin/tags'])
            return adminAction.addtagsuccess()
        }else{
            return adminAction.addtagfailure({error:data.error})
        }   
        
    }))
})))

gettag=createEffect(()=>
this.action.pipe(ofType(adminAction.gettag),mergeMap(()=>{
return this.adminservice.gettags().pipe(map((data)=>{
    return adminAction.gettagsuccess({tagdetails:data})
}))
}))
)

deleteTag=createEffect(()=>
this.action.pipe(ofType(adminAction.deletetag),mergeMap((action)=>{
    return this.adminservice.deletetag(action.id).pipe(map(()=>{
        this.store.dispatch(tag.gettag())
        return adminAction.deletesuccess()
    }))
}))
)

gettagDetails=createEffect(()=>
this.action.pipe(ofType(adminAction.gettagDetails),mergeMap((action)=>{
    return this.adminservice.gettagDetails(action.id).pipe(map((details)=>{
        console.log( details.data);
        console.log("gettagDetails");   
        this.route.navigate(['/admin/tags/edittag/'+details.data._id])
        return adminAction.gettagdetailssuccess({tagdetails:details.data})
       
    }))
}))
)
constructor(private action:Actions,private adminservice:AdminService,private _snackbar: MatSnackBar,private route:Router,private store:Store<appstateinterface>){}

}