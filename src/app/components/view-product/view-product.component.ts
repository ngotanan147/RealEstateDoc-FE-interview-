import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/models/IProduct';
import { MockApiService } from 'src/services';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss',
})
export class ViewProductComponent {
  productData?: IProduct;

  constructor(
    private route: ActivatedRoute,
    private apiService: MockApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Get param Id and fetch data
    this.route.params.subscribe((data: any) => {
      if (data.id) {
        this.apiService.getProductById(data.id).subscribe((product: any) => {
          this.productData = product[0] ? product[0] : undefined;
        });
      }
    });
  }

  getKeysOfproduct() {
    if (!this.productData) {
      return;
    }
    return Object.keys(this.productData);
  }

  getDataByKey(key: string) {
    if (!this.productData) {
      return;
    }
    if (!Object.keys(this.productData).includes(key)) {
      return;
    }

    return this.productData[key as keyof IProduct];
  }

  navigateToEditProduct(id: string) {
    this.router.navigate(['edit', id]);
  }

  handleDeleteProduct() {
    if (!this.productData) {
      return;
    }
    this.productData.isDeleted = true;
    this.apiService.deleteProduct(this.productData).subscribe({
      next: () => {
        this.snackBar.open('Delete successfully!', undefined, {
          duration: 3000,
        });
        this.router.navigate(['']);
      },
      error: () => {
        this.snackBar.open('Error while deleting product!', undefined, {
          duration: 3000,
        });
      },
    });
  }

  backToList() {
    this.router.navigate(['']);
  }
}
