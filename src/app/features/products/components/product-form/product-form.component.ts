import { Component, computed, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Product } from '../../../../domain/products/models/product.model';
import { ProductService } from '../../../../domain/products/services/product.service';
import { ResultModal } from '../../../../shared/components/modal/modal';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  addProductForm!: FormGroup;
  onClose = input<(result: ResultModal) => void>();
  product = input<Product | undefined>();
  isReadOnly = input<boolean>(false);
  isEditMode = computed(() => !!this.product());

  basicFields = [
    { name: 'code', label: 'Code', type: 'text', placeholder: 'Enter product code', validators: [Validators.required] },
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter product name', validators: [Validators.required] },
    { name: 'laboratory', label: 'Laboratory', type: 'text', placeholder: 'Enter laboratory name', validators: [Validators.required] },
    { name: 'sanitaryRegistration', label: 'Sanitary Registration', type: 'text', placeholder: 'Enter sanitary registration', validators: [Validators.required] },
    { name: 'purchasePrice', label: 'Purchase Price', type: 'number', placeholder: 'Enter purchase price', validators: [Validators.required] },
    { name: 'status', label: 'Status', type: 'select', placeholder: 'Select status', options: ['Active', 'Inactive'], validators: [Validators.required] },
    { name: 'requiresPrescription', label: 'Require Prescription', type: 'checkbox' }
  ];

  presentationOptions: { value: 'BOX' | 'BLISTERPACK' | 'UNIT'; label: string }[] = [
    { value: 'BOX', label: 'Caja con blisters o unidades' },
    { value: 'BLISTERPACK', label: 'Blíster suelto' },
    { value: 'UNIT', label: 'Unidades individuales' },
  ];

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    const productData = this.product();
    const group: any = {};
    this.basicFields.forEach(field => {
        const initialValue = productData ? productData[field.name as keyof Product] : (field.type === 'checkbox' ? false : null);
        group[field.name] = this.fb.control(initialValue, field.validators || []);
    });

    const presentationsFGs = productData?.presentations?.map(p => this.createPresentationGroup(p)) || [this.createPresentationGroup()];

    this.addProductForm = this.fb.group({
      ...group,
      presentations: this.fb.array(presentationsFGs)
    });

    if (this.isEditMode()) {
        this.addProductForm.addControl('id', this.fb.control(productData?.id));
    }

    if (this.isReadOnly()) {
      this.addProductForm.disable();
    }
  }

  createPresentationGroup(presentation?: any): FormGroup {
    return this.fb.group({
      type: [presentation?.type || 'BOX', Validators.required],
      description: [presentation?.description || '', Validators.required],
      conversionFactor: [presentation?.conversionFactor || 1, [Validators.required, Validators.min(1)]],
      salePrice: [presentation?.salePrice || null, [Validators.required, Validators.min(0)]],
      allowsSale: [presentation?.allowsSale ?? true]
    });
  }

  get presentations(): FormArray {
    return this.addProductForm.get('presentations') as FormArray;
  }

  addPresentation() {
    this.presentations.push(this.createPresentationGroup());
  }

  removePresentation(index: number) {
    this.presentations.removeAt(index);
  }

  fieldGroups = computed(() => {
    const f = this.basicFields;
    const groups = [];
    for (let i = 0; i < f.length; i += 2) {
      groups.push(f.slice(i, i + 2));
    }
    return groups;
  });

  onSubmit() {
    this.addProductForm.markAllAsTouched();
    if (this.addProductForm.valid) {
      const product: Product = this.addProductForm.value;
      
      const operation = this.isEditMode()
        ? this.productService.update(product)
        : this.productService.save(product);

      operation.subscribe((res) => {
        console.log(res);
        const closeFn = this.onClose();
        if (closeFn) {
          closeFn({ success: true, data: product });
        }
      });
    }
  }
}
