import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  imageUrl = 'assets/ibaco.mp4';
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToOtherPage(): void {
    this.router.navigate(['/transaction']); // Navigate to the 'other' route
  }
  navigateToOtherPage1(): void {
    this.router.navigate(['/view']); // Navigate to the 'other' route
  }
  navigateToOtherPage2(): void {
    this.router.navigate(['/update']); // Navigate to the 'other' route
  } 
  navigateToOtherPage3(): void {
    this.router.navigate(['/deletecake']); // Navigate to the 'other' route
  }
  navigateToOtherPage4(): void {
    this.router.navigate(['/deletecake']); // Navigate to the 'other' route
  }
}
