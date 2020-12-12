import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BidListGridComponent } from './bid-list-grid/bid-list-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateBidComponent } from './create-bid/create-bid.component';

@NgModule({
  declarations: [
    AppComponent,
    BidListGridComponent,
    CreateBidComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
