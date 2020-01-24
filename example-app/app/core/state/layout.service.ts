import { Injectable } from '@angular/core';
import { LayoutStore } from './layout.store';

@Injectable()
export class LayoutService {

  constructor(private layoutStore: LayoutStore){}

  setSideNavState(status: boolean) {
    this.layoutStore.updateSideNavState(status);
  }

}
