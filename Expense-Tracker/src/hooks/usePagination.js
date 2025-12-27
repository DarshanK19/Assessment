import { useState, useMemo } from 'react';
import { PAGINATION } from '../constants';

export const usePagination = (data, itemsPerPage = PAGINATION.ITEMS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);
    
    return {
      items: paginatedItems,
      totalPages,
      currentPage,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    };
  }, [data, currentPage, itemsPerPage]);
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)));
  };
  
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  
  return {
    ...paginationData,
    goToPage,
    nextPage,
    prevPage
  };
};