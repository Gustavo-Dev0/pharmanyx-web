import { Component, signal } from '@angular/core';
import { BranchFiltersComponent, BranchFiltersInterface } from './components/branch-filters/branch-filters.component';
import { BranchTableComponent } from './components/branch-table/branch-table.component';
import { Button } from '../../../../shared/components/button/button';
import { Dialog } from '../../../../core/services/dialog';
import { BranchFormComponent } from './components/branch-form/branch-form.component';
import { Branch } from '../../../../domain/branches/models/branch.model';
import { BranchService } from '../../../../domain/branches/services/branch.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-branches',
  imports: [BranchFiltersComponent, BranchTableComponent, Button, PaginationComponent],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent {

  branchesList = signal<Branch[]>([]);
  currentPage = signal(1);
  totalItems = signal(0);
  itemsPerPage = signal(20);
  filters = signal<BranchFiltersInterface | undefined>(undefined);

  constructor(private dialog: Dialog, private branchService: BranchService, private toastService: ToastService) { }

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    const filterData = this.filters();
    this.branchService.getAll(filterData?.query, filterData?.status, this.currentPage()).subscribe((response) => {
      this.branchesList.set(response.content);
      this.totalItems.set(response.totalElements);
      this.itemsPerPage.set(response.pageable.pageSize);
    });
  }

  async onAddBranch() {
    const result = await this.dialog.open(BranchFormComponent, "Add Branch");
    if (result.success) {
      this.loadBranches();
      this.toastService.success("Branch added successfully");
    }
  }

  async onEditBranch(branch: Branch) {
    const result = await this.dialog.open(BranchFormComponent, "Edit Branch", { branch });
    if (result.success) {
      this.loadBranches();
      this.toastService.success(`Branch ${result.data.name} updated successfully`);
    }
  }

  async onViewBranch(branch: Branch) {
    console.log(branch);
    await this.dialog.open(BranchFormComponent, "View Branch", { branch, isReadOnly: true });
  }

  onFiltersChange(filters: BranchFiltersInterface) {
    this.filters.set(filters);
    this.currentPage.set(1);
    this.loadBranches();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadBranches();
  }
}
