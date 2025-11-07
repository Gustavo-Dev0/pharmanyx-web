import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class PaginationComponent {
  currentPage = input<number>(1);
  totalItems = input<number>(0);
  itemsPerPage = input<number>(20);
  pageChange = output<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
