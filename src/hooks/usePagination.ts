import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  pageSize?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  paginatedData: T[];

  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;

  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
}

const usePagination = <T>({
  data,
  pageSize: initialPageSize = 10,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalItems = data.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Current page used for rendering
  const activePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  }, [data, activePage, pageSize]);

  const goToPage = (page: number) => {
    const validPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    goToPage(activePage + 1);
  };

  const previousPage = () => {
    goToPage(activePage - 1);
  };

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    setCurrentPage(1);
  };

  return {
    paginatedData,

    currentPage: activePage,

    totalPages,

    totalItems,

    pageSize,

    hasNextPage: activePage < totalPages,

    hasPreviousPage: activePage > 1,

    goToPage,

    nextPage,

    previousPage,

    setPageSize,
  };
};

export default usePagination;
