import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  confirmPressed: boolean = false;
  public products : any = [];
  public grandTotal !: number;
  constructor(private router: Router,private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  confirmOrder() {
    console.log(this.confirmPressed);
    this.confirmPressed = true;
    console.log(this.confirmPressed);
    this.cartService.setOrderConfirmed(true); // Call the method in the service
    this.generateBill();
  }



  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  generateBill() {
    // Check if the confirm button has been pressed at least once
    if (this.confirmPressed) {
      this.cartService.generateBill();
    } else {
      // If confirm button is not pressed, show an alert or handle it accordingly
      alert("Please confirm your order before checking out.");
    }
  }
 
  checkout() {
    if (this.confirmPressed){
    // Retrieve cart items from local storage
    const cartItems = this.cartService.loadCartItemsFromLocalStorage();
    // Navigate to the bill component and pass cart items as route parameters
    this.router.navigate(['/bill'], { state: { cartItems: cartItems } });
    }
    else{
      alert("Please confirm your order before checking out.");
    }
}

  
  }
  
