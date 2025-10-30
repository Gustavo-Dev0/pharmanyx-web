import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductButton } from './product-button';

describe('ProductButton', () => {
  let component: ProductButton;
  let fixture: ComponentFixture<ProductButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductButton],
      providers: [provideZonelessChangeDetection()]
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
