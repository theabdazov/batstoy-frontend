import {Component, OnInit} from '@angular/core';
import {ProductShortPublic} from '../../../interfaces/product';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-product-quick-preview',
  templateUrl: './product-quick-preview.component.html',
  styleUrls: ['./product-quick-preview.component.scss']
})
export class ProductQuickPreviewComponent implements OnInit {

  product: ProductShortPublic;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.galleryOptions = [
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

    this.galleryImages = this.product.photos.map(photo => {
      return {
        small: photo,
        medium: photo,
        big: photo,
      };
    });
  }

}
