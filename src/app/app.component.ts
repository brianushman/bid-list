import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { Bid } from './models/bid.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CT Mechanical Bid List';
  bids: Bid[] = [];
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}
  
  ngOnInit(): void {
    var bid1 = new Bid();
    bid1.Name = "New Bid";
    bid1.DateDue = moment().toDate();
    bid1.IsDuct = false;
    bid1.IsPipe = true;
    bid1.Addendums = 4;
    this.bids.push(bid1)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
