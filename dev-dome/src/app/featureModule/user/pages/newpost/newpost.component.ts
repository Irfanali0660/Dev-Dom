import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation,ElementRef } from '@angular/core';
import { EditorComponent } from 'smart-webcomponents-angular/editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import * as post from '../../store/action' 
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { tagselector } from '../../store/selector';


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewpostComponent implements AfterViewInit, OnInit {
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  coverimage!:File;
  editorContent!: SafeHtml;
  postData!:string
  content!:string
  encodedString!:any
  @ViewChild('editor', { read:   EditorComponent }) editor!: EditorComponent;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  toolbarItems: any[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignment', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'hyperlink', 'table', 'Image', '|', 'ClearFormat',
    'SourceCode', 'splitmode', '|', 'Undo', 'Redo', 'subscript', 'superscript', 'delete'];

  ngOnInit(): void {
    // this.gettag()
    this.store.pipe(select(tagselector)).subscribe((tag)=>{
      this.alltags=tag;
     })
  }
  
  ngAfterViewInit(): void {
  
  }
  constructor(private sanitizer: DomSanitizer,private store:Store<appstateinterface>){
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.alltags.slice())),
    );
   
  }
  init(): void {
   
  }
  
  onEditorInput() {

    const elements = document.getElementsByClassName("smart-editor-editable");

// Loop through each element and log its HTML code to the console
for (let i = 0; i < elements.length; i++) {
  const element = elements[i] as HTMLElement;
  this.editorContent=this.sanitizer.bypassSecurityTrustHtml(element.innerHTML);
  this.content=element.innerHTML
  console.log(this.editorContent);
  
}
  }
  addpost(){
  
    this.store.dispatch(post.addpost({post:{editor:this.content,image:this.addimage,tag:this.tags}}))
  }
  gettag(){
    this.store.dispatch(post.gettag())
  }




  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTag: Observable<string[]>;
  tags: string[] = [];
  alltags: string[] = []




  add(event: MatChipInputEvent): void {
    console.log("HELLOO");
    
    console.log(this.tags.length);
    
    if (this.tags.length < 3) {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.tags.push(value);
      }
  
      // Clear the input value
      event.chipInput!.clear();
  
      this.tagCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    console.log("REMOVE");
    
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const occurrences = this.tags.filter((el) => el === event.option.viewValue).length;
    console.log(occurrences);
   if(occurrences==0){
    if(this.tags.length < 4){
      this.tags.push(event.option.viewValue);
    }
  }
    if (this.fruitInput?.nativeElement) {
      // Do something with fruitInput.nativeElement
      this.fruitInput.nativeElement.value = '';
    }
    this.tagCtrl.setValue(null);
    }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  addimage(event:any){
   this.addimage=event.target.files[0];
    
      // get the input file element
      console.log(this.addimage);
      
 
// select the image file input element
const input = document.getElementById('cover-image-input') as HTMLInputElement | null;

// check if the input element was found
if (input) {
  // check if a file was selected
  if (input.files && input.files[0]) {
    // create a new FileReader object
    const reader = new FileReader();

    // set up an event listener to run when the FileReader finishes loading the file
    reader.onload = () => {
      // convert the loaded file to a Base64 encoded string
      this.encodedString = reader.result ;

      // use the Base64 encoded string as needed (e.g. send it to a server, display it in an <img> tag)
    };

    // read the image file as a data URL
    reader.readAsDataURL(input.files[0]);


  } else {
    console.error('No file selected.');
  }
} else {
  console.error('Image file input element not found.');
}

    
  }

}
