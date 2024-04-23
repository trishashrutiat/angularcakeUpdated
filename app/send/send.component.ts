// send.component.ts
import { Component } from '@angular/core';
import { DataService } from '../dataservice.service';

@Component({
  selector: 'app-send',
  templateUrl:  './send.component.html'
})
export class SendComponent {
  collectedData: any;

  constructor(private dataService: DataService) {}

  sendData() {
    this.dataService.setData(this.collectedData);
  }
}
