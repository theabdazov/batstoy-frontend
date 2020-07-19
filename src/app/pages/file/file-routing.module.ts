import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileControlComponent} from './file-control/file-control.component';


const routes: Routes = [
  {path: 'control', component: FileControlComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
