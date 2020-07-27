import {Component, Input, OnInit} from '@angular/core';
import {CategoryNode} from '../../../interfaces/category';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {

  @Input() categoryNodes: CategoryNode[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
