import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ID, toggle } from '@datorama/akita';
import { Book } from './book.model';

export interface BooksState extends EntityState<Book> {
  searchTerm: string;
  resultIds: ID[];
  collection: ID[];
}

const initialState = {
  searchTerm: '',
  resultIds: [],
  loading: false,
  collection: JSON.parse(localStorage.getItem('collection') as string) || []
};

@Injectable()
@StoreConfig({ name: 'books' })
export class BooksStore extends EntityStore<BooksState, Book> {
  constructor() {
    super(initialState);
  }

  updateSearchTerm(searchTerm: string) {
    this.updateRoot({ searchTerm });
  }

  updateResultIds(resultIds: ID[]) {
    this.updateRoot({ resultIds });
  }

  updateCollection(id: ID) {
    this.updateRoot(state => ({ collection: toggle(state.collection, id) }));
  }
}
