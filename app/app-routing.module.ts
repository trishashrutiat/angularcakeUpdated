import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { DeleteComponent } from './delete/delete.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewComponent } from './view/view.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ExampleComponent } from './example/example.component';
import { AdminComponent } from './admin/admin.component';
import { SendComponent } from './send/send.component';
import { ReceiveComponent } from './receive/receive.component';
import { DeleteCakeComponent } from './delete-cake/delete-cake.component';
import { BillComponent } from './bill/bill.component';
import { CartConfirmedGuard } from './cart-confirmed.guard';

import { Update1Component } from './update1/update1.component';


const routes: Routes = [

  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"explore",component:ExploreComponent},
  {path:"delete",component:DeleteComponent},
  {path:"forgetpass",component:ForgetpassComponent},
  {path:"register",component:RegistrationComponent},
  {path:"view",component:ViewComponent},
  {path:"header",component:HeaderComponent},
  {path:"product",component:ProductComponent},
  {path:"cart",component:CartComponent},
  {path:"example",component:ExampleComponent},
  { path: "admin", component: AdminComponent},
  { path: "send", component: SendComponent},
  { path: "receive", component: ReceiveComponent},
  { path: 'user', component: HomeComponent },
  {path:'deletecake',component:DeleteCakeComponent},
  {path:'update1',component:Update1Component},
  {path:'bill',component:BillComponent,canActivate: [CartConfirmedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
