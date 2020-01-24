import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export type User = {
  name: string;
}

export type AuthState = {
  user: User | null;
}

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user')) || null
};


@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(initialState);
  }

  login(user: User) {
    this.update({ user });
    /** In real life, you will abstract this to service. */
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    /** In real life, you will abstract this to service. */
    localStorage.removeItem('user');
    this.update(initialState);
  }
}
