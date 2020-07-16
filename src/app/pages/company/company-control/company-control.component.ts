import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../interfaces/company';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-company-control',
  templateUrl: './company-control.component.html',
  styleUrls: ['./company-control.component.scss']
})
export class CompanyControlComponent implements OnInit {

  companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.companyService.getAll().subscribe(
      response => {
        this.companies = response;
      }
    );
  }

  delete(id: number) {
    this.companyService.deleteById(id).subscribe(
      () => {
        this.getData();
        this.notificationService.success();
      }
    );
  }

}
