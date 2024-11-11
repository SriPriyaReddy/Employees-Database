import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../dashboard/dashboard.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  rolesList = [ 'Product Designer', 'Flutter Developer', 'Product Owner'];
  addEmployeeForm: FormGroup;
  isEdit = false;
  employeeData: Employee = {};

  constructor(private formbuilder: FormBuilder, private dbService: NgxIndexedDBService,
    private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar
  ) {
    this.addEmployeeForm = this.formbuilder.group({
      name: new FormControl(),
      role: new FormControl(),
      fromDate: new FormControl(),
      toDate: new FormControl()
    });
    this.isEdit = this.router.url.includes("edit");
    this.employeeData = this.router.getCurrentNavigation()?.extras?.state?.['employeeData'];
    if(this.employeeData) {
      this.setFormValues();
    }
  }

  ngOnInit(): void {
    
  }

  saveEmployee() {
    if(!this.isEdit) {
      this.dbService.add('employee', this.addEmployeeForm.value).subscribe(() => {
        console.log('Record added successfully.');
        this.snackBar.open("Employee Added successfully", "" , {duration: 3000})
      });
    }
    else {
      this.dbService.update('employee', {id: this.employeeData.id , ...this.addEmployeeForm.value}).subscribe(() => {
        console.log('Record updated successfully.');
        this.snackBar.open("Employee updated successfully", "" , {duration: 3000})
      });
    }
    
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  setFormValues() {
    this.addEmployeeForm.get('name')?.setValue(this.employeeData.name);
    this.addEmployeeForm.get('role')?.setValue(this.employeeData.role);
    this.addEmployeeForm.get('fromDate')?.setValue(this.employeeData.fromDate);
    this.addEmployeeForm.get('toDate')?.setValue(this.employeeData.toDate);
  }
}
