import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { Bid } from './models/bid.model';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { BidService } from './services/bid.service';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CT Mechanical Bid List';
  bids: Bid[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public bidService: BidService,
    private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.bidService.getBids().subscribe(x => this.bids = x);
  }

  openLoginModal() {
    this.bsModalRef = this.modalService.show(LoginComponent, {ignoreBackdropClick: true});
  }

  logoff() {
    this.bidService.setAdminUser(false);
  }

  openNewBidModal() {
    const initialState = {
      confirmCallback: (bid: Bid) => {
        this.bidService.createBid(bid).subscribe(
          value => {
            this.bids.push(value);
            this.toastr.success(`Successfully Saved Bid: ${bid.Name}`);
          },
          error => {
            this.toastr.error(error.error.ExceptionMessage, `Unable to save bid: ${bid.Name}. Contact Support.`);
          }
        );
      }
    };
    this.bsModalRef = this.modalService.show(CreateBidComponent, {initialState, ignoreBackdropClick: true});
  }

  deleteBid(bid: Bid): void {
    this.bidService.deleteBid(bid.Id).subscribe(
      x => {
        this.bids.find(x => x.Id == bid.Id).IsDeleted = true;
        this.toastr.success(`Successfully Deleted Bid: ${bid.Name}`);
      },
      error => {
        this.toastr.error(error.error.ExceptionMessage, `Unable to Delete Bid: ${bid.Name}`);
      }
    )
  }
}
