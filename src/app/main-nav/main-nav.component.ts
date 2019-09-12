import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { IEmployee } from '../models/employee.interface'
import { EmployeesService } from '../services/employees/employees.service'

import { AuthService } from '../services/auth/auth.service'

@Component({
  selector: 'tcp-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  employee$: Observable<IEmployee>
  subscriptions: Subscription[] = []
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  constructor(
    private employeeService: EmployeesService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.employee$ = this.getCurrentUser()
    }
    return this.authService.isLoggedIn()
  }

  logout() {
    this.authService.logout()
  }

  currentUserIsAdmin() {
    return this.authService.isAdmin()
  }

  getCurrentUser(): Observable<IEmployee> {
    return this.employeeService.getByEmail(this.authService.getEmail())
  }
}
