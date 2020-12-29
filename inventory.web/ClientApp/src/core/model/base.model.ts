export interface MvGetOptions {

    pagination?: MvPagination;
    filter?: MvFilter[];
}

export interface MvPagination {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    sortBy?: string;
}

export interface MvFilter {
    field: string;
    value: string;
    operator?: string | 'equals';
}

export interface MvPostOptions<T> {

    // (data?: T): void;
    data: T;
    pagination?: MvPagination;
    filter?: MvFilter[];
}

export interface MvGetPost {
    data: object;
    pagination?: MvPagination;
    filter?: MvFilter[];
}