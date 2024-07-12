import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'token';
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  constructor(private _router: Router) {
    const initialAuthState = !!this.getAuthToken();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      initialAuthState
    );
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  public setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isAuthenticatedSubject.next(true);  
  }
  
  public clearAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isAuthenticatedSubject.next(false);
    this._router.navigate(['/get-cid'])
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
