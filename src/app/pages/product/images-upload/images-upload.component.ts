import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UploadFile, UploadXHRArgs} from 'ng-zorro-antd/upload';
import {FileService} from '../../../services/file.service';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagesUploadComponent),
      multi: true
    },
  ]
})
export class ImagesUploadComponent implements OnInit, ControlValueAccessor {
  photos: UploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  propagateChange: (photos: string[]) => void;

  constructor(
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(images: string[]): void {
    this.photos = [];
    if (images && images.length) {
      images.forEach((image, index) => {
        this.photos.push({
          uid: index.toString(),
          url: image,
          status: 'done',
          name: image
        });
      });
    }
  }

  uploadImage = (file: UploadXHRArgs) => {
    return this.fileService.upload(file.postFile as File).subscribe(
      response => {
        file.onSuccess(response, file.file, response);
        this.change();
      }
    );
  };

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  closeModal(): void {
    this.previewVisible = false;
  }

  change() {
    const paths = [];
    this.photos.forEach(photo => {
      if (photo.response) {
        paths.push(photo.response.path);
      } else if (photo.url){
        paths.push(photo.url);
      }
    });
    this.propagateChange(paths);

  }
}
