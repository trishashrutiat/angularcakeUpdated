import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url:string='http://localhost:5000/'
  public cartItemList: any[] = [];
  user:string|null='';
  customerName:string|null='';
  private orderConfirmed: boolean = false;
  public productList = new BehaviorSubject<any[]>([]);

  constructor(private httpClient:HttpClient) {
    // Load cart data from local storage when the service is instantiated
    this.loadCartData();
  }

  getProducts() {
    return this.productList.asObservable();
  }
  
  setOrderConfirmed(value: boolean): void {
    this.orderConfirmed = value;
  }

  isOrderConfirmed(): boolean {
    return this.orderConfirmed;
  }

  // Method to save cart data to local storage
  private saveCartData() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }

  // Method to load cart data from local storage
  private loadCartData() {
    const savedCartItems = localStorage.getItem('cartItems');
    console.log(savedCartItems);
    if (savedCartItems) {
      this.cartItemList = JSON.parse(savedCartItems);
      this.productList.next(this.cartItemList);
    }
    console.log(this.cartItemList);
  }

  // Method to clear cart data from local storage and reset the cart
  clearCartData() {
    localStorage.removeItem('cartItems');
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  loadCartItemsFromLocalStorage(): any[] {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  }

  generateBill() {
    this.user = localStorage.getItem('user');
    const customerName = this.user||'';
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0]; // Extracts the date portion
    const time = currentDate.toTimeString().split(' ')[0]; // Extracts the time portion
    let grandTotal = this.getTotalPrice();
  
    // Generate a new orderId or increment the existing one
    let orderIdStr = localStorage ? localStorage.getItem('orderId') : null;
    let orderId = orderIdStr ? +orderIdStr : 0;
        orderId++;
  
    // Iterate through cart items and call checkout for each item
    this.cartItemList.forEach(cake => {
      if (customerName) {
      this.checkout(customerName, cake.name, cake.priceCents, cake.quantity, cake.total, date, time, grandTotal, orderId)
        .subscribe(response => {
          console.log(response); // Log the response from the server
        });}
    });
  
    // Save the incremented orderId for the next transaction
    localStorage.setItem('orderId', orderId.toString());

  }
  checkout(customerName: string, name: string, priceCents: number, quantity: number, total: number, date: string, time: string, grandTotal: number, orderId: number): Observable<any> {
    return this.httpClient.get(this.url + "checkout? orderId=" + orderId+ "&customerName=" + customerName + "&cakeName=" + name + "&date=" + date + "&time=" + time + "&priceCents=" + priceCents + "&quantity=" + quantity + "&total=" + total + "&grandTotal=" + grandTotal );
  }
  
  setProduct(products: any[]) {
    this.cartItemList.push(...products);
    this.productList.next(this.cartItemList);
    // Save cart data to local storage after updating
    this.saveCartData();
  }

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    // Save cart data to local storage after updating
    this.saveCartData();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.forEach(item => {
      grandTotal += item.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
      // Save cart data to local storage after updating
      this.saveCartData();
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    // Save cart data to local storage after updating
    this.saveCartData();
  }
}
