import { formatCurrency } from '../../utils';
import './ExpenseSummary.css';

const ExpenseSummary = ({ total, count }) => {
  return (
    <div className="expense-summary">
      <h2>{formatCurrency(total)}</h2>
      <p>{count} {count === 1 ? 'expense' : 'expenses'}</p>
    </div>
  );
};

export default ExpenseSummary;