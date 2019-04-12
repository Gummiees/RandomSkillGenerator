import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'rkg-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  items: MenuItem[] = [];
  constructor() {}
}
