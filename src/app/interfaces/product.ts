import {Pagination} from './pagination';
import {Category} from './category';
import {CharacteristicValue, CharacteristicValueAdding} from './characteristic-value';
import {Company} from './company';
import {SaleType} from './sale-type';

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
  characteristicValues: CharacteristicValue[];
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
  characteristicValues: CharacteristicValueAdding[];
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
  characteristicValues: CharacteristicValueAdding[];
  desc: string;
}
