import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  cache = new Map();

  get(key: string): HttpResponse<any> | undefined {
    const cached = this.cache.get(key);

    if (!cached) {
      return undefined;
    }

    return cached.response;
  }

  put(key: string, response: HttpResponse<any>): void {
    const entry = {url: response.url, response, lastRead: Date.now()};
    this.cache.set(key, entry);
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}
