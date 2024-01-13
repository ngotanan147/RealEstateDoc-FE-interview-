import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from 'src/models/IProduct';
import { MockApiService } from 'src/services';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export class ListProductComponent {
  @ViewChild('matTable') table!: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  dataSource!: MatTableDataSource<IProduct, MatPaginator>;
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'image',
    'quantity',
    'actions',
  ];

  constructor(
    private apiService: MockApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    // Fetch products
    this.apiService.getProducts().subscribe((res: IProduct[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.data = this.dataSource.data.filter(
        (item: IProduct) => !item.isDeleted
      );
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
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
    const deleteProduct = this.dataSource.data.find(
      (item: IProduct) => item.id === id
    );
    if (!deleteProduct) {
      this.snackBar.open('Product to delete not found', undefined, {
        duration: 3000,
      });
      return;
    }

    deleteProduct.isDeleted = true;
    this.apiService.deleteProduct(deleteProduct).subscribe({
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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
