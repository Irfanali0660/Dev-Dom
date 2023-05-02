import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as action from '../../store/action' 
import { getreadlist } from '../../store/selector';
import moment from 'moment';

@Component({
  selector: 'app-readinglist',
  templateUrl: './readinglist.component.html',
  styleUrls: ['./readinglist.component.css']
})
export class ReadinglistComponent {
  readlist: any;
  constructor(private store:Store<appstateinterface>){
    this.getreadlist()
    this.store.pipe(select(getreadlist)).subscribe((readlist)=>{
      this.readlist=readlist
      console.log(this.readlist);
  })
  }

  getreadlist(){
    this.store.dispatch(action.getreadlist())
  }
  getdate(date:string){
    console.log(date);
    
    return moment(date).format('MMM DD YYYY');
  }
  remove(id:string){
    console.log(id);
    // this.store.dispatch()
  }
}
