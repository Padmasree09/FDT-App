import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ItemdescriptionComponent } from './itemdescription/itemdescription.component';
const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cartpage', component: CartpageComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'itemdescription/:id', component: ItemdescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//comment
