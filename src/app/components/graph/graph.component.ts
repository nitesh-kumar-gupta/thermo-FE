import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
declare const jQuery: any;
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  fileForm: FormGroup;
  file: File;
  filename: string;
  constructor(private uploadService: UploadService) {
    this.filename = '';
  }

  ngOnInit() {
    this.fileForm = new FormGroup({
      equip_file: new FormControl('', [Validators.required])
    });
  }
  chooseFile() {
    jQuery('#fileInput').trigger('click');
  }
  selectFile(files: FileList) {
    this.file = files.item(0);
    this.filename = this.file.name;
    console.log('>>>>>>>>>>>>>> ', this.filename);
  }
  upload() {
    if (this.fileForm.valid) {
      this.uploadService.upload(this.file).subscribe((success) => {
        console.log('>>>>>>>>>>>> ', success);
      }, (error) => {
        console.error('>>>>>>>>>>>> ', error);
      });
    }
  }
}
