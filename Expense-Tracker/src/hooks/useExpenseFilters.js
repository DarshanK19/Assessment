import { useMemo } from 'react';

export const useExpenseFilters = (expenses, filters) => {
  return useMemo(() => {
    return expenses.filter(expense => {
      const categoryMatch = !filters.category || expense.category === filters.category;
      const dateMatch = !filters.date || expense.date === filters.date;
      const yearMatch = !filters.year || expense.date.startsWith(filters.year);
      
      return categoryMatch && dateMatch && yearMatch;
    });
  }, [expenses, filters]);
};

export const useExpenseStats = (expenses) => {
  return useMemo(() => ({
    total: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    count: expenses.length
  }), [expenses]);
};