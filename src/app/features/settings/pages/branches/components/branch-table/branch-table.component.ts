import { Component, EventEmitter, Output, input } from '@angular/core';
import { Branch } from '../../../../../../domain/branches/models/branch.model';


@Component({
    selector: 'app-branch-table',
    imports: [],
    templateUrl: './branch-table.component.html',
    styleUrl: './branch-table.component.css'
})
export class BranchTableComponent {

    tableHeaders = ['Name', 'Address', 'Phone', 'Status', 'Actions'];

    branchesList = input.required<Branch[]>();

    @Output() edit = new EventEmitter<Branch>();
    @Output() view = new EventEmitter<Branch>();

    onEdit(branch: Branch) {
        this.edit.emit(branch);
    }

    onView(branch: Branch) {
        this.view.emit(branch);
    }
}
