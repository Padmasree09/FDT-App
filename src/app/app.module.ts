import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CartComponent,
    CartpageComponent,
    PurchaseComponent,
    DeliveryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
