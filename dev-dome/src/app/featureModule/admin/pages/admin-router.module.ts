import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRouterRoutingModule } from './admin-router-routing.module';
import { TagsComponent } from './tags/tags.component';
import { AddtagsComponent } from './addtags/addtags.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EdittagsComponent } from './edittags/edittags.component';

@NgModule({
  declarations: [
    TagsComponent,
    AddtagsComponent,
    EdittagsComponent
  ],
  imports: [
    CommonModule,
    AdminRouterRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
  ]
})
export class AdminRouterModule { }
