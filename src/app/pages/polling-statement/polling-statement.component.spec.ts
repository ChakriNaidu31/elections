import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingStatementComponent } from './polling-statement.component';

describe('PollingStatementComponent', () => {
  let component: PollingStatementComponent;
  let fixture: ComponentFixture<PollingStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollingStatementComponent]
    });
    fixture = TestBed.createComponent(PollingStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
