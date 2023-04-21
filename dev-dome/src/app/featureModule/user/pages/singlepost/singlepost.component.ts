import { Component,ElementRef,OnDestroy,OnInit,Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as action from '../../store/action'
import { singlepostdetails } from '../../store/selector';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit,OnDestroy{
menutoggle=false
postdetailsData:any;
@ViewChild('content') content!: ElementRef;
  constructor(private store:Store<appstateinterface>,private route: ActivatedRoute,private renderer: Renderer2, private el: ElementRef){
    this.store.pipe(select(singlepostdetails)).subscribe((data)=>{
      this.postdetailsData=data
      console.log(data); 
     })
    this.route.params.subscribe(params => {
      this.singlepost(params['id'])
    });
  }
  
  ngAfterViewInit(){
    
  }
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    // const myDiv = this.el.nativeElement.querySelector('#myDiv');
    // this.renderer.setStyle(myDiv, 'overflow', 'scroll');
  }
  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

  

singlepost(id:string){
this.store.dispatch(action.getsinglepost({postid:id}))
}



}
