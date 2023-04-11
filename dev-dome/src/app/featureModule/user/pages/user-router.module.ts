import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouterRoutingModule } from './user-router-routing.module';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { OtpComponent } from './otp/otp.component';
import { FormsModule } from '@angular/forms';
import { NewpostComponent } from './newpost/newpost.component';


@NgModule({
  declarations: [
    SlidebarComponent,
    OtpComponent,
    NewpostComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserRouterRoutingModule
  ]
})
export class UserRouterModule { }
