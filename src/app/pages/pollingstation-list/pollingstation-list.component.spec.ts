import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingstationListComponent } from './pollingstation-list.component';

describe('PollingstationListComponent', () => {
  let component: PollingstationListComponent;
  let fixture: ComponentFixture<PollingstationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollingstationListComponent]
    });
    fixture = TestBed.createComponent(PollingstationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
