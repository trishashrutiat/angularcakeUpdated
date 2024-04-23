import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  cartItems: any[] = [];
  user: string | null = "";
  totalPrice: number = 0;


  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router) {     
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    if (this.user == null) {
      this.router.navigateByUrl('/login');
    }

    // Calculate total price
    this.totalPrice = this.getTotalPrice();
    this.cartItems = this.cartService.loadCartItemsFromLocalStorage();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const currentTime = new Date();
    return currentTime.toTimeString().split(' ')[0];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }
  generatePDF(): void {
    const docDefinition:any = document.getElementById("container");
    html2canvas(docDefinition,{scale:2}).then((canvas)=>{
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const pdf= new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.setProperties({
        title:'my page',
        subject:'pdf from html',
        author:'trisha',
      });
      pdf.setFontSize(12);
      pdf.text('',14,22);
      pdf.save('myFile.pdf');

    }


    
    
    );}
  
}