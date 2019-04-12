import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'rsg-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  items: MenuItem[] = [];
  constructor() {}
}
