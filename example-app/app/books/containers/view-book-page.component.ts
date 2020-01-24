import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { BooksService } from '../state/books.service';

@Component({
  selector: 'bc-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-book-page></bc-selected-book-page>
  `,
})
export class ViewBookPageComponent {
  constructor(private bookService: BooksService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const activeBookId = this.route.snapshot.paramMap.get('id');
    this.bookService.setActive(activeBookId);
  }

}
