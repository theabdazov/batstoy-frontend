import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Characteristic, CharacteristicAdding} from '../interfaces/characteristic';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {

  private url = '/api/characteristics';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(characteristicAdding: CharacteristicAdding) {
    return this.httpClient.post<Characteristic>(this.url, characteristicAdding);
  }

  getById(id: number) {
    return this.httpClient.get<Characteristic>(`${this.url}/${id}`);
  }

  deleteById(id: number) {
    return this.httpClient.delete<Characteristic>(`${this.url}/${id}`);
  }

  update(id: number, characteristicAdding: CharacteristicAdding) {
    return this.httpClient.patch<Characteristic>(`${this.url}/${id}`, characteristicAdding);
  }

  getAll() {
    return this.httpClient.get<Characteristic[]>(this.url);
  }

  getByCategoryId(categoryId: number) {
    return this.httpClient.get<Characteristic[]>(`${this.url}/category/${categoryId}`);
  }

}
