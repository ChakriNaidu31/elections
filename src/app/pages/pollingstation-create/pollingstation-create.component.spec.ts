import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingstationCreateComponent } from './pollingstation-create.component';

describe('PollingstationCreateComponent', () => {
  let component: PollingstationCreateComponent;
  let fixture: ComponentFixture<PollingstationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollingstationCreateComponent]
    });
    fixture = TestBed.createComponent(PollingstationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
