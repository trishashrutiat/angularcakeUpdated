import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html'
})
export class ReceiveComponent implements OnInit {
  receivedData: any;


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      console.log("Data retrieved:", data);
      this.receivedData = data;
    });
  }
}
