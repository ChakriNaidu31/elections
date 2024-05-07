import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsListComponent } from './elections-list.component';

describe('ElectionsListComponent', () => {
  let component: ElectionsListComponent;
  let fixture: ComponentFixture<ElectionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectionsListComponent]
    });
    fixture = TestBed.createComponent(ElectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
