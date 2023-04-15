import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouterRoutingModule } from './user-router-routing.module';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { OtpComponent } from './otp/otp.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './newpost/newpost.component';
import { EditorModule } from 'smart-webcomponents-angular/editor';
import {MaterialModule} from '../../../sharedModule/material/material.module';
import { Dataresolver } from './../resolver/resolver';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    SlidebarComponent,
    OtpComponent,
    NewpostComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserRouterRoutingModule,
    EditorModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers:[Dataresolver]
})
export class UserRouterModule { }
