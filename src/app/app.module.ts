import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonLayoutsModule } from './common/common-layouts.module';
import { AppCommonModule } from './common/common.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteModalComponent } from './common/components/modals/delete-modal/delete-modal.component';
import { DenyModalComponent } from './common/components/modals/deny-modal/deny-modal.component';
import { ApproveModalComponent } from './common/components/modals/approve-modal/approve-modal.component';
import { MessageModalComponent } from './common/components/modals/message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteModalComponent,
    DenyModalComponent,
    ApproveModalComponent,
    MessageModalComponent
  ],
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCommonModule,
    CommonLayoutsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
