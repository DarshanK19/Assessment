import { useState, useEffect } from "react";
import { EXPENSE_CATEGORIES } from "../../constants";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSubmit, editExpense, onCancel }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editExpense) {
      setForm({
        amount: editExpense.amount.toString(),
        category: editExpense.category,
        description: editExpense.description || "",
        date: editExpense.date,
      });
    } else {
      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    }
    setErrors({});
  }, [editExpense]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.amount || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!form.category) {
      newErrors.category = "Please select a category";
    }

    if (!form.date) {
      newErrors.date = "Please select a date";
    } else if (new Date(form.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (form.description && form.description.length > 100) {
      newErrors.description = "Description must be less than 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateForm()) return;

    onSubmit({ ...form, amount: parseFloat(form.amount) });
    if (!editExpense) {
      setForm({ amount: "", category: "", description: "", date: "" });
    }
    setErrors({});
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form" noValidate>
      <div className="input-group">
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          step="0.01"
          className={errors.amount ? "error" : ""}
        />
        {errors.amount && (
          <span className="error-message">{errors.amount}</span>
        )}
      </div>

      <div className="input-group">
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className={errors.category ? "error" : ""}
        >
          <option value="">Select Category</option>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error-message">{errors.category}</span>
        )}
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={errors.description ? "error" : ""}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="input-group">
        <input
          type="date"
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className={errors.date ? "error" : ""}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <button type="submit">{editExpense ? "Update" : "Add"} Expense</button>
      {editExpense && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
