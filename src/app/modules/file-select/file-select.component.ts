import {Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileData} from '../../interfaces/file-data';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileSelectComponent),
      multi: true
    },
  ]
})
export class FileSelectComponent implements OnInit, ControlValueAccessor {

  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  propagateChange: (fileId: number) => void;

  disable = false;

  file: FileData;

  fileName = '';

  constructor(
    private fileService: FileService
  ) {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    if (this.file) {
      this.propagateChange(this.file.id);
    }

  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  writeValue(file: FileData): void {
    if (file) {
      this.file = file;
      this.fileName = file.filename;
      if (this.propagateChange) {
        this.propagateChange(this.file.id);
      }
    } else {
      this.file = null;
      this.fileName = '';
      if (this.propagateChange) {
        this.propagateChange(null);
      }

    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.fileService.upload(file).subscribe(
      res => {
        this.file = res;
        this.fileName = this.file.filename;
        this.propagateChange(this.file.id);
        event.target.value = '';
      },
      () => {
        this.file = null;
        this.fileName = '';
        this.propagateChange(null);
        event.target.value = '';
      }
    );
  }

  open() {
    if (this.fileInput && !this.disable) {
      this.fileInput.nativeElement.click();
    }
  }


  clean() {
    this.file = null;
    this.fileName = '';
    this.propagateChange(null);
  }
}
