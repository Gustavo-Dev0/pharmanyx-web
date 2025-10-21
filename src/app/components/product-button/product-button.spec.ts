import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductButton } from './product-button';

describe('ProductButton', () => {
  let component: ProductButton;
  let fixture: ComponentFixture<ProductButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
