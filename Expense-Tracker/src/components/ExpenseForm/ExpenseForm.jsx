import { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../../constants';
import './ExpenseForm.css';

const ExpenseForm = ({ onSubmit, editExpense, onCancel }) => {
  const [form, setForm] = useState(editExpense || { 
    amount: '', 
    category: '', 
    description: '', 
    date: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    
    onSubmit({ ...form, amount: parseFloat(form.amount) });
    setForm({ amount: '', category: '', description: '', date: '' });
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        step="0.01"
        required
      />
      <select
        value={form.category}
        onChange={(e) => handleChange('category', e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {EXPENSE_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => handleChange('date', e.target.value)}
        required
      />
      <button type="submit">
        {editExpense ? 'Update' : 'Add'} Expense
      </button>
      {editExpense && (
        <button type="button" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
};

export default ExpenseForm;