import { Component } from '@angular/core';
import { CakeService } from '../cake.service';

@Component({
  selector: 'app-update-cake',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  newCake: any = {
    rating: { stars: 0, count: 0 } // Initialize nested object
  };
  
  constructor(private cakeService: CakeService) {
  }

  

  onSubmit() {
  
    // Send the form data to the service
    this.cakeService.addCake(this.newCake)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error adding cake:', error);
      });
  }

  
}
