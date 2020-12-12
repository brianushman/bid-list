import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Bid } from '../models/bid.model';

@Component({
  selector: 'app-bid-list-grid',
  templateUrl: './bid-list-grid.component.html',
  styleUrls: ['./bid-list-grid.component.css']
})
export class BidListGridComponent {

  @Input() bids: Bid[];

  constructor() { }

  formatDate(date: Date): string {
    return moment(date).format('M-D-YY');
  }

  formatTime(date: Date): string {
    return moment(date).format('h:mm A');
  }
}
