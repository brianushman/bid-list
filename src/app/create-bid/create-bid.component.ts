import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bid } from '../models/bid.model';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.css']
})
export class CreateBidComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) { }

  confirmCallback: (bid: Bid) => void;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      addendums: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      estimator: ['', Validators.required],
      duct: [false, Validators.required],
      pipe: [false, Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    var bid = new Bid();
    bid.Name = this.registerForm.controls['name'].value;
    bid.DateDue = moment(`${this.registerForm.controls['date'].value.toLocaleDateString("en-US")} ${this.registerForm.controls['time'].value}`).toDate();
    bid.Estimator = this.registerForm.controls['estimator'].value;
    bid.IsDuct = this.registerForm.controls['duct'].value;
    bid.IsPipe = this.registerForm.controls['pipe'].value;
    bid.Addendums = this.registerForm.controls['addendums'].value;

    if(this.confirmCallback != null) this.confirmCallback(bid);
    this.bsModalRef.hide();
  }
}
