import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS, DATE_FORMATS } from "../../constants";
import { processChartData, formatDate, formatCurrency } from "../../utils";
import "./ExpenseChart.css";

const ExpenseChart = ({ expenses }) => {
  const categoryData = processChartData.categoryData(expenses);
  const monthlyData = processChartData.monthlyData(expenses);

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const barData = Object.entries(monthlyData)
    .map(([month, amount], index) => ({
      month: formatDate(month + "-01", DATE_FORMATS.CHART_MONTH),
      amount,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }))
    .sort(
      (a, b) =>
        new Date(a.month + " 01, 2000").getTime() -
        new Date(b.month + " 01, 2000").getTime()
    );

  return (
    <div className="expense-chart">
      <div className="chart-container">
        <h3>Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              angle={0}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Amount"]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
