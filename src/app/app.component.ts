import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { Bid } from './models/bid.model';
import { ActivatedRoute } from '@angular/router';
import { CreateBidComponent } from './create-bid/create-bid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CT Mechanical Bid List';
  bids: Bid[] = [];
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.bids = this.route.snapshot.data['bids'];
  }

  openNewBidModal() {
    const initialState = {
    };
    this.bsModalRef = this.modalService.show(CreateBidComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
