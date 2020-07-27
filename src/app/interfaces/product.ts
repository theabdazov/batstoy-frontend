import {Pagination} from './pagination';
import {FileData} from './file-data';
import {Category} from './category';

export interface Product {
  id: number;
  name: string;
  desc: string;
  active: boolean;
  ownerPrice: number;
  price: number;
  photos: string[];
  category: Category;
}

export interface ProductAdding {
  name: string;
  desc: string;
  ownerPrice: number;
  price: number;
  active: boolean;
  photos: string[];
  categoryId: number;
}

export interface ProductFilter extends Pagination {
  id: number;
  name: string;
  categoryIds: number[];
}


export interface ProductShortPublic {
  id: number;
  name: string;
  price: number;
  photos: string[];
}

export interface ProductFilterPublic extends Pagination {
  name: string;
  categoryId: number;
}
