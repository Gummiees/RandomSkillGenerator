import { Component } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'rc-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  items: MenuItem[] = [];
  constructor() {}
}
