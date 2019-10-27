import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MenubarModule,
  InputTextModule,
  ButtonModule,
  MessageService,
  ConfirmationService,
  TooltipModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TopbarComponent } from './topbar/topbar.component';
import { TableComponent } from './table/table.component';
import { SkillService } from './table/skill.service';
import { AppComponent } from './app.component';
import { DamageCalculatorComponent } from './damage-calculator/dc.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TableComponent,
    DamageCalculatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [SkillService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
