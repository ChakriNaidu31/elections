import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingStatementDetailsComponent } from './polling-statement-details.component';

describe('PollingStatementDetailsComponent', () => {
  let component: PollingStatementDetailsComponent;
  let fixture: ComponentFixture<PollingStatementDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollingStatementDetailsComponent]
    });
    fixture = TestBed.createComponent(PollingStatementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
