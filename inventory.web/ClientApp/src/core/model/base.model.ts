import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface MvPagination {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    sortBy?: string;
    SortOrder?: string;
}

export interface MvFilter {
    field: string;
    value: string;
    operator?: string | 'equals';
}

// export interface MvPostOptions<T> {
//     // (data?: T): void;
//     data: T;
//     pagination?: MvPagination;
//     filter?: MvFilter[];
// }

// export interface MvGetPost {
//     data: object;
//     pagination?: MvPagination;
//     filter?: MvFilter[];
// }

export interface MvHttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {};
}