import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Bid } from '../models/bid.model';

@Component({
  selector: 'app-bid-list-grid',
  templateUrl: './bid-list-grid.component.html',
  styleUrls: ['./bid-list-grid.component.css']
})
export class BidListGridComponent {

  @Input() bids: Bid[];
  @Output() deletedRow = new EventEmitter();

  constructor() { }

  getAllBids(): Bid[] {
    return this.bids.filter(x => !x.IsDeleted);
  }

  formatDate(date: Date): string {
    return moment(date).format('M-D-YY');
  }

  formatTime(date: Date): string {
    return moment(date).format('h:mm A');
  }

  deleteBid(bid: Bid): void {
    this.deletedRow.emit(bid);
  }
}
