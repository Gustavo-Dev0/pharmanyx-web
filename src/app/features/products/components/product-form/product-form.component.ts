import { Component, computed, input, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  presentationType = signal<'BOX' | 'BLISTERPACK' | 'UNIT'>('BOX');
  addProductForm!: FormGroup;
  onClose = input<(result: ResultModal) => void>();


  basicFields = [
    {
      name: 'code',
      label: 'Code',
      type: 'text',
      placeholder: 'Enter product code',
      Validators: [Validators.required]
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter product name',
      Validators: [Validators.required]
    },
    {
      name: 'laboratory',
      label: 'Laboratory',
      type: 'text',
      placeholder: 'Enter laboratory name',
      Validators: [Validators.required]
    },
    {
      name: 'sanitaryRegistration',
      label: 'Sanitary Registration',
      type: 'text',
      placeholder: 'Enter sanitary registration',
      Validators: [Validators.required]
    },
    {
      name: 'purchasePrice',
      label: 'Purchase Price',
      type: 'number',
      placeholder: 'Enter purchase price',
      Validators: [Validators.required]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
      options: ['Active', 'Inactive'],
      Validators: [Validators.required],
    },
    {
      name: 'requiresPrescription',
      label: 'Require Prescription',
      type: 'checkbox'
    },
    {
      name: 'presentations',
      label: 'Presentations',
      type: 'array',
      placeholder: 'Enter presentations',
      Validators: [Validators.minLength(1)],
    }

  ];


  /* presentations: any[] = [
    {
      name: 'box',
      label: 'Box',
      fields: [
        {
          name: 'enabled',
          label: 'Allow Sale',
          type: 'checkbox',
          Validators: [Validators.required]
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          placeholder: 'Enter price',
          Validators: [Validators.required]
        },
      ]
    },
    {
      name: 'blisterPacks',
      label: 'Blister Packs',
      fields: [
        {
          name: 'enabled',
          label: 'Allow Sale',
          type: 'checkbox',
          Validators: [Validators.required]
        },
        {
          name: 'blisterPackByBox',
          label: 'Blister Pack By Box',
          type: 'number',
          placeholder: 'Enter blister pack by box',
          Validators: [Validators.required]
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          placeholder: 'Enter price',
          Validators: [Validators.required]
        },
      ]
    },
    {
      name: 'units',
      label: 'Units',
      fields: [
        {
          name: 'enabled',
          label: 'Allow Sale',
          type: 'checkbox',
          Validators: [Validators.required]
        },
        {
          name: 'unitBy',
          label: 'Unit By',
          type: 'number',
          placeholder: 'Enter unit by',
          Validators: [Validators.required]
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          placeholder: 'Enter price',
          Validators: [Validators.required]
        }
      ]
    }
  ]; */

  presentationOptions: { value: 'BOX' | 'BLISTERPACK' | 'UNIT'; label: string }[] = [
    { value: 'BOX', label: 'Caja con blisters o unidades' },
    { value: 'BLISTERPACK', label: 'Blíster suelto' },
    { value: 'UNIT', label: 'Unidades individuales' },
  ];

  constructor(private fb: FormBuilder, private productService: ProductService) { }


  ngOnInit() {
    console.log(this.addProductForm);
    const group: any = {};
    this.basicFields.forEach(field => {
      group[field.name] = this.fb.control(field.type === 'checkbox' ? false : null, field.Validators || []);
    });


    this.addProductForm = this.fb.group(group);

    this.addProductForm.addControl('box', this.fb.group({
      enabled: [true],
      price: [null, [Validators.required, Validators.min(0)]],
    }));

    this.addProductForm.addControl('blisterPacks', this.fb.group({
      enabled: [true],
      blisterPackByBox: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
    }));

    this.addProductForm.addControl('units', this.fb.group({
      enabled: [true],
      unitBy: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
    }));

    this.addProductForm.get('box')?.get('enabled')?.valueChanges.subscribe(checked => {
      const price = this.addProductForm.get('box')?.get('price');

      if (checked) {
        price?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        price?.clearValidators();
        price?.reset(null);
      }
      price?.updateValueAndValidity();
    });

    this.addProductForm.get('blisterPacks')?.get('enabled')?.valueChanges.subscribe(checked => {
      const blisterPackByBox = this.addProductForm.get('blisterPacks')?.get('blisterPackByBox');
      const price = this.addProductForm.get('blisterPacks')?.get('price');

      if (checked) {
        blisterPackByBox?.setValidators([Validators.required, Validators.min(0)]);
        price?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        blisterPackByBox?.clearValidators();
        blisterPackByBox?.reset('');
        price?.clearValidators();
        price?.reset(null);
      }
      blisterPackByBox?.updateValueAndValidity();
      price?.updateValueAndValidity();
    });

    this.addProductForm.get('units')?.get('enabled')?.valueChanges.subscribe(checked => {
      const unitBy = this.addProductForm.get('units')?.get('unitBy');
      const price = this.addProductForm.get('units')?.get('price');

      if (checked) {
        unitBy?.setValidators([Validators.required, Validators.min(0)]);
        price?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        unitBy?.clearValidators();
        unitBy?.reset(null);
        price?.clearValidators();
        price?.reset(null);
      }
      unitBy?.updateValueAndValidity();
      price?.updateValueAndValidity();
    });

    console.log(this.addProductForm.value);
  }

  fieldGroups = computed(() => {
    const f = this.basicFields;
    const groups = [];
    for (let i = 0; i < f.length; i += 2) {
      groups.push(f.slice(i, i + 2));
    }
    return groups;
  });

  changedPresentationType(type: 'BOX' | 'BLISTERPACK' | 'UNIT') {
    this.presentationType.set(type);
  }

  presentationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const box = control.get('box');
    const blisterPacks = control.get('blisterPacks');
    const units = control.get('units');

    /* if (box?.get('enabled')?.value || blisterPacks?.get('enabled')?.value || units?.get('enabled')?.value) {

    } else {
      return { presentationValidator: true }
    } */



    if (box?.valid && blisterPacks?.valid && units?.valid) {
      return null;
    } else {
      return { priceByPresentation: true };
    }
  }


  onSubmit() {
    console.log(this.addProductForm.value);
    this.addProductForm.markAllAsTouched();
    if (this.addProductForm.valid) {
      console.log("VALIDO");
      console.log(this.addProductForm.value);

      const product: Product = {
        ...this.addProductForm.value,
      }

      product.presentations = [];

      if (this.presentationType() === 'BOX') {
        product.presentations.push({
          type: 'BOX',
          conversionFactor: 1,
          salePrice: this.addProductForm.get('box')?.get('price')?.value?? 0,
          allowsSale: this.addProductForm.get('box')?.get('enabled')?.value,
        })

        product.presentations.push({
          type: 'BLISTERPACK',
          conversionFactor: this.addProductForm.get('blisterPacks')?.get('blisterPackByBox')?.value,
          salePrice: this.addProductForm.get('blisterPacks')?.get('price')?.value?? 0,
          allowsSale: this.addProductForm.get('blisterPacks')?.get('enabled')?.value,
        })

        product.presentations.push({
          type: 'UNIT',
          conversionFactor: this.addProductForm.get('units')?.get('unitBy')?.value?? 0,
          salePrice: this.addProductForm.get('units')?.get('price')?.value,
          allowsSale: this.addProductForm.get('units')?.get('enabled')?.value,
        })

      }

      if (this.presentationType() === 'BLISTERPACK') {
        product.presentations.push({
          type: 'BLISTERPACK',
          conversionFactor: 1,
          salePrice: this.addProductForm.get('blisterPacks')?.get('price')?.value,
          allowsSale: this.addProductForm.get('blisterPacks')?.get('enabled')?.value,
        })

        product.presentations.push({
          type: 'UNIT',
          conversionFactor: this.addProductForm.get('units')?.get('unitBy')?.value,
          salePrice: this.addProductForm.get('units')?.get('price')?.value,
          allowsSale: this.addProductForm.get('units')?.get('enabled')?.value
        })
      }

      if (this.presentationType() === 'UNIT') {
        product.presentations.push({
          type: 'UNIT',
          conversionFactor: 1,
          salePrice: this.addProductForm.get('units')?.get('price')?.value,
          allowsSale: this.addProductForm.get('units')?.get('enabled')?.value,
        })
      }

      console.log(product);


      this.productService.save(product).subscribe((res) => {
        console.log(res);
        const closeFn = this.onClose();
        if (closeFn) {
          closeFn({ success: true });
        }
      });

    } else {
      console.log("NO VALIDO");
      const closeFn = this.onClose();
      if (closeFn) {
        closeFn({ success: true });
      }
    }
  }
}

