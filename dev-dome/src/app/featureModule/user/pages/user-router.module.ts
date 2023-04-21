import { NgModule,NO_ERRORS_SCHEMA ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouterRoutingModule } from './user-router-routing.module';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { OtpComponent } from './otp/otp.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './newpost/newpost.component';
import { EditorModule } from 'smart-webcomponents-angular/editor';
import {MaterialModule} from '../../../sharedModule/material/material.module';
import { Dataresolver } from './../resolver/resolver';
import { SocialLoginModule} from '@abacritt/angularx-social-login';
import { SingletagComponent } from './singletag/singletag.component';
import { TagsComponent } from './tags/tags.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpassComponent } from './resetpass/resetpass.component';


@NgModule({
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SlidebarComponent,
    OtpComponent,
    NewpostComponent,
    SingletagComponent,
    TagsComponent,
    SinglepostComponent,
    ForgotpasswordComponent,
    ResetpassComponent,
   
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserRouterRoutingModule,
    EditorModule,
    MaterialModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers:[Dataresolver]
})
export class UserRouterModule { }
