import { LoginComponent } from './core/auth/components/login/login.component';
import { Routes } from '@angular/router';
// import { AuthComponent } from './core/layouts/auth/auth.component';
// import { UserComponent } from './core/layouts/user/user.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { CategoryComponent } from './features/category/components/category/category.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { NotFoundComponent } from './core/auth/components/not-found/not-found.component';
import { AuthLayoutComponent } from './core/layouts/auth/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/auth/main-layout/main-layout/main-layout.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { BrandListComponent } from './features/brands/components/brand-list/brand-list.component';
import { ProductDetalisComponent } from './features/product/components/product-detalis/product-detalis.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedGuard } from './core/guards/is-logged.guard';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [isLoggedGuard], children: [
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
        ]
    },
    {
        path: '', component: MainLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'categories', component: CategoryComponent, title: 'Categories' },
            { path: 'products', component: ProductListComponent, title: 'Products' },
            { path: 'product-detalis/:id', component: ProductDetalisComponent, title: 'Product Detalis' },
            { path: 'brands', component: BrandListComponent, title: 'Brands' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
        ]
    },
    { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
