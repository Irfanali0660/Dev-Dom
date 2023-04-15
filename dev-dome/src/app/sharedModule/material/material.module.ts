import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';


const material=[
  MatSnackBarModule,
  MatChipsModule,
  MatSelectModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports:[CommonModule,material],
  exports:[material]
})
export class MaterialModule { }
