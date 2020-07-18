import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserWithToken} from '../../interfaces/user';
import {ClearSubscriptions} from '../../util/clear-subscriptions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends ClearSubscriptions implements OnInit {

  isCollapsed = false;

  currentUser: UserWithToken;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.authService.currentUser.subscribe(
        user => {
          this.currentUser = user;
        }
      )
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
