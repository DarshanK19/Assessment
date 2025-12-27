export const formatDate = (dateString, format) => {
  return new Date(dateString).toLocaleDateString('en-GB', format);
};

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export const generateYearOptions = (count = 5) => {
  const currentYear = new Date().getFullYear();
  return Array.from({length: count}, (_, i) => currentYear - i);
};

export const exportToCSV = (data, filename = 'expenses.csv') => {
  const csv = 'Date,Category,Description,Amount\\n' + 
    data.map(item => `${item.date},${item.category},${item.description},${item.amount}`).join('\\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const processChartData = {
  categoryData: (expenses) => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  },
  
  monthlyData: (expenses) => {
    return expenses.reduce((acc, expense) => {
      const month = expense.date.substring(0, 7);
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {});
  }
};