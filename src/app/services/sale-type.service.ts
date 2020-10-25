import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SaleType, SaleTypeAdding} from '../interfaces/sale-type';

@Injectable({
  providedIn: 'root'
})
export class SaleTypeService {

  private url = '/api/sale-types';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(saleTypeAdding: SaleTypeAdding) {
    return this.httpClient.post<SaleType>(this.url, saleTypeAdding);
  }

  getById(saleTypeId: number) {
    return this.httpClient.get<SaleType>(`${this.url}/${saleTypeId}`);
  }

  update(saleTypeId: number, saleTypeAdding: SaleTypeAdding) {
    return this.httpClient.patch<SaleType>(`${this.url}/${saleTypeId}`, saleTypeAdding);
  }

  getAll() {
    return this.httpClient.get<SaleType[]>(this.url);
  }

  deleteById(saleTypeId: number) {
    return this.httpClient.delete<SaleType>(`${this.url}/${saleTypeId}`);
  }
}
