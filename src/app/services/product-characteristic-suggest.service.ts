import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCharacteristicSuggest, ProductCharacteristicSuggestAdding} from '../interfaces/product-characteristic-suggest';

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicSuggestService {

  private url = '/api/product-characteristic-suggests';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(adding: ProductCharacteristicSuggestAdding) {
    return this.httpClient.post<ProductCharacteristicSuggest>(this.url, adding);
  }

  getById(id: number) {
    return this.httpClient.get<ProductCharacteristicSuggest>(`${this.url}/${id}`);
  }

  deleteById(id: number) {
    return this.httpClient.delete<ProductCharacteristicSuggest>(`${this.url}/${id}`);
  }

  update(id: number, adding: ProductCharacteristicSuggestAdding) {
    return this.httpClient.patch<ProductCharacteristicSuggest>(`${this.url}/${id}`, adding);
  }

  getAll() {
    return this.httpClient.get<ProductCharacteristicSuggest[]>(this.url);
  }

  suggests(text: string) {
    return this.httpClient.get<ProductCharacteristicSuggest[]>(`${this.url}/suggests/${text}`);
  }
}
