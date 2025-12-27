import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useExpenseFilters, useExpenseStats } from './hooks/useExpenseFilters';
import { exportToCSV } from './utils';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseFilters from './components/ExpenseFilters/ExpenseFilters';
import ExpenseSummary from './components/ExpenseSummary/ExpenseSummary';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseChart from './components/ExpenseChart/ExpenseChart';
import './App.css';

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [filter, setFilter] = useState({ category: '', fromDate: '', toDate: '', year: '' });
  const [editExpense, setEditExpense] = useState(null);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  const filteredExpenses = useExpenseFilters(expenses, filter);
  const { total, count } = useExpenseStats(filteredExpenses);

  const handleAddExpense = (expense) => {
    if (editExpense) {
      setExpenses(expenses.map(exp => 
        exp.id === editExpense.id ? { ...expense, id: editExpense.id } : exp
      ));
      setEditExpense(null);
    } else {
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    }
  };

  const handleEditExpense = (expense) => {
    setEditExpense(expense);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleBulkDelete = () => {
    setExpenses(expenses.filter(exp => !selectedExpenses.includes(exp.id)));
    setSelectedExpenses([]);
  };

  const handleCancelEdit = () => {
    setEditExpense(null);
  };

  const handleClearFilters = () => {
    setFilter({ category: '', fromDate: '', toDate: '', year: '' });
  };

  const handleExportCSV = () => {
    exportToCSV(filteredExpenses);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      
      <ExpenseForm 
        onSubmit={handleAddExpense}
        editExpense={editExpense}
        onCancel={handleCancelEdit}
      />

      <div className="summary-filters-container">
        <ExpenseSummary total={total} count={count} />
        <ExpenseFilters
          filter={filter}
          onFilterChange={setFilter}
          onClearFilters={handleClearFilters}
          onExportCSV={handleExportCSV}
        />
      </div>

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
        selectedExpenses={selectedExpenses}
        onSelectionChange={setSelectedExpenses}
        onBulkDelete={handleBulkDelete}
      />

      {expenses.length > 0 && <ExpenseChart expenses={filteredExpenses} />}
    </div>
  );
}

export default App;
