import { Component ,OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { appstateinterface } from 'src/app/appSatate.interface';
import { singletag } from '../../store/selector';
import { taginterface } from 'src/app/featureModule/admin/interfaces/taginterface';
import { ActivatedRoute } from '@angular/router';
import * as action from '../../store/action'


@Component({
  selector: 'app-singletag',
  templateUrl: './singletag.component.html',
  styleUrls: ['./singletag.component.css']
})
export class SingletagComponent implements OnInit{
  tagdetailsData!:any;
  
  constructor(private store:Store<appstateinterface>,private route: ActivatedRoute){
    this.store.pipe(select(singletag)).subscribe((data)=>{
      this.tagdetailsData=data
      console.log(data); 
     })
     this.route.params.subscribe(params => {
      this.singletag(params['id'])
    });
   }
  ngOnInit(): void {

  }
  singletag(id:string){
     this.store.dispatch(action.getsingletag({id:id}))
  }
}
