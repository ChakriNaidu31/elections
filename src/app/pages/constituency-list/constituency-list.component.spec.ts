import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituencyListComponent } from './constituency-list.component';

describe('ConstituencyListComponent', () => {
  let component: ConstituencyListComponent;
  let fixture: ComponentFixture<ConstituencyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstituencyListComponent]
    });
    fixture = TestBed.createComponent(ConstituencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
