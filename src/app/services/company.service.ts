import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company, CompanyAdding} from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url = '/api/companies';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(company: CompanyAdding) {
    return this.httpClient.post<Company>(this.url, company);
  }

  getById(companyId: number) {
    return this.httpClient.get<Company>(`${this.url}/${companyId}`);
  }

  update(companyId: number, company: CompanyAdding) {
    return this.httpClient.patch<Company>(`${this.url}/${companyId}`, company);
  }

  getAll() {
    return this.httpClient.get<Company[]>(this.url);
  }

  deleteById(companyId: number) {
    return this.httpClient.delete<Company>(`${this.url}/${companyId}`);
  }
}
