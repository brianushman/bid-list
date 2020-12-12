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

  data: Bid = new Bid();

  ngOnInit(): void {
    this.data.DateDue = new Date();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      addendums: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)')
  }
}
