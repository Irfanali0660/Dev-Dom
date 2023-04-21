import { Component,OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import * as action from '../../store/action'
import { getpostdetailsselector, signupSelector, tagdetailsselector } from '../../store/selector';
import { appstateinterface } from 'src/app/appSatate.interface';
import { signupinterface } from '../../interface/signup';
import { Router } from '@angular/router';
import { addpostinterface } from '../../interface/addpost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  tagdetailsData!:any[]
  postdetails!:any[]
  ngOnInit(): void {
    this.tags()
    this.post()
  }
 constructor(private store:Store<appstateinterface>,private route:Router){
  this.store.pipe(select(tagdetailsselector)).subscribe((data)=>{
    console.log(data);
    this.tagdetailsData=data;
   })
   
   
   this.store.pipe(select(getpostdetailsselector)).subscribe((data)=>{
     this.postdetails=data;
     console.log(this.postdetails);
   })
 }
  tags(){
    this.store.dispatch(action.gettagdetails())
  }
  post(){    
    this.store.dispatch(action.getpostdetails())
  }
  getsingletag(id:string){
    this.route.navigate(['/singletag/'+id])
  } 
}
