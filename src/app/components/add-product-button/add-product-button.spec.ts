import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AddProductButton } from './add-product-button';

describe('AddProductButton', () => {
  let component: AddProductButton;
  let fixture: ComponentFixture<AddProductButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
