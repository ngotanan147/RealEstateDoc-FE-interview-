import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from 'src/models/IProduct';
import { MockApiService } from 'src/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export class ListProductComponent {
  @ViewChild('matTable') table!: MatTable<any>;

  dataSource: MatTableDataSource<IProduct, MatPaginator> =
    new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'imageUrl',
    'quantity',
    'actions',
  ];

  constructor(
    private apiService: MockApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Fetch products
    this.apiService.getProducts().subscribe((res: IProduct[]) => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  navigateToProductDetails(id: string) {
    this.router.navigate(['view', id]);
  }

  navigateToEdit(id: string) {
    this.router.navigate(['edit', id]);
  }

  navigateToCreateProduct() {
    this.router.navigate(['create']);
  }

  handleSearch(event: any) {
    let filterString = event.target.value;
    filterString = filterString.trim();
    filterString = filterString.toLowerCase();
    this.dataSource.filter = filterString;
  }

  handleDeleteProduct(id: string) {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open('Delete successfully!', undefined, {
          duration: 3000,
        });
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== id
        );
      },
      error: () => {
        this.snackBar.open('Error while deleting product!', undefined, {
          duration: 3000,
        });
      },
    });
  }
}
