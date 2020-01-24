import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthQuery } from './state/auth.query';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authQuery: AuthQuery,
              private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authQuery.isLoggedIn$.pipe(
      take(1),
      switchMap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
        return of(isLoggedIn);
      })
    );
  }
}
