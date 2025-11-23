import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../domain/products/services/product.service';
import { of } from 'rxjs';
import { Product } from '../../../../domain/products/models/product.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['save']);

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.addProductForm).toBeDefined();
    const formControls = Object.keys(component.addProductForm.controls);
    const expectedControls = ['code', 'name', 'laboratory', 'sanitaryRegistration', 'purchasePrice', 'status', 'requiresPrescription', 'presentations', 'box', 'blisterPacks', 'units'];
    expect(formControls).toEqual(expectedControls);
  });

  it('should mark form as invalid if required fields are not filled', () => {
    component.addProductForm.setValue({
      code: '',
      name: '',
      laboratory: '',
      sanitaryRegistration: '',
      purchasePrice: null,
      status: null,
      requiresPrescription: false,
      presentations: [],
      box: { enabled: true, price: null },
      blisterPacks: { enabled: false, blisterPackByBox: null, price: null },
      units: { enabled: false, unitBy: null, price: null }
    });
    expect(component.addProductForm.valid).toBeFalsy();
  });

  it('should mark form as valid if all required fields are filled', () => {
    component.addProductForm.setValue({
      code: 'P001',
      name: 'Product 1',
      laboratory: 'Lab 1',
      sanitaryRegistration: 'SR001',
      purchasePrice: 10,
      status: 'Active',
      requiresPrescription: false,
      presentations: [],
      box: { enabled: true, price: 20 },
      blisterPacks: { enabled: false, blisterPackByBox: null, price: null },
      units: { enabled: false, unitBy: null, price: null }
    });
    expect(component.addProductForm.valid).toBeTruthy();
  });

  it('should call product service with correct data on submit', () => {
    component.addProductForm.setValue({
      code: 'P001',
      name: 'Product 1',
      laboratory: 'Lab 1',
      sanitaryRegistration: 'SR001',
      purchasePrice: 10,
      status: 'Active',
      requiresPrescription: false,
      presentations: [],
      box: { enabled: true, price: 20 },
      blisterPacks: { enabled: true, blisterPackByBox: 10, price: 2 },
      units: { enabled: true, unitBy: 5, price: 1 }
    });

    const expectedProduct: Partial<Product> = {
      code: 'P001',
      name: 'Product 1',
      laboratory: 'Lab 1',
      sanitaryRegistration: 'SR001',
      purchasePrice: 10,
      status: 'Active',
      requiresPrescription: false,
      presentations: [
        { type: 'BOX', conversionFactor: 1, salePrice: 20, allowsSale: true },
        { type: 'BLISTERPACK', conversionFactor: 10, salePrice: 2, allowsSale: true },
        { type: 'UNIT', conversionFactor: 5, salePrice: 1, allowsSale: true }
      ]
    };

    productService.save.and.returnValue(of({ id: '1', ...expectedProduct } as Product));
    const closeFn = jasmine.createSpy('closeFn');
    fixture.componentRef.setInput('onClose', closeFn);

    component.onSubmit();

    expect(productService.save).toHaveBeenCalledWith(jasmine.objectContaining(expectedProduct));
    expect(closeFn).toHaveBeenCalledWith({ success: true });
  });

  it('should not call product service on submit if form is invalid', () => {
    component.addProductForm.setErrors({ 'invalid': true });
    component.onSubmit();
    expect(productService.save).not.toHaveBeenCalled();
  });

  it('should update presentationType signal', () => {
    component.changedPresentationType('UNIT');
    expect(component.presentationType()).toBe('UNIT');
  });
});
