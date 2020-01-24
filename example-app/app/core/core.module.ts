import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { LayoutComponent } from './components/layout.component';
import { NavItemComponent } from './components/nav-item.component';
import { SidenavComponent } from './components/sidenav.component';
import { ToolbarComponent } from './components/toolbar.component';
import { MaterialModule } from '../material';

import { GoogleBooksService } from './services/google-books.service';
import { BooksService } from '../books/state/books.service';
import { BooksStore} from '../books/state/books.store';
import { BooksQuery} from '../books/state/books.query';

import { LayoutService } from './state/layout.service';
import { LayoutStore } from './state/layout.store';
import { LayoutQuery } from './state/layout.query';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent
];
 
@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() { 
    return {
      ngModule: CoreModule,
      providers: [GoogleBooksService, BooksService, BooksStore, BooksQuery, LayoutService, LayoutStore, LayoutQuery],
    };
  }
}
