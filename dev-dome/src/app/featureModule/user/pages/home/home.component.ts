import { Component,OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import * as action from '../../store/action'
import { signupSelector, tagdetailsselector } from '../../store/selector';
import { appstateinterface } from 'src/app/appSatate.interface';
import { signupinterface } from '../../interface/signup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  tagdetailsData!:any[]
  ngOnInit(): void {
    this.tags()
    this.post()
  }
 constructor(private store:Store<appstateinterface>,){
  this.store.pipe(select(tagdetailsselector)).subscribe((data)=>{
    this.tagdetailsData=data;
   })
 }
  tags(){
    this.store.dispatch(action.gettagdetails())
  }
  post(){
    console.log("POSTSSSS<br>");
    
    this.store.dispatch(action.getpostdetails())
  }
}
