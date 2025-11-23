import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Branch } from '../models/branch.model';

export interface BranchResponse {
    content: Branch[],
    pageable: {
        pageNumber: number,
        "pageSize": number,
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean
        },
        "offset": number,
        "paged": boolean,
        "unpaged": boolean
    },
    "last": boolean,
    "totalElements": number,
    "totalPages": number,
    "size": number,
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "first": boolean,
    "numberOfElements": number,
    "empty": boolean
}

@Injectable({
    providedIn: 'root',
})
export class BranchService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/branches';

    getAll(query?: string, status?: string, page: number = 1): Observable<BranchResponse> {
        let params = new HttpParams();
        if (query) {
            params = params.append('query', query);
        }
        if (status && status !== 'any') {
            params = params.append('status', status);
        }
        params = params.append('page', (page - 1).toString());
        return this.http.get<BranchResponse>(this.baseUrl, { params });
    }

    getById(id: number): Observable<Branch> {
        return this.http.get<Branch>(`${this.baseUrl}/${id}`);
    }

    save(branch: Branch): Observable<Branch> {
        return this.http.post<Branch>(this.baseUrl, branch);
    }

    update(branch: Branch): Observable<Branch> {
        return this.http.put<Branch>(`${this.baseUrl}/${branch.id}`, branch);
    }

    findByName(name: string): Observable<Branch[]> {
        return this.http.get<Branch[]>(`${this.baseUrl}?name=${name}`);
    }
}
