import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentsListComponent } from './presents-list.component';

describe('PresentsListComponent', () => {
  let component: PresentsListComponent;
  let fixture: ComponentFixture<PresentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentsListComponent]
    });
    fixture = TestBed.createComponent(PresentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
