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
  }
  upload() {
    if (this.fileForm.valid) {
      this.uploadService.upload(this.file).subscribe((success) => {
        console.log('>>>>>>>>>>>> ', success);
        this.plotChart(success);
      }, (error) => {
        console.error('>>>>>>>>>>>> ', error);
      });
    }
  }
  plotChart(data) {
    const myChart: HTMLElement = document.getElementById('myChart');
    let label = [];
    let values = [];
    for(let d of data) {
      label.push(`${d.month}/${d.year}`);
      values.push(d.value);
    }
    console.log('labellabel ', label, values);
    new Chart(myChart, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
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
