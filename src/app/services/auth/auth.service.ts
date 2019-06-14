import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'

import { Role } from '../../models/role'

export interface IAuthService {
  login(username: string, password: string): void
  logout(): void
  getToken(decoded: boolean)
  getEmail(): string
  getRole(): string
  isLoggedIn(): boolean
  isAdmin(): boolean
}

@Injectable()
export class AuthService implements IAuthService {
  key = 'tcp-angular'
  jwtHelper = new JwtHelperService()

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .get('login', {
        headers: new HttpHeaders({ u: username, p: password }),
      })
      .subscribe(
        (data: string) => {
          localStorage.setItem(this.key, data)
          this.router.navigateByUrl('')
        },
        (err: HttpErrorResponse) => {
          alert(err.error)
        }
      )
  }

  logout() {
    localStorage.removeItem(this.key)
    this.router.navigateByUrl('login')
  }

  getToken(decoded: boolean = false) {
    const token = localStorage.getItem(this.key)
    try {
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token)
        if (decodedToken.exp - new Date().getTime() < 0) {
          this.logout()
          return null
        }
      }
      if (decoded) {
        return this.jwtHelper.decodeToken(token)
      } else {
        return token
      }
    } catch (err) {
      this.logout()
    }
  }

  getEmail(): string {
    const token = this.getToken(true)
    return token.email
  }

  getRole(): string {
    const token = this.getToken(true)
    return token.role
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true
    }
    return false
  }

  isAdmin(): boolean {
    return this.getRole() === Role.admin
  }
}
