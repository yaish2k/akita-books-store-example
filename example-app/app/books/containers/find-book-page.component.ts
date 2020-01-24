import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, switchMap, skip, debounceTime, filter } from 'rxjs/operators';
import { Book } from '../state/book.model';
import { BooksQuery } from '../state/books.query';
import { BooksService } from '../state/books.service';
import { TakeUntilDestroy, untilDestroyed, OnDestroy } from 'ngx-take-until-destroy';

@TakeUntilDestroy()
@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search [query]="searchQuery" [searching]="loading$ | async" [error]="error$ | async" (search)="search($event)"></bc-book-search>
    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery: string;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private bookQuery: BooksQuery,
    private bookService: BooksService) {

    this.searchQuery = this.bookQuery.getSearchTerm;
    this.loading$ = this.bookQuery.selectLoading();

    this.bookQuery.selectSearchTerm$.pipe(skip(1), filter(Boolean), debounceTime(300), untilDestroyed(this)).subscribe(searchTerm => {
      this.bookService.searchBooks(searchTerm);
    });

    this.books$ = this.bookQuery.selectResultIds$.pipe(
      switchMap(ids => this.bookQuery.selectMany(ids))
    );
  }

  search(query: string) {
    this.bookService.updateSearchTerm(query);
  }

  ngOnDestroy() { }

}
