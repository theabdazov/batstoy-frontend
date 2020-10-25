import {Component, OnInit} from '@angular/core';
import {ProductDetailPublic} from '../../../interfaces/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: ProductDetailPublic;
  productId: number;
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
      height: '600px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      // imageSwipe: false,
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 800
    {
      width: '100%',
      height: '600px',
    },
    // max-width 400
    {
      breakpoint: 400,
      height: '600px',
    }
  ];
  galleryImages: NgxGalleryImage[] = [];

  count = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.productId) {
      this.getData();
    }
  }

  getData(): void {
    this.productService.getByIdPublic(this.productId).subscribe(
      response => {
        this.product = response;
        this.galleryImages = this.product.photos.map(photo => {
          return {
            small: `${environment.backendUrl}${photo}`,
            medium: `${environment.backendUrl}${photo}`,
            big: `${environment.backendUrl}${photo}`,
          };
        });
      }
    );
  }

}
