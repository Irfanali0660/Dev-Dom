import { Component,ElementRef,OnDestroy,OnInit,Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as action from '../../store/action'
import { comments, singlepostdetails } from '../../store/selector';
import { SocketService } from '../../../../coreModule/service/socket.service';  
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit,OnDestroy{
menutoggle=false
postdetailsData:any;
commentData!:any
chats?:Observable<any[] | undefined>;
@ViewChild('content') content!: ElementRef;
  message_input: string='';
  id!:string
  constructor(private store:Store<appstateinterface>,private route: ActivatedRoute,private renderer: Renderer2, private el: ElementRef,private socketService: SocketService ){
    this.store.pipe(select(singlepostdetails)).subscribe((data)=>{
      this.postdetailsData=data
      console.log(data,'new signle'); 
     })
    this.route.params.subscribe(params => {
      this.id=params['id']
      this.singlepost(params['id'])
      this.socketService.connect({id:params['id']},{token: localStorage.getItem('token')??'noAcToken'})
      this.comments(params['id'])
    });

    this.store.pipe(select(comments)).subscribe((data)=>{
      this.commentData=data
      console.log(this.commentData,"comment"); 
     })
  }
  
  ngAfterViewInit(){
    
  }
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    // const myDiv = this.el.nativeElement.querySelector('#myDiv');
    // this.renderer.setStyle(myDiv, 'overflow', 'scroll');
    this.socketService.on('new-message',(data:any)=>{
      console.log(data,'backend');
      this.commentData=data
    })

  }
  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

  

singlepost(id:string){
this.store.dispatch(action.getsinglepost({postid:id}))
}

send_message(f: NgForm):any{
  console.log(this.message_input);
  
  if(this.message_input.trim().length<1)return this.message_input ='';
  if(f.invalid)return;
  
  this.socketService.emit('message',this.message_input)
  
  this.message_input =''
  }
  comments(id:string){
    this.store.dispatch(action.comments({id:id}))
  }
  getDateRelative(date:string): string {
    return moment(date).fromNow();
  }

  like(){
    // console.log(this.postdetailsData.likes,'dataaa');
    this.store.dispatch(action.addlike({id:this.id}))
    this.singlepost(this.id)
    
  }

}
