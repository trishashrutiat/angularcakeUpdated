// cart-confirmed.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartConfirmedGuard implements CanActivate {

  constructor(private router: Router, private cartService: CartService) {}

  canActivate(): boolean {
    // Check if the cart items are confirmed
    if (this.cartService.isOrderConfirmed()) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/catalogue']); // Redirect to catalogue page if cart items are not confirmed
      return false; // Cancel navigation
    }
  }
}
