import { Component } from '@angular/core';
import { CakeService } from '../cake.service';

@Component({
  selector: 'app-update1',
  templateUrl: './update1.component.html',
  styleUrls: ['./update1.component.css'] // Changed styleUrl to styleUrls
})
export class Update1Component {
  cake: any = {
    id: '',
    image: '',
    name: '',
    rating: { stars: 0, count: 0 },
    priceCents: 0,
    keywords: []
  };

  constructor(private cakeService: CakeService) {}

  onSubmit(): void { // Changed method name to onSubmit
    this.cakeService.addCake(this.cake).subscribe(() => {
      alert('Cake added successfully!');
      // Clear the form or reset the cake object
    }, () => {
      alert('Error adding cake!');
    });
  }
}
