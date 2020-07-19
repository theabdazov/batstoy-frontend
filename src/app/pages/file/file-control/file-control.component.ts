import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileData} from '../../../interfaces/file-data';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss']
})
export class FileControlComponent implements OnInit {

  files: FileData[] = [];
  isVisible = false;
  file;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor(
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.fileService.getAll().subscribe(
      response => {
        this.files = response;
      }
    );
  }

  showModal(): void {
    this.file = null;
    this.isVisible = true;
  }

  handleOk(): void {
    this.fileService.upload(this.file).subscribe(
      res => {
        this.files.unshift(res);
        this.fileInput.nativeElement.value = null;
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  onFileChange(event) {
    this.file = event.target.files[0];
  }
}
