# Expense Tracker

A modern React-based expense tracking application with data visualization, filtering, and export capabilities.

## Features

- **Expense Management** - Add, edit, and delete expense entries
- **Advanced Filtering** - Filter by category, date range, and year
- **Data Visualization** - Interactive pie and bar charts
- **Pagination** - Handle large datasets efficiently (5 items per page)
- **Bulk Operations** - Select and delete multiple expenses
- **CSV Export** - Export filtered data with totals
- **Data Persistence** - Local storage for data retention
- **Responsive Design** - Works on all device sizes
- **Form Validation** - Custom validation with error messages
- **Modern UI** - Beautiful gradients and smooth animations

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## Build & Deploy

### Development

```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
```

### Production

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

## Tech Stack

### Core Dependencies

| Package   | Version | Purpose             |
| --------- | ------- | ------------------- |
| React     | ^19.2.0 | UI Library          |
| React DOM | ^19.2.0 | DOM Rendering       |
| Recharts  | ^3.6.0  | Chart Visualization |

### Development Tools

| Package              | Version | Purpose                 |
| -------------------- | ------- | ----------------------- |
| Vite                 | ^7.2.4  | Build Tool & Dev Server |
| ESLint               | ^9.39.1 | Code Linting            |
| @vitejs/plugin-react | ^5.1.1  | React Support for Vite  |

## Project Architecture

```
src/
├── components/              # UI Components
│   ├── ExpenseForm/        # Add/Edit expense form
│   ├── ExpenseFilters/     # Filter controls
│   ├── ExpenseList/        # Data table with pagination
│   ├── ExpenseSummary/     # Statistics display
│   └── ExpenseChart/       # Data visualization
├── hooks/                  # Custom React Hooks
│   ├── useLocalStorage.js  # Persistent storage
│   ├── useExpenseFilters.js # Filtering logic
│   └── usePagination.js    # Pagination state
├── utils/                  # Utility Functions
│   └── index.js           # Helpers & formatters
├── constants/              # App Constants
│   └── index.js           # Categories, colors, config
└── App.jsx                # Main application
```

## Key Features Explained

### Expense Management

- **Add Expenses**: Form with validation for amount, category, description, and date
- **Edit Expenses**: Click edit button to modify existing entries
- **Delete Expenses**: Individual or bulk deletion options

### Advanced Filtering

- **Category Filter**: Filter by expense categories
- **Date Range Filter**: From date to to date filtering
- **Year Filter**: Quick year-based filtering
- **Real-time Updates**: Filters apply instantly

### Data Visualization

- **Category Pie Chart**: Visual breakdown by expense categories
- **Monthly Bar Chart**: Spending trends over time
- **Interactive Charts**: Hover for detailed information

### Export Functionality

- **CSV Export**: Download filtered data as CSV
- **Total Calculation**: Automatic total included in export
- **Proper Formatting**: Comma-separated values with quotes

## Design System

### Color Palette

- **Primary Buttons**: Coral to burgundy gradient
- **Category Badges**: Blue gradient (light to dark)
- **Summary Cards**: Pink gradient
- **Background**: Blue gradient overlay

### Typography

- **Font Stack**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **iOS Compatibility**: 16px minimum font size for mobile
- **Responsive Scaling**: Adaptive font sizes

## Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 60+     |
| Firefox | 60+     |
| Safari  | 12+     |
| Edge    | 79+     |

## Development Patterns

### Component Structure

- **Folder-per-Component**: Each component in its own directory
- **Co-location**: Component, styles, and logic together
- **Custom Hooks**: Reusable stateful logic

### State Management

- **Local State**: Component-specific state
- **Lifted State**: Shared state in App component
- **Custom Hooks**: Complex logic abstraction

### Performance Optimizations

- **Memoization**: useMemo for expensive calculations
- **Pagination**: Limit rendered items
- **Efficient Filtering**: Optimized filter algorithms

## Error Handling

- **Form Validation**: Real-time validation with custom messages
- **Date Validation**: Prevent future dates and invalid ranges
- **Input Sanitization**: Proper data formatting and validation
- **User Feedback**: Clear error messages and visual indicators

## Accessibility

- **Semantic HTML**: Proper HTML structure
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color combinations

## Future Enhancements

- User authentication
- Cloud data synchronization
- Budget tracking and alerts
- Receipt photo uploads
- Advanced reporting
- Multi-currency support
- Dark mode theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Built with React and Vite**
