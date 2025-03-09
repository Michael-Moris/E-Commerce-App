import { LoginComponent } from './core/auth/components/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { NotFoundComponent } from './core/auth/components/not-found/not-found.component';
import { AuthLayoutComponent } from './core/layouts/auth/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/auth/main-layout/main-layout/main-layout.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { BrandListComponent } from './features/brands/components/brand-list/brand-list.component';
import { ProductDetalisComponent } from './features/product/components/product-detalis/product-detalis.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { CartListComponent } from './features/cart/components/cart-list/cart-list.component';
import { CheckoutComponent } from './features/orders/components/checkout/checkout.component';
import { OrdersComponent } from './features/orders/components/orders/orders.component';
import { ForgotPasswordComponent } from './core/auth/components/forgot-password/forgot-password.component';
import { CategoriesListComponent } from './features/category/components/categories-list/categories-list.component';
import { WishListListComponent } from './features/wishList/components/wish-list-list/wish-list-list.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [isLoggedGuard], children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
            { path: 'forgotpassword', component: ForgotPasswordComponent, title: 'Forgot Password' },
        ]
    },
    {
        path: '', component: MainLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'categories', component: CategoriesListComponent, title: 'Categories' },
            { path: 'products', component: ProductListComponent, title: 'Products' },
            { path: 'product-detalis/:id', component: ProductDetalisComponent, title: 'Product Detalis' },
            { path: 'brands', component: BrandListComponent, title: 'Brands' },
            { path: 'cart', component: CartListComponent, title: 'Cart' },
            { path: 'wishlist', component: WishListListComponent, title: 'WishList' },
            { path: 'checkout/:id', component: CheckoutComponent, title: 'checkout' },
            { path: 'allorders', component: OrdersComponent, title: 'My Orders' },
            { path: '**', component: NotFoundComponent, title: 'Not Found' }
        ]
    },

];
