import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductComponent,
  },
  {
    path: 'view/:id',
    component: ViewProductComponent,
  },
  {
    path: 'create',
    component: EditProductComponent,
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
