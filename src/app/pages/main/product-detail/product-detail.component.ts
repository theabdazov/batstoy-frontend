import {Component, OnInit} from '@angular/core';
import {ProductDetailPublic} from '../../../interfaces/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

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
      width: '600px',
      height: '600px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      imageSwipe: false
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
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
            small: photo,
            medium: photo,
            big: photo,
          };
        });
      }
    );
  }

}
