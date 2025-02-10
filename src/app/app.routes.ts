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

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            // { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            // { path: '**', component: NotFoundComponent }
        ]
    },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'cart', component: CartComponent },
            { path: '**', component: NotFoundComponent }
        ]
    },
];
