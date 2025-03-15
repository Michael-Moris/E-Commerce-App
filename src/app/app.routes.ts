import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { AuthLayoutComponent } from './core/layouts/auth/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/auth/main-layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [isLoggedGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./core/auth/components/login/login.component').then((c) => c.LoginComponent) },
            { path: 'register', loadComponent: () => import('./core/auth/components/register/register.component').then((c) => c.RegisterComponent), title: 'Register' },
            { path: 'forgotpassword', loadComponent: () => import('./core/auth/components/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent), title: 'Forgot Password' },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/home/components/home/home.component').then((c) => c.HomeComponent), title: 'Home' },
            { path: 'categories', loadComponent: () => import('./features/category/components/categories-list/categories-list.component').then((c) => c.CategoriesListComponent), title: 'Categories' },
            { path: 'products', loadComponent: () => import('./features/product/components/product-list/product-list.component').then((c) => c.ProductListComponent), title: 'Products' },
            { path: 'product-detalis/:id', loadComponent: () => import('./features/product/components/product-detalis/product-detalis.component').then((c) => c.ProductDetalisComponent), title: 'Product Detalis' },
            { path: 'brands', loadComponent: () => import('./features/brands/components/brand-list/brand-list.component').then((c) => c.BrandListComponent), title: 'Brands' },
            { path: 'cart', loadComponent: () => import('./features/cart/components/cart-list/cart-list.component').then((c) => c.CartListComponent), title: 'Cart' },
            { path: 'wishlist', loadComponent: () => import('./features/wishList/components/wish-list-list/wish-list-list.component').then((c) => c.WishListListComponent), title: 'WishList' },
            { path: 'checkout/:id', loadComponent: () => import('./features/orders/components/checkout/checkout.component').then((c) => c.CheckoutComponent), title: 'Checkout' },
            { path: 'allorders', loadComponent: () => import('./features/orders/components/orders/orders.component').then((c) => c.OrdersComponent), title: 'My Orders' },
        ]
    },
    { path: '**', loadComponent: () => import('./core/auth/components/not-found/not-found.component').then((c) => c.NotFoundComponent), title: 'Not Found' }
];