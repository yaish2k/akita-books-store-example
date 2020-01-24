import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export type LayoutState = {
  sideNavOpen: boolean;
}

const initialState = {
  sideNavOpen: false
};

@StoreConfig({ name: 'layout' })
export class LayoutStore extends Store<LayoutState> {

  constructor() {
    super(initialState);
  }

  updateSideNavState(status: boolean) {
    this.update({ sideNavOpen: status });
  }

}

