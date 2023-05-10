import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as action from '../../store/action'
import { getuserlist } from '../../store/selector';
import { userinterface } from '../../interface/user';
import { UsersService } from 'src/app/coreModule/service/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  users!: userinterface[]
  userName:string=''

  constructor(private store:Store<appstateinterface>,private service:UsersService,private route:Router){

  this.userslist()
  this.store.pipe(select(getuserlist)).subscribe((users)=>{
    this.users=users
})
  }

  userslist(){
    this.store.dispatch(action.getusers())
  }

  chatroom(userid:String | undefined){
      this.service.chatroom(userid).subscribe((id)=>{
        this.route.navigate([`/chat/${id}/${userid}`])
      })
  }
}
