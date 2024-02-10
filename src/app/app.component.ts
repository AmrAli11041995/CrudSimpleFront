import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from './customer.service';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = [
    'name',
    'age',
    'phoneNumber',
    'action'
  ];
 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private custService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.getCustomersList();
  }

  openCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomersList();
        }
      },
    });
  }

  getCustomersList() {
    this.custService.getCustomersList().subscribe({
      next: (res) => {
        debugger
        if(res.status){
          this.dataSource = new MatTableDataSource(res.data.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(res.data);
        } else {
          console.log(res.message);
        }
       
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // for searching customer with name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCustomer(id: number) {
    let confirm = window.confirm("Are you sure you want to delete this customer?");
    if(confirm) {
      this.custService.deleteCustomer(id).subscribe({
        next: (res) => {
          alert('Customer deleted!');
          this.getCustomersList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditForm(data: any) {
    debugger;
    const dialogRef = this.dialog.open(CustomerComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomersList();
        }
      }
    });
  }
}