import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export function markAllControlsAsTouched(abstractControl: AbstractControl) {
  if (abstractControl instanceof FormGroup) {
    Object.keys(abstractControl.controls).forEach((key) => {
      markAllControlsAsTouched(abstractControl.controls[key] as FormGroup);
    });
    abstractControl.updateValueAndValidity();
  } else if (abstractControl instanceof FormArray) {
    abstractControl.controls.forEach(control => markAllControlsAsTouched(control));
  } else {
    if (!abstractControl.touched || !abstractControl.dirty) {
      abstractControl.markAsTouched({onlySelf: true});
      abstractControl.markAsDirty({onlySelf: true});
      abstractControl.updateValueAndValidity();
    }
  }

}
