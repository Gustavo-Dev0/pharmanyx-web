import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type Status = 'any' | 'active' | 'inactive';

export interface BranchFiltersInterface {
    query: string;
    status: Status;
}

@Component({
    selector: 'app-branch-filters',
    imports: [CommonModule, FormsModule],
    templateUrl: './branch-filters.component.html',
    styleUrl: './branch-filters.component.css',
})
export class BranchFiltersComponent {
    // estado local con Signals
    query = signal('');
    status = signal<Status>('any');

    filtersChange = output<BranchFiltersInterface>();

    private debounceTimer: ReturnType<typeof setTimeout> | null = null;
    private readonly DEBOUNCE_MS = 250;

    private emitFilters() {
        this.filtersChange.emit({
            query: this.query(),
            status: this.status(),
        });
    }

    onInputChange() {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.emitFilters();
            this.debounceTimer = null;
        }, this.DEBOUNCE_MS);
    }

    onFilterChange() {
        this.applyNow();
    }

    applyNow() {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.emitFilters();
    }

    reset() {
        this.query.set('');
        this.status.set('any');
        this.applyNow();
    }
}
