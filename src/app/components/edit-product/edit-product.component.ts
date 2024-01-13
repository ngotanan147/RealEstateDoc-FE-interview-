import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/models/IProduct';
import { MockApiService } from 'src/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
// const yourModuleName = require('uuid');
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  editData?: IProduct;
  formGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    category: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
    quantity: new FormControl(),
  });

  isCreateMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: MockApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      if (data.id) {
        this.apiService.getProductById(data.id).subscribe((product: any) => {
          this.editData = product[0] ? product[0] : undefined;
          // Path value to form group
          this.formGroup?.patchValue({
            id: this.editData?.id,
            name: this.editData?.name,
            category: this.editData?.category,
            description: this.editData?.description,
            image: this.editData?.image,
            price: this.editData?.price,
            quantity: this.editData?.quantity,
          });
        });
      } else {
        this.isCreateMode = true;
        console.log(this.isCreateMode);
      }
    });
  }

  backToList() {
    this.router.navigate(['']);
  }

  validateFormControl(control: FormControl) {
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  }

  getFormControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        this.validateFormControl(control);
        return;
      }

      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  validateMessage(formControl: FormControl) {
    if (formControl.invalid && (formControl.dirty || formControl.touched)) {
      if (formControl.errors?.['required']) {
        return 'This field is required';
      }
    }
    return '';
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      this.validateAllFormFields(this.formGroup);
      return;
    }
    if (!this.isCreateMode) {
      this.apiService.updateProduct(<IProduct>this.formGroup.value).subscribe({
        next: () => {
          this.snackBar.open('Edit successfully!', undefined, {
            duration: 3000,
          });
          this.router.navigate(['']);
        },
        error: () => {
          this.snackBar.open('Error while updating product', undefined, {
            duration: 3000,
          });
        },
      });
    } else {
      this.formGroup.patchValue({
        id: uuidv4(),
      });
      this.apiService.createProduct(<IProduct>this.formGroup.value).subscribe({
        next: () => {
          this.snackBar.open('Create successfully!', undefined, {
            duration: 3000,
          });
          this.router.navigate(['']);
        },
        error: () => {
          this.snackBar.open('Error while creating product', undefined, {
            duration: 3000,
          });
        },
      });
    }
  }
}
