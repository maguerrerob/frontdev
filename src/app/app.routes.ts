import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchProductosComponent } from './search-productos/search-productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CreacionProductoComponent } from './creacion-producto/creacion-producto.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CarritodosComponent } from './carritodos/carritodos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos/:idCategoria', component: ProductsComponent },
    { path: 'productos/:idCategoria/:idProducto', component: ProductComponent },
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'search/:searchText', component: SearchProductosComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'creacionProducto', component: CreacionProductoComponent},
    {path: 'pruebas', component: PruebasComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'carritodos', component: CarritodosComponent}
];