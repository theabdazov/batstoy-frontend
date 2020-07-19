import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileData} from '../interfaces/file-data';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = '/api/files';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  get(fileName: string) {
    return this.httpClient.get(`${this.url}/downloadFile/${fileName}`);
  }

  getAll() {
    return this.httpClient.get<FileData[]>(this.url);
  }

  upload(file: File) {
    return this.uploadMultipleFiles([file]).pipe(
      map(files => files[0])
    );
  }

  uploadMultipleFiles(files: File[]) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return this.httpClient.post<FileData[]>(`${this.url}/upload`, formData, {headers: {File: 'true'}});
  }

}
