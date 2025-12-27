import { useState } from 'react';
import { formatDate, formatCurrency } from '../../utils';
import { usePagination } from '../../hooks/usePagination';
import { DATE_FORMATS } from '../../constants';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete, selectedExpenses, onSelectionChange, onBulkDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    if (sortConfig.key === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortConfig.key === 'amount') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  const { items: paginatedExpenses, ...pagination } = usePagination(sortedExpenses);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleSelectAll = (e) => {
    const newSelection = e.target.checked 
      ? paginatedExpenses.map(exp => exp.id)
      : [];
    onSelectionChange(newSelection);
  };

  const handleSelectExpense = (id) => {
    const newSelection = selectedExpenses.includes(id)
      ? selectedExpenses.filter(expId => expId !== id)
      : [...selectedExpenses, id];
    onSelectionChange(newSelection);
  };

  const isAllSelected = paginatedExpenses.length > 0 && 
    paginatedExpenses.every(exp => selectedExpenses.includes(exp.id));

  return (
    <div className="expense-table-container">
      {selectedExpenses.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedExpenses.length} selected</span>
          <button onClick={onBulkDelete} className="bulk-delete-btn">
            Delete Selected
          </button>
        </div>
      )}
      
      <table className="expense-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => handleSort('date')} className="sortable">
              Date {getSortIcon('date')}
            </th>
            <th onClick={() => handleSort('category')} className="sortable">
              Category {getSortIcon('category')}
            </th>
            <th>Description</th>
            <th onClick={() => handleSort('amount')} className="sortable">
              Amount {getSortIcon('amount')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedExpenses.map(expense => (
            <tr key={expense.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedExpenses.includes(expense.id)}
                  onChange={() => handleSelectExpense(expense.id)}
                />
              </td>
              <td>{formatDate(expense.date, DATE_FORMATS.DISPLAY)}</td>
              <td>
                <span className="category-badge">{expense.category}</span>
              </td>
              <td>{expense.description}</td>
              <td className="amount">{formatCurrency(expense.amount)}</td>
              <td className="actions">
                <button onClick={() => onEdit(expense)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => onDelete(expense.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={pagination.prevPage}
            disabled={!pagination.hasPrev}
          >
            Previous
          </button>
          <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
          <button 
            onClick={pagination.nextPage}
            disabled={!pagination.hasNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;