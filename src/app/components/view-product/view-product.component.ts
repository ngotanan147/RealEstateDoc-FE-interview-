import { Component } from '@angular/core';
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
    private router: Router
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

  backToList() {
    this.router.navigate(['']);
  }
}
