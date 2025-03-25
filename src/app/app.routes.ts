import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductsComponent },
    { path: 'productos/producto/:id', component: ProductComponent },
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
];