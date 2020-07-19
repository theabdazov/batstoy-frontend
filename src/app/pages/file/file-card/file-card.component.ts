import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../../interfaces/file-data';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {

  @Input() file: FileData;

  constructor(
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  copy(): void {
    const el = document.createElement('textarea');
    el.value = this.file.path;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.notificationService.success('Путь к картинке скопирован в буфер');
  }

}
