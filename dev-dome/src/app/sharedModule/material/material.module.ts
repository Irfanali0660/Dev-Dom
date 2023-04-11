import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const material=[
  MatSnackBarModule
]

@NgModule({
  declarations: [],
  imports:[CommonModule,material],
  exports:[material]
})
export class MaterialModule { }
