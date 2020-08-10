import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, ProductAdding, ProductDetailPublic, ProductFilter, ProductFilterPublic, ProductShortPublic} from '../interfaces/product';
import {PaginationPage} from '../interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = '/api/products';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getProductList(filter: ProductFilter) {
    return this.httpClient.post<PaginationPage<Product>>(`${this.url}/list`, {...filter, page: filter.page - 1});
  }

  create(productAdding: ProductAdding) {
    return this.httpClient.post<Product>(this.url, productAdding);
  }

  getById(id: number) {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }

  deleteById(id: number) {
    return this.httpClient.delete<Product>(`${this.url}/${id}`);
  }

  update(id: number, productAdding: ProductAdding) {
    return this.httpClient.patch<Product>(`${this.url}/${id}`, productAdding);
  }

  getProductListPublic(filter: ProductFilterPublic) {
    return this.httpClient.post<PaginationPage<ProductShortPublic>>(`${this.url}/list-public`, {...filter, page: filter.page - 1});
  }

  getByIdPublic(id: number) {
    return this.httpClient.get<ProductDetailPublic>(`${this.url}/${id}/public`);
  }

  getByIdsPublic(ids: number[]) {
    return this.httpClient.post<ProductShortPublic[]>(`${this.url}/ids`, ids);
  }

}
