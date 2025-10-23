import { Component, computed, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  addProductForm!: FormGroup;


  fields = signal([
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
      name: 'requirePrescription',
      label: 'Require Prescription',
      type: 'checkbox',
      placeholder: 'Require Prescription',
      Validators: [Validators.required],
    },
    {
      name: 'presentations',
      label: 'Presentations',
      type: 'array',
      placeholder: 'Enter presentations',
      Validators: [Validators.minLength(1)],
    }

  ]);

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    console.log(this.addProductForm);
    const group: any = {};
    this.fields().forEach(field => {
      if (field.type === 'array') {
        group[field.name] = this.fb.array([
          this.fb.group({
            description: ['', Validators.required],
            conversionFactor: ['', Validators.required],
            salePrice: ['', Validators.required],
            status: ['', Validators.required],
          })
        ]);
      } else {
        group[field.name] = this.fb.control('', field.Validators || []);
      }
    });
    this.addProductForm = this.fb.group(group);
    console.log(this.addProductForm.controls);
  }

  addPresentation() {
    const group = this.fb.group({
            description: ['', Validators.required],
            conversionFactor: ['', Validators.required],
            salePrice: ['', Validators.required],
            status: ['', Validators.required],
          });
    this.presentationsArray.push(group);
  }

  removePresentation(index: number) {
    (this.addProductForm.get('presentations') as FormArray).removeAt(index);
  }

  fieldGroups = computed(() => {
    const f = this.fields();
    const groups = [];
    for (let i = 0; i < f.length; i += 2) {
      groups.push(f.slice(i, i + 2));
    }
    return groups;
  });

  get presentationsArray(): FormArray {
    return this.addProductForm.get('presentations') as FormArray;
  }

  presentationsField = computed(() =>
    this.fields().find(f => f.type === 'array')
  );



  onSubmit() {
    if (this.addProductForm.valid) {
      console.log(this.addProductForm.value);
    }
  }
}

