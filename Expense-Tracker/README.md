# Expense Tracker

A modern React-based expense tracking application with data visualization, filtering, and export capabilities.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Packages Used

### Core Dependencies
- **React** (^19.2.0) - UI library
- **React DOM** (^19.2.0) - DOM rendering
- **Recharts** (^3.6.0) - Chart visualization library

### Development Dependencies
- **Vite** (^7.2.4) - Build tool and dev server
- **ESLint** (^9.39.1) - Code linting
- **@vitejs/plugin-react** (^5.1.1) - React plugin for Vite

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Component Structure & Design Decisions

### Project Structure
```
src/
├── components/           # UI Components (each in own folder)
│   ├── ExpenseForm/     # Form for adding/editing expenses
│   ├── ExpenseFilters/  # Filter controls (category, date, year)
│   ├── ExpenseList/     # Table with pagination & bulk actions
│   ├── ExpenseSummary/  # Total amount & count display
│   └── ExpenseChart/    # Data visualization (pie & bar charts)
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.js    # Persistent storage hook
│   ├── useExpenseFilters.js  # Filtering & stats logic
│   └── usePagination.js      # Pagination state management
├── utils/               # Pure utility functions
│   └── index.js         # Date formatting, CSV export, data processing
├── constants/           # Application constants
│   └── index.js         # Categories, colors, configurations
└── App.jsx             # Main application component
```

### Design Reasoning

1. **Component Organization**
   - **Folder-per-Component**: Each component has its own folder with JSX, CSS, and index.js
   - **Co-location**: Related files (component + styles) kept together
   - **Single Responsibility**: Each component handles one specific feature

2. **Custom Hooks Strategy**
   - **useLocalStorage**: Encapsulates localStorage logic with React state sync
   - **useExpenseFilters**: Memoized filtering logic to prevent unnecessary re-calculations
   - **usePagination**: Reusable pagination logic with navigation controls

3. **Utility Functions**
   - **Pure Functions**: No side effects, easily testable
   - **Single Responsibility**: Each function has one clear purpose
   - **Reusability**: Used across multiple components

4. **State Management**
   - **Local State**: Component-specific state (forms, pagination)
   - **Lifted State**: Shared state in App component
   - **Custom Hooks**: Complex state logic abstracted into reusable hooks

5. **Performance Optimizations**
   - **useMemo**: Expensive calculations (filtering, chart data processing)
   - **Pagination**: Render only 5 items at a time
   - **Memoized Filters**: Prevent unnecessary re-filtering on every render

### Key Benefits
- **Maintainability**: Clear separation of concerns, easy to locate and modify code
- **Reusability**: Custom hooks and utilities can be used across components
- **Testability**: Pure functions and isolated components are easy to test
- **Scalability**: Structure supports adding new features without major refactoring
- **Performance**: Optimized rendering and data processing