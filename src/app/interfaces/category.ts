export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  orderNumber: number;
}

export interface CategoryAdding {
  parentId?: number;
  name: string;
  imageUrl: number;
  orderNumber: number;
}


export interface CategoryNode extends Category {
  children: CategoryNode[];
}
