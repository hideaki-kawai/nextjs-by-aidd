/**
 * ページネーション用の型
 */
export interface PaginationParams {
  page: number;
  limit: number;
  totalItems?: number;
  totalPages?: number;
}
