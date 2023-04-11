import { Component } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {

  ngOnInit(): void {
    this.apilogincheck()
  }
  user!:string | boolean
  constructor(){}
  logout(){
    localStorage.clear()
    this.apilogincheck()
  }

  apilogincheck(){
    if(localStorage.getItem('token')){
      this.user=true
    }else{
      this.user=false
    }
  }

}
