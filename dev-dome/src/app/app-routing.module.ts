import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './featureModule/admin/pages/adminlogin/adminlogin.component';



const routes: Routes = [
  {path:'admin',loadChildren:()=>import('./featureModule/admin/pages/admin-router.module').then(m=>m.AdminRouterModule)},
  {path:'',loadChildren:()=>import('./featureModule/user/pages/user-router.module').then(m=>m.UserRouterModule)},
  {path:'adminlogin',component:AdminloginComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
