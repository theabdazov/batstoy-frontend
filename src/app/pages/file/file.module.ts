import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileControlComponent } from './file-control/file-control.component';
import { FileCardComponent } from './file-card/file-card.component';
import {NzButtonModule, NzCardModule, NzIconModule, NzInputModule, NzModalModule} from 'ng-zorro-antd';
import {IconsProviderModule} from '../../icons-provider.module';


@NgModule({
  declarations: [FileControlComponent, FileCardComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
  ]
})
export class FileModule { }
