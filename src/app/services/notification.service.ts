import {Injectable} from '@angular/core';
import {NzConfigService, NzNotificationService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private nzNotificationService: NzNotificationService,
    private nzConfigService: NzConfigService
  ) {
    this.nzConfigService.set('notification', {nzTop: '53px', nzMaxStack: 3});
  }

  error(title: string, text = '') {
    this.nzNotificationService.error(title, text);
  }

  success(title = 'Операция успешно выполнено', text = '') {
    this.nzNotificationService.success(title, text);
  }

  warning(title: string, text = '') {
    this.nzNotificationService.warning(title, text);
  }

}
