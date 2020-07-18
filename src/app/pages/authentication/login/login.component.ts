import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../interfaces/company';
import {UserService} from '../../../services/user.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.formGroup = this.fb.group({
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    markAllControlsAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        () => {
          this.notificationService.success('Вы успешно авторизованы');
          this.router.navigate(['/admin']);
        }
      );
    } else {
      console.log(this.formGroup);
    }
  }

}
