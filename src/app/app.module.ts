import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MenubarModule, InputTextModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { TopbarComponent } from './topbar/topbar.component';
import { TableComponent } from './table/table.component';
import { SkillService } from './table/skill.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, TopbarComponent, TableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SkillService],
  bootstrap: [AppComponent]
})
export class AppModule {}
