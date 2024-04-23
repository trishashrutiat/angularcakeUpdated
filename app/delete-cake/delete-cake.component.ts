import { Component, OnInit } from '@angular/core';
import { CakeService } from '../cake.service';

@Component({
  selector: 'app-delete-cake',
  templateUrl: './delete-cake.component.html',
  styleUrls: ['./delete-cake.component.css']
})
export class DeleteCakeComponent implements OnInit {
  availableCakes: string[] = [];
  selectedCakeName: string = '';
  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.fetchAvailableCakes();
  }
  fetchAvailableCakes() {
    this.cakeService.getAllCakes().subscribe(
      (cakes: any[]) => {
        // Check if each cake object has a 'name' property before mapping
        if (cakes.length > 0 && typeof cakes[0].name !== 'undefined') {
          this.availableCakes = cakes.map(cake => cake.name);
        } else {
          console.error('Error: No "name" property found in the cake objects.');
        }
      },
      (error) => {
        console.error('Error fetching available cakes:', error);
      }
    );
  }
  

  deleteCake() {
    this.cakeService.deleteCakeByName(this.selectedCakeName).subscribe(
      () => {
        this.deleteSuccess = true;
        this.deleteError = false;
        // Refresh the list of available cakes after deletion
        this.fetchAvailableCakes();
      },
      (error) => {
        console.error('Error deleting cake:', error);
        this.deleteSuccess = false;
        this.deleteError = true;
      }
    );
  }
}
