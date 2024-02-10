import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit  {
  custForm: FormGroup;

  constructor(
    private custService: CustomerService,
    private dialogRef: MatDialogRef<CustomerComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.custForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.custForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.custForm.valid) {
      if (this.data) {
        let customerUpdate= this.custForm.value;
        customerUpdate.id = this.data.id;
        this.custService
          .updateCustomer(this.data.id, this.custForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Customer details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the Customer!");
            },
          });
      } else {
        this.custService.addCustomer(this.custForm.value).subscribe({
          next: (val: any) => {
            alert('Customer added successfully!');
            this.custForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the customer!");
          },
        });
      }
    }
  }
}