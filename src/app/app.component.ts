import { Component } from '@angular/core';
import { IProduct } from 'src/models/IProduct';
import { MockApiService } from 'src/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataSource: IProduct[] = [];
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'imageUrl',
    'quantity',
    'actions',
  ];

  constructor(private apiService: MockApiService) {
    this.apiService.getProducts().subscribe((res: IProduct[]) => {
      this.dataSource = res;
    });
  }
}
