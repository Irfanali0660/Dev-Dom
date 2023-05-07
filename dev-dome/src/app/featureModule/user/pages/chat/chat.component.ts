import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as action from '../../store/action'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {


  constructor(private store:Store<appstateinterface>){

this.users()
  }

  users(){
    this.store.dispatch(action.getusers())
  }
}
