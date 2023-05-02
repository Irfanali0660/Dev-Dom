import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as action from '../../store/action'
import { getlist, getlistcategory } from '../../store/selector';
import { addlistinterface } from '../../interface/addlist';
import moment from 'moment';
import { listinterface } from '../../interface/list';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  list?: addlistinterface[]
  listcategory?:listinterface[]
  menutoggle=false
  constructor(private store:Store<appstateinterface>,){
    this.getlist()
    this.store.pipe(select(getlist)).subscribe((list)=>{
      this.list=list
      console.log(this.list,'list');
    })
    this.listcate()
    this.store.pipe(select(getlistcategory)).subscribe((listcategory)=>{
      this.listcategory=listcategory
      console.log(this.listcategory);
  })
  }

  getlist(){
    this.store.dispatch(action.getlist())
  }
  getDateRelative(date:string | null | undefined ): string {
    return moment(date).fromNow();
  }
  getexpdate(date:string | null | undefined ): string {
    return moment(date).format('MMM DD YYYY');
  }
  listcate(){
    this.store.dispatch(action.getlistcategory())
  }
  listsort(id:string | undefined){
    if(id=="alllist"){
      console.log(id);
      this.store.pipe(select(getlist)).subscribe((list)=>{
        this.list=list
      })
    }else{
      this.store.pipe(select(getlist)).subscribe((list)=>{
        this.list=list?.filter((li)=>{return li.category==id})  
        console.log(this.list);
       })
    }
  }
  clickdrop(){
    console.log("HELLO");
    
    this.menutoggle=!this.menutoggle
    console.log(this.menutoggle);
    
  }
}
