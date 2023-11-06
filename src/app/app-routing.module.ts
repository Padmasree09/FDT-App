import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { CartpageComponent } from './cartpage/cartpage.component';
const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cartpage', component: CartpageComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
