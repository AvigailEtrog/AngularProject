import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentsPurchaseComponent } from './presents-purchase.component';

describe('PresentsPurchaseComponent', () => {
  let component: PresentsPurchaseComponent;
  let fixture: ComponentFixture<PresentsPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentsPurchaseComponent]
    });
    fixture = TestBed.createComponent(PresentsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
