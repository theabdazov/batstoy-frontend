import {Pagination} from './pagination';
import {Category} from './category';
import {Company} from './company';
import {SaleType} from './sale-type';
import {ProductCharacteristic, ProductCharacteristicAdding} from './product-characteristic';

export interface Product {
  id: number;
  name: string;
  desc: string;
  active: boolean;
  ownerPrice: number;
  price: number;
  photos: string[];
  category: Category;
  company: Company;
  saleType: SaleType;
  characteristics: ProductCharacteristic[];
}

export interface ProductAdding {
  name: string;
  desc: string;
  ownerPrice: number;
  price: number;
  active: boolean;
  photos: string[];
  categoryId: number;
  companyId: number;
  saleTypeId: number;
  characteristics: ProductCharacteristicAdding[];
}

export interface ProductFilter extends Pagination {
  id: number;
  name: string;
  categoryIds: number[];
  companyIds: number[];
}


export interface ProductShortPublic {
  id: number;
  name: string;
  price: number;
  photos: string[];
  saleType: SaleType;
}

export interface ProductFilterPublic extends Pagination {
  name: string;
  categoryId: number;
}

export interface ProductDetailPublic extends ProductShortPublic {
  characteristics: ProductCharacteristic[];
  desc: string;
}
