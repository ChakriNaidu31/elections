import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituencyCreateComponent } from './constituency-create.component';

describe('ConstituencyCreateComponent', () => {
  let component: ConstituencyCreateComponent;
  let fixture: ComponentFixture<ConstituencyCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstituencyCreateComponent]
    });
    fixture = TestBed.createComponent(ConstituencyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
