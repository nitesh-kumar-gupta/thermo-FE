import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
declare const jQuery: any;
declare const Chart: any;
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  fileForm: FormGroup;
  file: File;
  filename: string;
  loading: boolean;
  error: object;
  constructor(private uploadService: UploadService) {
    this.filename = '';
    this.loading = false;
    this.error = {
      status: false,
      message: ''
    };
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
  }
  upload() {
    if (this.fileForm.valid) {
      this.error = {
        status: false,
        message: ''
      };
      const upload: HTMLElement = document.getElementById('upload');
      upload.setAttribute('disabled', 'disabled');
      this.loading = true;
      this.uploadService.upload(this.file).subscribe((success) => {
        upload.removeAttribute('disabled');
        this.loading = false;
        console.log('>>>>>>>>>>> ', success);
        this.plotChart(success);
      }, (error) => {
        upload.removeAttribute('disabled');
        this.loading = false;
        this.error = {
          status: true,
          message: error.message
        };
        console.error('>>>>>>>>>>>> ', error);
      });
    }
  }
  plotChart(data) {
    const myChart: HTMLElement = document.getElementById('myChart');
    let label = [];
    let values = [];
    for (let d of data) {
      label.push(`${d.month}/${d.year}`);
      values.push(d.value);
    }
    let c = new Chart(myChart, {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
          label: 'Temperature',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          data: values,
          fontStyle: 'bold',
          fontColor: '#000000'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              fontStyle: 'bold',
              fontColor: '#000000'
            },
            scaleLabel: {
              display: true,
              labelString: 'Temperature',
              fontStyle: 'bold',
              fontColor: '#000000'
            },
          }],
          xAxes: [{
            ticks: {
              fontStyle: 'bold',
              fontColor: '#000000'
            },
            scaleLabel: {
              display: true,
              labelString: 'Month/Year',
              fontStyle: 'bold',
              fontColor: '#000000'
            }
          }]
        }
      }
    });
  }
}
