export class Paginacao<TEntity> {
    currentPage: number = 1;
    itemsPerPage: number = 5;
    firstPageUrl?: string;
    lastPageUrl?: string;
    previousPageUrl?: string;
    nextPageUrl?: string;
    currentPageUrl?: string;
    totalItems: number = 0;
    totalPages: number = 0;
    orderByColumn?: string;
    orderByDirection?: number = 0;
    collection: TEntity[] = [];
}