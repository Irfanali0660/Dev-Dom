import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { OtpComponent } from './otp/otp.component';
import { NewpostComponent } from './newpost/newpost.component';
import { Dataresolver } from './../resolver/resolver'

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'otp',component:OtpComponent},
  
  {path:'',component:SlidebarComponent,children:[
    {path:'',component:HomeComponent}
  ]},
  {path:"newpost",component:NewpostComponent,
resolve:{
  data:Dataresolver
}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterRoutingModule { }
