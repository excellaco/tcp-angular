import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service
  const adminKey =
    // tslint:disable-next-line:max-line-length
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6ImFkbWluIn0.1dxln22U-jkWVN0WDLH0ltpkW47YrI550OXn90v6ahI'
  const userKey =
    // tslint:disable-next-line:max-line-length
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6InVzZXIifQ.vnbR72yHX00WxfuffPtvJHshw8_ovRaDoCiMX9O0zVU'
  const expiredKey =
    // tslint:disable-next-line:max-line-length
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU2MDg4MDM0Njk3MiwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6InVzZXIifQ.AAEXad4d-yujbraq02gyXXZEzvxWZ3ySv2ISmyHK0fQ'

  beforeEach(() => {
    service = new AuthService(null, null)
    service.router = { navigateByUrl: () => {} }
    service.key = 'tcp-test-key'
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('logout()', () => {
    it('should clear localstorage', () => {
      localStorage.setItem(service.key, adminKey)
      service.logout()
      expect(localStorage.getItem(service.key)).toEqual(null)
    })
    it('should navigate to te login page', () => {
      spyOn(service.router, 'navigateByUrl').and.callThrough()
      service.logout()
      expect(service.router.navigateByUrl).toHaveBeenCalledWith('login')
    })
  })

  describe('getToken()', () => {
    it('should return token', () => {
      localStorage.setItem(service.key, adminKey)
      expect(service.getToken()).toEqual(adminKey)
    })

    it('decoded should return decoded token', () => {
      localStorage.setItem(service.key, adminKey)
      expect(service.getToken(true).role).toEqual('admin')
    })

    // THIS NEEDS A NEW TOKEN THAT IS ACTUALLY EXPIRED
    xit('should not return token when expired', () => {
      localStorage.setItem(service.key, expiredKey)
      expect(service.getToken()).toEqual(null)
    })
  })

  describe('getEmail()', () => {
    it('should return email', () => {
      localStorage.setItem(service.key, adminKey)
      expect(service.getEmail()).toEqual('jon.doe@gmail.com')
    })
  })

  describe('getRole()', () => {
    it('should return role', () => {
      localStorage.setItem(service.key, adminKey)
      expect(service.getRole()).toEqual('admin')
    })
  })

  describe('isLoggedIn()', () => {
    it('should return true if logged in', () => {
      localStorage.setItem(service.key, adminKey)
      expect(service.isLoggedIn()).toEqual(true)
    })

    it('should return false if not logged in', () => {
      localStorage.removeItem(service.key)
      expect(service.isLoggedIn()).toEqual(false)
    })
  })

  describe('isAdmin()', () => {
    it('should return true if user is admin', () => {
      localStorage.setItem(service.key, adminKey)
      expect(service.isAdmin()).toEqual(true)
    })

    it('should return false if user is not admin', () => {
      localStorage.setItem(service.key, userKey)
      expect(service.isAdmin()).toEqual(false)
    })
  })
})
