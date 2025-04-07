import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchProductosComponent } from './search-productos/search-productos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos/:idCategoria', component: ProductsComponent },
    { path: 'productos/:idCategoria/:idProducto', component: ProductComponent },
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'search/:searchText', component: SearchProductosComponent},
];