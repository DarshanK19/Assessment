import { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../../constants';
import { generateYearOptions } from '../../utils';
import './ExpenseFilters.css';

const ExpenseFilters = ({ filter, onFilterChange, onClearFilters, onExportCSV }) => {
  const years = generateYearOptions();
  const [errors, setErrors] = useState({});

  const validateDateRange = (fromDate, toDate) => {
    const newErrors = {};
    
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      newErrors.dateRange = 'From date cannot be later than To date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFilterChange = (field, value) => {
    const newFilter = { ...filter, [field]: value };
    
    if (field === 'fromDate' || field === 'toDate') {
      validateDateRange(newFilter.fromDate, newFilter.toDate);
    }
    
    onFilterChange(newFilter);
  };

  return (
    <div className="expense-filters">
      <select
        value={filter.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {EXPENSE_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <div className="date-filter-group">
        <label>From Date:</label>
        <input
          type="date"
          value={filter.fromDate}
          onChange={(e) => handleFilterChange('fromDate', e.target.value)}
          className={errors.dateRange ? 'error' : ''}
        />
      </div>
      
      <div className="date-filter-group">
        <label>To Date:</label>
        <input
          type="date"
          value={filter.toDate}
          onChange={(e) => handleFilterChange('toDate', e.target.value)}
          className={errors.dateRange ? 'error' : ''}
        />
      </div>
      
      {errors.dateRange && (
        <span className="error-message date-range-error">{errors.dateRange}</span>
      )}
      
      <select
        value={filter.year}
        onChange={(e) => handleFilterChange('year', e.target.value)}
      >
        <option value="">All Years</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      
      <button onClick={onClearFilters}>Clear Filters</button>
      <button onClick={onExportCSV}>Export CSV</button>
    </div>
  );
};

export default ExpenseFilters;