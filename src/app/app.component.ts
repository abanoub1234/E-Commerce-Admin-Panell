import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { PromoCodesComponent } from './pages/promo-codes/promo-codes.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone component
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    CartComponent,
    PaymentComponent,
    ReviewsComponent,
    PromoCodesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce-Admin-Panel';
}
