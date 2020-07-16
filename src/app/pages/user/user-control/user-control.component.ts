import {Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getAll({}).subscribe(
      response => {
        this.users = response;
      }
    );
  }

  delete(userId: number) {
    this.userService.getById(userId).subscribe(
      res => {
        this.notificationService.success();
      }
    );
  }

}
