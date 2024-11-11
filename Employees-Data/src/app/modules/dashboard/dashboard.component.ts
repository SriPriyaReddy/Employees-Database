import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export type Employee = {
  id?: number;
  name?: string;
  role?: string;
  fromDate?: Date;
  toDate?: Date
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private router: Router, private dbService: NgxIndexedDBService) {}

  ngOnInit(): void {
    this.dbService.getAll('employee').subscribe((result: any) => {
      console.log('results: ', result);
      this.employees = result;
    });
  }
  addEmployee() {
    this.router.navigate(['/addEmployee'])
  }

  onEdit(employee: Employee) {
    this.router.navigate(['/editEmployee'], { state: { employeeData: employee}})
  }
}
