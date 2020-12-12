import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidListGridComponent } from './bid-list-grid.component';

describe('BidListGridComponent', () => {
  let component: BidListGridComponent;
  let fixture: ComponentFixture<BidListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidListGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
