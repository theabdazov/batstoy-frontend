import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {ValidateMessages} from './validate-messages';

@Pipe({name: 'validate'})
export class ValidatePipe implements PipeTransform {

  transform(errors: ValidationErrors): string {
    let errorText = '';
    if (errors) {
      const errorKeys = Object.keys(errors);
      if (errorKeys.length) {
        const firstErrorKey = errorKeys[0];
        errorText = ValidateMessages[firstErrorKey];
        if (firstErrorKey === 'maxlength' || firstErrorKey === 'minlength') {
          errorText = errors[firstErrorKey].requiredLength;
        }
      }
    }
    return errorText;
  }
}
