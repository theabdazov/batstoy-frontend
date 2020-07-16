import {FormGroup} from '@angular/forms';

export function markAllControlsAsTouched(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((key) => {
    if (formGroup.controls[key] instanceof FormGroup) {
      markAllControlsAsTouched(formGroup.controls[key] as FormGroup);
    } else {
      if (!formGroup.controls[key].touched || !formGroup.controls[key].dirty) {
        formGroup.controls[key].markAsTouched({onlySelf: true});
        formGroup.controls[key].markAsDirty({onlySelf: true});
        formGroup.controls[key].updateValueAndValidity();
      }
    }

  });
  formGroup.updateValueAndValidity();
}
