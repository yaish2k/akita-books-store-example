import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map, switchMap, mapTo } from 'rxjs/operators';
import { GoogleBooksService } from '../core/services/google-books.service';
import { toBoolean, ID } from '@datorama/akita';
import { BooksQuery } from './state/books.query';
import { BooksService } from './state/books.service';
import { Book } from './state/book.model';

@Injectable()
export class BookExistsGuard implements CanActivate {
  constructor(
    private googleBooks: GoogleBooksService,
    private router: Router,
    private bookQuery: BooksQuery,
    private bookSerivce: BooksService
  ) {}

  hasBookInApi(id: string): Observable<boolean> {
    return this.googleBooks.retrieveBook(id).pipe(
      map(book => !!book),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  hasBook(id: string): Observable<boolean> {
    if(this.bookQuery.hasEntity(id)) {
      this.bookSerivce.setActive(id);
      return of(true);
    }
    return this.hasBookInApi(id);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasBook(route.params['id']);
  }
}
