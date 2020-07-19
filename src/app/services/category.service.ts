import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, CategoryAdding, CategoryNode} from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = '/api/categories';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(categoryAdding: CategoryAdding) {
    return this.httpClient.post<Category>(this.url, categoryAdding);
  }

  getById(id: number) {
    return this.httpClient.get<Category>(`${this.url}/${id}`);
  }

  deleteById(id: number) {
    return this.httpClient.delete<Category>(`${this.url}/${id}`);
  }

  update(id: number, categoryAdding: CategoryAdding) {
    return this.httpClient.patch<Category>(`${this.url}/${id}`, categoryAdding);
  }

  getAllTree() {
    return this.httpClient.get<CategoryNode[]>(`${this.url}/tree/all`);
  }

  getTreeById(id: number) {
    return this.httpClient.get<CategoryNode[]>(`${this.url}/tree/${id}`);
  }

}
