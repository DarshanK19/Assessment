import { useMemo } from 'react';

export const useExpenseFilters = (expenses, filters) => {
  return useMemo(() => {
    return expenses.filter(expense => {
      const categoryMatch = !filters.category || expense.category === filters.category;
      
      const fromDateMatch = !filters.fromDate || expense.date >= filters.fromDate;
      const toDateMatch = !filters.toDate || expense.date <= filters.toDate;
      
      const yearMatch = !filters.year || expense.date.startsWith(filters.year);
      
      return categoryMatch && fromDateMatch && toDateMatch && yearMatch;
    });
  }, [expenses, filters]);
};

export const useExpenseStats = (expenses) => {
  return useMemo(() => ({
    total: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    count: expenses.length
  }), [expenses]);
};