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
import { ListingComponent } from './listing/listing.component';
import { NewListComponent } from './new-list/new-list.component';
import { ListResolver } from '../resolver/list.resolver';
import { TagsComponent } from './tags/tags.component';
import { ReadinglistComponent } from './readinglist/readinglist.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'otp',component:OtpComponent},
  
  {path:'',component:SlidebarComponent,children:[
    {path:'',component:HomeComponent},
    {path:'singletag/:id',component:SingletagComponent},
    {path:'tags',component:TagsComponent},
    {path:'readinglist',component:ReadinglistComponent},
  ]},

  {path:'singlepost/:id',component:SinglepostComponent},
  {path:"newpost",component:NewpostComponent,
resolve:{
  data:Dataresolver
},canActivate: [UserauthguardGuard]},
{path:'forgotpass',component:ForgotpasswordComponent},
{path:'resetpass/:id',component:ResetpassComponent},  
{path:'listing',component:ListingComponent},
{path:'new-list',component:NewListComponent,resolve:{
  data:ListResolver
},canActivate: [UserauthguardGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterRoutingModule { }
