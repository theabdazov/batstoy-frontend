import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {CategoryNode} from '../../interfaces/category';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  nodes: NzTreeNodeOptions[] = [];
  @Input() categoryNodes: CategoryNode[] = [];
  categoryId: number;
  searchText: string = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.categoryId) {
          this.categoryId = data.categoryId;
        } else {
          this.categoryId = null;
        }

        if (data.searchText) {
          this.searchText = data.searchText;
        }
      }
    );
    this.getData();
  }

  getData() {
    this.categoryService.getAllTree().subscribe(
      response => {
        const recursion = (list: CategoryNode[]): NzTreeNodeOptions[] => {
          if (!list || !list.length) {
            return [];
          }
          return list.map(node => {
            return {
              title: node.name,
              key: node.id.toString(),
              children: recursion(node.children),
              isLeaf: !(node.children && node.children.length),
              expanded: !!(node.children && node.children.length)
            };
          });
        };
        this.nodes = recursion(response);
        this.categoryNodes = response;
      }
    );
  }

  filterChange(): void {
    console.log(13)
    this.router.navigate(['/'], {
      queryParams: {
        categoryId: this.categoryId,
        searchText: this.searchText || null
      }
    });
  }


}
