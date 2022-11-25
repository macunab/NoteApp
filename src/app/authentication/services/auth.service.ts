import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResponse, User } from '../interfaces/interfaces';
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;
  private headers = new HttpHeaders()
  .set('x-token', localStorage.getItem('token') || '');

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { }

  saveToken(response: DataResponse<User>) {
    if(response.ok) {
      localStorage.setItem('token', response.token!);
      this._user = response.data!;
      console.log(`THE USER IS: ${this._user.name}`);
    }
  }

  getUser() {
    return { ...this._user }
  }
  
  login(email: string, password: string) {
    const url: string = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    return this.http.post<DataResponse<User>>(url, body)
      .pipe(
        tap( res => {
          console.log('Se ejecuto el LOGIN NORMAL');
          this.saveToken(res);
        }),
        map( res => res.ok),
        catchError(error => of(error.ok))
      )
  }

  register(user: User) {
    const url: string = `${ this.baseUrl }/users`;
    return this.http.post<DataResponse<null>>(url, user)
      .pipe(
        map( res => res.ok ),
        catchError(error => of(error.ok))
      )
  }

  tokenValidation(): Observable<boolean> {
    const url: string = `${ this.baseUrl }/auth/verify`;
    return this.http.get<DataResponse<User>>(url, { headers : this.headers })
      .pipe(
        tap( res => {
          this.saveToken(res);
        }),
        map( res => res.ok),
        catchError( err => of(err.ok))
      )
  }

  updatePassword(password: string) {
    const url: string = `${ this.baseUrl }/users/update-psw`;
    return this.http.put<DataResponse<null>>(url, { password }, { headers: this.headers })
      .pipe(
        map( res => res.ok),
        catchError( err => of(err.ok))
      )  
  }

  googleLogin(token: string) {
    const url: string = `${ this.baseUrl }/auth/login/google`;
    return this.http.post<DataResponse<User>>(url, { token })
      .pipe(
        tap( resp => {
          console.log('Se ejecuto el GOOGLE LOGIN ');
          this.saveToken(resp);
        })
      )
  }

  logout() {
    localStorage.clear();
    console.log('USUARIO DE AUTH: ' + JSON.stringify(this._user))
    this._user.email = '';
    if(this._user.googleId){
      console.log('El USUARIO ES DE GOOGLE');
      google.accounts.id.revoke('mn.acunab@gmail.com', () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('login');
        })
    });
    } else {
      this.router.navigateByUrl('login');
    }
   
  }
}