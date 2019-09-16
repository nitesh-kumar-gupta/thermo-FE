import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  fileForm: FormGroup;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.fileForm = new FormGroup({
      equip_file: new FormControl('')
    });
  }
  selectFile(files: FileList) {
    const file: File = files.item(0);
    this.upload(file);
  }
  upload(file) {
    this.uploadService.upload(file).subscribe((success) => {
      console.log('>>>>>>>>>>>> ', success);
    }, (error) => {
      console.error('>>>>>>>>>>>> ', error);
    });
  }
}
