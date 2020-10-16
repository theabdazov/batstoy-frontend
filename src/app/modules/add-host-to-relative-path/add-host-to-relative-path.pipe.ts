import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'addHostToRelativePath'
})
export class AddHostToRelativePathPipe implements PipeTransform {

  transform(value: string): string {
    return `${environment.backendUrl}${value}`;
  }

}
