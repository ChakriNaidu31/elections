import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsDetailsComponent } from './elections-details.component';

describe('ElectionsDetailsComponent', () => {
  let component: ElectionsDetailsComponent;
  let fixture: ComponentFixture<ElectionsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectionsDetailsComponent]
    });
    fixture = TestBed.createComponent(ElectionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
