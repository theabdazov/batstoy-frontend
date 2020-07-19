import {Category} from './category';

export interface Characteristic {
  id: number;
  name: string;
  valueList: string[];
  category: Category;
  orderNumber: number;
}

export interface CharacteristicAdding {
  name: string;
  valueList: string[];
  categoryId: number;
  orderNumber: number;
}
