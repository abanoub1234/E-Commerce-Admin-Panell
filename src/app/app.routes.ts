import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { PromoCodesComponent } from './pages/promo-codes/promo-codes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';

export const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: 'promo-codes', component: PromoCodesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/admin-login', pathMatch: 'full' }
];



  @NgModule({
    declarations: [
        NavbarComponent,
        DashboardComponent,
        UsersComponent
      ],
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }