import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from '../../auth/state/auth.query';
import { AuthService } from '../../auth/state/auth.service';
import { LayoutQuery } from '../state/layout.query';
import { LayoutService } from '../state/layout.service';
import { BooksService } from '../../books/state/books.service';

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/" icon="book" hint="View your book collection">
          My Collection
        </bc-nav-item>
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/books/find" icon="search" hint="Find your next book!">
          Browse Books
        </bc-nav-item>
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="!(loggedIn$ | async)">
          Sign In
        </bc-nav-item>
        <bc-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">
          Sign Out
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Book Collection
      </bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `,
})
export class AppComponent implements OnInit {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private authQuery: AuthQuery,
    private authService: AuthService,
    private bookService: BooksService,
    private layoutQuery: LayoutQuery,
    private layoutService: LayoutService) {
    
  }

  ngOnInit() {
    this.showSidenav$ = this.layoutQuery.sideNavOpen$;
    this.loggedIn$ = this.authQuery.isLoggedIn$;
    this.bookService.loadBooksToStore();
  }

  closeSidenav() {
    this.layoutService.setSideNavState(false);
  }

  openSidenav() {
    this.layoutService.setSideNavState(true);
  }

  logout() {
    this.closeSidenav();
    this.authService.logout();
  }
}
