import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  fileForm: FormGroup;
  constructor(private userService: UserService) { }

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
    this.userService.upload(file).subscribe((success) => {
      console.log('>>>>>>>>>>>> ', success);
    }, (error) => {
      console.error('>>>>>>>>>>>> ', error);
    });
  }
}
