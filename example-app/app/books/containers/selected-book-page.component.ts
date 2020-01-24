import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Book } from '../state/book.model';
import { BooksQuery } from '../state/books.query';
import { BooksService } from '../state/books.service';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="updateCollection($event)"
      (remove)="updateCollection($event)">
    </bc-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private booksQuery: BooksQuery,
    private booksService: BooksService) {

    this.book$ = this.booksQuery.selectActive();
    this.isSelectedBookInCollection$ = this.booksQuery.isInCollection$;
  }

  updateCollection({ id }: Book) {
    this.booksService.updateCollection(id);
  }
}
