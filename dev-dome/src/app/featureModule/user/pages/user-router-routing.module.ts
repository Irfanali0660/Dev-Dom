import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { OtpComponent } from './otp/otp.component';
import { NewpostComponent } from './newpost/newpost.component';
import { Dataresolver } from './../resolver/resolver'
import { UserauthguardGuard } from 'src/app/coreModule/auth-service/userauthguard.guard';
import { SingletagComponent } from './singletag/singletag.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpassComponent } from './resetpass/resetpass.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'otp',component:OtpComponent},
  
  {path:'',component:SlidebarComponent,children:[
    {path:'',component:HomeComponent},
    {path:'singletag/:id',component:SingletagComponent},
  ]},

  {path:'singlepost/:id',component:SinglepostComponent},
  {path:"newpost",component:NewpostComponent,
resolve:{
  data:Dataresolver
},canActivate: [UserauthguardGuard]},
{path:'forgotpass',component:ForgotpasswordComponent},
{path:'resetpass/:id',component:ResetpassComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterRoutingModule { }
