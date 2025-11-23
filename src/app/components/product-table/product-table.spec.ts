import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductTable } from './product-table';

describe('ProductTable', () => {
  let component: ProductTable;
  let fixture: ComponentFixture<ProductTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTable],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
