import { EXPENSE_CATEGORIES } from '../../constants';
import { generateYearOptions } from '../../utils';
import './ExpenseFilters.css';

const ExpenseFilters = ({ filter, onFilterChange, onClearFilters, onExportCSV }) => {
  const years = generateYearOptions();

  const handleFilterChange = (field, value) => {
    onFilterChange({ ...filter, [field]: value });
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
      
      <input
        type="date"
        value={filter.fromDate}
        onChange={(e) => handleFilterChange('fromDate', e.target.value)}
      />
      
      <input
        type="date"
        value={filter.toDate}
        onChange={(e) => handleFilterChange('toDate', e.target.value)}
      />
      
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