import { Component, computed, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Branch } from '../../../../../../domain/branches/models/branch.model';
import { BranchService } from '../../../../../../domain/branches/services/branch.service';
import { ResultModal } from '../../../../../../shared/components/modal/modal';

@Component({
    selector: 'app-branch-form',
    imports: [ReactiveFormsModule],
    templateUrl: './branch-form.component.html',
    styleUrl: './branch-form.component.css'
})
export class BranchFormComponent {
    branchForm!: FormGroup;
    onClose = input<(result: ResultModal) => void>();
    branch = input<Branch | undefined>();
    isReadOnly = input<boolean>(false);
    isEditMode = computed(() => !!this.branch());

    formFields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter branch name', validators: [Validators.required] },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter branch address', validators: [Validators.required] },
        { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Enter phone number', validators: [Validators.required] },
        { name: 'status', label: 'Status', type: 'select', placeholder: 'Select status', options: ['Active', 'Inactive'], validators: [Validators.required] }
    ];

    constructor(private fb: FormBuilder, private branchService: BranchService) { }

    ngOnInit() {
        const branchData = this.branch();
        const group: any = {};

        this.formFields.forEach(field => {
            const initialValue = branchData ? branchData[field.name as keyof Branch] : null;
            group[field.name] = this.fb.control(initialValue, field.validators || []);
        });

        this.branchForm = this.fb.group(group);

        if (this.isEditMode()) {
            this.branchForm.addControl('id', this.fb.control(branchData?.id));
        }

        if (this.isReadOnly()) {
            this.branchForm.disable();
        }
    }

    fieldGroups = computed(() => {
        const f = this.formFields;
        const groups = [];
        for (let i = 0; i < f.length; i += 2) {
            groups.push(f.slice(i, i + 2));
        }
        return groups;
    });

    onSubmit() {
        this.branchForm.markAllAsTouched();
        if (this.branchForm.valid) {
            const branch: Branch = this.branchForm.value;

            const operation = this.isEditMode()
                ? this.branchService.update(branch)
                : this.branchService.save(branch);

            operation.subscribe((res) => {
                console.log(res);
                const closeFn = this.onClose();
                if (closeFn) {
                    closeFn({ success: true, data: branch });
                }
            });
        }
    }
}
