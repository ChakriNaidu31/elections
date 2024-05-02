import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardCreateComponent } from './ward-create.component';

describe('WardCreateComponent', () => {
  let component: WardCreateComponent;
  let fixture: ComponentFixture<WardCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WardCreateComponent]
    });
    fixture = TestBed.createComponent(WardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
