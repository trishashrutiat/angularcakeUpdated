import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ExploreComponent } from './explore/explore.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './view/view.component';

import { NodeUtilityService } from './node-utility.service';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { SendComponent } from './send/send.component';
import { ReceiveComponent } from './receive/receive.component';
import { DeleteCakeComponent } from './delete-cake/delete-cake.component';
import { BillComponent } from './bill/bill.component';
import {NgxStripeModule} from "ngx-stripe";
import { TransactionComponent } from './transaction/transaction.component';
import { QRCodeModule } from 'angularx-qrcode';
import { Update1Component } from './update1/update1.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ExploreComponent,
   
    ForgetpassComponent,
    DeleteComponent,
    ViewComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    ExampleComponent,
    AdminComponent,
    ProfileComponent,
    SendComponent,
    ReceiveComponent,

    DeleteCakeComponent,
    BillComponent,
    TransactionComponent,
    Update1Component

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QRCodeModule,
    RouterModule,
    NgxStripeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
