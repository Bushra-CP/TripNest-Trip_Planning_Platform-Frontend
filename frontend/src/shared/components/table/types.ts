import React from "react";

export type TableColumn<T> = {
  key: string;

  title: string;

  width?: string;

  align?: "left" | "center" | "right";

  render: (row: T) => React.ReactNode;
};

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;

  onPageChange: (page: number) => void;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];

  data: T[];

  loading?: boolean;

  selectable?: boolean;

  emptyMessage?: string;

  pagination?: PaginationProps;
}
