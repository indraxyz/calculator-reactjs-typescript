# 🧮 Modern Calculator App

A beautiful, secure, and feature-rich calculator built with React 19, TypeScript, Vite, Tailwind CSS v4, and React Router v7. This calculator combines modern design with robust security measures, excellent user experience, optimized code architecture, and multi-page navigation.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?logo=tailwind-css)
![React Router](https://img.shields.io/badge/React_Router-7.9.6-CA4245?logo=react-router)

## ✨ Features

### 🧮 Mathematical Operations

- **Basic Operations**: Addition (+), subtraction (-), multiplication (×), division (/)
- **Percentage Calculations**: Convert numbers to percentages with proper handling
- **Clear Functions**:
  - Clear Entry (CE) - Clear the current entry
  - Clear All (C) - Reset the entire calculator
- **Backspace (⌫)**: Remove last entered digit or character
- **Decimal Support**: Handle decimal numbers with validation
- **Expression History**: Track up to 20 recent calculations with newest items highlighted
- **Real-time Expression Display**: See your full expression as you type

### 🎨 Modern UI/UX Design

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive Animations**:
  - Button ripple effects and hover animations
  - Smooth transitions and scaling effects
  - Pulse animation for latest history items
  - Active button states with visual feedback
- **Loading States**:
  - Skeleton loaders for route transitions
  - Navigation loading indicators
  - Pending state feedback
- **Accessibility**:
  - ARIA labels for screen readers
  - Full keyboard navigation support
  - Focus management
  - Semantic HTML structure
- **Visual Feedback**:
  - Active button states
  - Error highlighting with clear messages
  - Tooltips for long text
  - Color-coded button types
  - Route transition indicators

### 🔒 Security & Validation

- **Input Sanitization**: Prevents XSS attacks and malicious input
- **Expression Validation**: Strict validation of mathematical expressions
- **Overflow Protection**: Prevents number overflow and underflow
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Memory Safety**: Proper event listener and timeout cleanup to prevent memory leaks
- **Safe Evaluation**: Validated expression evaluation with security checks

### ⌨️ Keyboard Support

- **Number Keys**: `0-9` for digit input
- **Operators**: `+`, `-`, `*`, `/` for mathematical operations
- **Special Keys**:
  - `Enter` or `=` for equals
  - `Backspace` for delete (⌫)
  - `Escape`, `Delete`, or `C` for clear all
  - `.` for decimal point
  - `%` for percentage

## 🚀 Getting Started

### Prerequisites

- **Node.js**: version 18 or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd calculator-reactjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The development server will automatically open your browser at `http://localhost:5173` (configured in `vite.config.ts`).

4. **Navigate the application**

   - Home page (`/`) - Feature showcase and introduction
   - Calculator (`/calculator`) - The calculator application

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 🛠️ Technology Stack

### Core Technologies

- **[React 19](https://react.dev/)** - Modern React with latest features and optimizations
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[Vite 6.3.5](https://vitejs.dev/)** - Lightning-fast build tool and development server
- **[Tailwind CSS 4.1.11](https://tailwindcss.com/)** - Utility-first CSS framework with new features
- **[React Router v7.9.6](https://reactrouter.com/)** - Declarative routing with nested routes, error boundaries, lazy loading, and type-safe navigation

### Additional Libraries

- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons
- **ESLint** - Code linting and quality assurance

## 📁 Project Structure

```
calculator-reactjs/
├── src/
│   ├── components/              # React components
│   │   ├── calculator/          # Calculator-specific components
│   │   │   ├── CalculatorButton.tsx
│   │   │   ├── Display.tsx
│   │   │   ├── History.tsx
│   │   │   └── index.ts
│   │   ├── home/                # Home page components
│   │   │   ├── Hero.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── FeatureCardsGrid.tsx
│   │   │   ├── FeaturesList.tsx
│   │   │   └── index.ts
│   │   └── skeletons/           # Loading skeleton components
│   │       ├── HomeSkeleton.tsx
│   │       ├── CalculatorSkeleton.tsx
│   │       └── index.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCalculator.ts     # Main calculator logic
│   │   └── useKeyboard.ts       # Keyboard event handling
│   ├── routes/                  # React Router routes
│   │   ├── _layout.tsx          # Layout component with navigation and footer
│   │   ├── index.tsx            # Home page route
│   │   ├── calculator.tsx       # Calculator route
│   │   └── error.tsx            # Error boundary page
│   ├── lib/                     # Utility libraries
│   │   ├── constants/           # Application constants
│   │   │   ├── buttons.ts       # Button configurations
│   │   │   ├── features.ts      # Feature definitions
│   │   │   └── limits.ts        # Validation limits
│   │   ├── utils/               # Utility functions
│   │   │   ├── calculator.ts    # Expression evaluation
│   │   │   ├── format.ts        # Number formatting
│   │   │   ├── validation.ts    # Input validation
│   │   │   └── index.ts         # Utility exports
│   │   └── env.d.ts             # Environment types
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   ├── main.tsx                 # Application entry point with router
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite type definitions
├── public/                      # Static assets
├── .cursor/                     # Cursor IDE configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

## 🏗️ Architecture

### Component Structure

The application follows a clean, modular architecture:

- **Components**: Reusable UI components with clear responsibilities
  - **Calculator Components**: Display, buttons, and history
  - **Home Components**: Hero, feature cards, and feature lists
  - **Skeleton Components**: Loading states for routes
- **Hooks**: Custom hooks for business logic and state management
- **Utils**: Pure functions for calculations, formatting, and validation
- **Constants**: Centralized configuration, limits, and feature definitions
- **Types**: Shared TypeScript interfaces and types

### Key Design Patterns

- **Custom Hooks**: Encapsulated calculator logic in `useCalculator`
- **Lazy Loading**: Route-based code splitting with Suspense boundaries
- **Skeleton UI**: Loading states with skeleton components for better UX
- **Separation of Concerns**: Clear separation between UI, logic, and utilities
- **Type Safety**: Comprehensive TypeScript types throughout
- **Validation**: Centralized validation utilities
- **Constants**: Magic numbers extracted to named constants
- **Error Boundaries**: Route-level error handling with custom error pages

### Routing (React Router v7)

The project uses React Router v7 for multi-page navigation with the following features:

- **Declarative Routing**: Type-safe routing with full TypeScript support
- **Nested Routes**: Layout component with child routes for organized structure
- **Error Boundaries**: Route-level error handling with custom error page using `ErrorBoundary` component
- **Lazy Loading**: Code splitting with `React.lazy()` and `Suspense` for optimal performance
- **Loading States**: Skeleton loaders and navigation loading indicators
- **Code Splitting**: Optimized bundle splitting for React Router in Vite config
- **Navigation**: Custom navigation bar with active route highlighting and loading states
- **Future Flags**: React Router v7 future flags enabled for latest features
- **Type Safety**: Full TypeScript support for routes and navigation

**Current Routes:**

- `/` - Home page with feature showcase (Hero, FeatureCardsGrid, FeaturesList)
- `/calculator` - Calculator application
- `*` - Error page for invalid routes

**Router Configuration:**

```typescript
// src/main.tsx
const Home = lazy(() => import("@/routes/index"));
const Calculator = lazy(() => import("@/routes/calculator"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      ErrorBoundary: ErrorPage,
      children: [
        {
          index: true,
          Component: HomeWithSuspense,
        },
        {
          path: "calculator",
          Component: CalculatorWithSuspense,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);
```

**Navigation Implementation:**

The layout component includes:

- Navigation bar with active route highlighting using `NavLink`
- Loading indicators during route transitions using `useNavigation()`
- Footer with technology stack information
- Responsive design with glass morphism styling
- Icon-based navigation using Lucide React
- Smooth transitions and hover effects
- Pending state indicators for navigation links

**Lazy Loading & Suspense:**

Routes are lazy-loaded with custom skeleton components:

```typescript
const HomeWithSuspense = () => (
  <Suspense fallback={<HomeSkeleton />}>
    <Home />
  </Suspense>
);

const CalculatorWithSuspense = () => (
  <Suspense fallback={<CalculatorPageSkeleton />}>
    <Calculator />
  </Suspense>
);
```

**Using React Router Hooks:**

```typescript
import {
  useNavigate,
  useLocation,
  useNavigation,
  NavLink,
} from "react-router-dom";

// Get current location
const location = useLocation();
const isActive = location.pathname === "/calculator";

// Navigation state
const navigation = useNavigation();
const isNavigating = navigation.state === "loading";

// Navigation
const navigate = useNavigate();
navigate("/calculator");

// NavLink with active and pending states
<NavLink
  to="/calculator"
  className={({ isActive, isPending }) =>
    isActive ? "active" : isPending ? "pending" : ""
  }
>
  Calculator
</NavLink>;
```

## 🎯 Key Features Explained

### Security Implementation

The calculator implements multiple security layers:

```typescript
// Input sanitization to prevent XSS
const sanitizeText = (text: string, maxLength: number = 50): string => {
  return text.replace(/[<>]/g, "").substring(0, maxLength);
};

// Expression validation with forbidden patterns
const FORBIDDEN_PATTERNS = /eval|Function|constructor|import|require/i;
const validateExpression = (expr: string): boolean => {
  if (FORBIDDEN_PATTERNS.test(expr)) return false;
  // ... additional validation
};
```

### State Management

The calculator uses React hooks for state management:

```typescript
// Custom hook for calculator logic
const {
  displayValue,
  expression,
  history,
  error,
  // ... handlers
} = useCalculator();

// Keyboard support with optimized event handling
useKeyboard({
  clearAll,
  handleOperator,
  // ... other handlers
});
```

### Responsive Design

Mobile-first responsive design with Tailwind CSS:

```typescript
<div className="min-h-screen flex flex-col items-center justify-center
                bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-2">
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl
                  border border-white/20 p-4 md:p-6 w-full max-w-sm">
```

### History Management

Calculation history with visual feedback:

```typescript
// History items with newest highlighted
{history.map((item, idx) => (
  <li className={idx === 0
    ? "bg-blue-50/50 border border-blue-200/50 shadow-sm animate-pulse"
    : "hover:bg-gray-50"
  }>
```

## 🎨 Design System

### Color Palette

- **Primary Background**: Blue gradient (`from-blue-50 via-indigo-50 to-purple-50`)
- **Card Background**: Glass morphism with white transparency (`bg-white/80`)
- **Number Buttons**: Gray gradient (`from-gray-50 to-gray-100`)
- **Operator Buttons**: Blue gradient (`from-blue-500 to-blue-600`)
- **Clear Buttons**: Red gradient (`from-red-500 to-red-600`)
- **Equals Button**: Green gradient (`from-green-500 to-green-600`)
- **Percentage Button**: Purple gradient (`from-purple-500 to-purple-600`)
- **Backspace Button**: Orange gradient (`from-orange-500 to-orange-600`)

### Typography

- **Display**: Bold, large text (text-2xl) for results
- **Expression**: Monospace font (font-mono) for expressions
- **Buttons**: Semibold weight (font-semibold) for clear hierarchy
- **History**: Small monospace (text-xs font-mono) for compact display

### Spacing & Layout

- **Grid System**: 4-column grid for calculator buttons
- **Spacing**: Consistent gap system (gap-2 md:gap-3)
- **Padding**: Responsive padding (p-4 md:p-6)
- **Border Radius**: Rounded corners (rounded-xl, rounded-3xl)

## 🔧 Configuration

### Constants

All configurable values are centralized in constants files:

**Limits** (`src/lib/constants/limits.ts`):

```typescript
export const MAX_DISPLAY_LENGTH = 15;
export const MAX_EXPRESSION_LENGTH = 50;
export const MAX_HISTORY_ITEMS = 20;
export const CALCULATION_DELAY_MS = 50;
export const ERROR_DISPLAY_DURATION_MS = 3000;
export const BUTTON_ACTIVE_DURATION_MS = 150;
```

**Buttons** (`src/lib/constants/buttons.ts`):

- Button layout configuration
- Keyboard mapping
- Button styling classes
- ARIA labels

**Features** (`src/lib/constants/features.ts`):

- Feature card definitions
- Feature list items
- Icon configurations

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of: import { ... } from "../../../lib/utils/format"
import { formatNumber } from "@/lib/utils/format";
```

Configured in:

- `vite.config.ts` - Build-time resolution
- `tsconfig.app.json` - TypeScript path mapping

### Vite Configuration

The project includes optimized Vite configuration:

**Build Optimizations:**

- Manual chunk splitting for React, React Router, and Lucide icons
- Source maps enabled for debugging
- CSS code splitting and minification
- Optimized asset file naming with hashing

**Development Features:**

- Server warmup for faster initial load
- Auto-open browser on dev server start
- Port 5173 configured
- Fast HMR (Hot Module Replacement)

**Performance:**

- ESNext target for modern JavaScript features
- Optimized dependency pre-bundling
- Tree shaking enabled
- Compressed size reporting

### React Router v7 Implementation

React Router v7 is fully integrated into the project with the following setup:

**Router Configuration:**

The router is configured in `src/main.tsx` with:

- Nested route structure using a layout component
- Error boundary at the root level
- Type-safe route definitions

**Route Structure:**

```
src/routes/
├── _layout.tsx      # Main layout with navigation, footer, and loading states
├── index.tsx        # Home page route (/) with Hero and Features
├── calculator.tsx   # Calculator route (/calculator)
└── error.tsx        # Error boundary page with error handling
```

**Features Implemented:**

- ✅ **Layout Component**: Shared layout with navigation bar, footer, and loading indicators
- ✅ **Nested Routes**: Calculator and Home as child routes
- ✅ **Error Boundaries**: Custom error page using `ErrorBoundary` component prop
- ✅ **Lazy Loading**: Routes loaded on-demand with `React.lazy()` and `Suspense`
- ✅ **Skeleton Loaders**: Custom skeleton components for loading states
- ✅ **Navigation Loading States**: Visual feedback during route transitions
- ✅ **Active Route Highlighting**: Visual feedback for current route with `NavLink`
- ✅ **Pending States**: Loading indicators for pending navigation
- ✅ **Type-safe Navigation**: Full TypeScript support
- ✅ **Code Splitting**: React Router bundled separately for optimization
- ✅ **Future Flags**: React Router v7 future features enabled

**Adding New Routes:**

To add a new route, simply:

1. Create a new component in `src/routes/`
2. Create a skeleton component in `src/components/skeletons/` for loading state
3. Add lazy import and Suspense wrapper in `src/main.tsx`:

```typescript
const NewRoute = lazy(() => import("@/routes/new-route"));

export const NewRouteWithSuspense = () => (
  <Suspense fallback={<NewRouteSkeleton />}>
    <NewRoute />
  </Suspense>
);
```

4. Add it to the router configuration:

```typescript
{
  path: "new-route",
  Component: NewRouteWithSuspense,
}
```

5. Add navigation link in `src/routes/_layout.tsx` if needed using `NavLink`

**Available Hooks:**

- `useNavigate()` - Programmatic navigation
- `useLocation()` - Current route location
- `useNavigation()` - Navigation state (loading, submitting, etc.)
- `useRouteError()` - Error information in error boundaries
- `NavLink` component - Declarative navigation links with active/pending states
- `Link` component - Declarative navigation links

## 🧪 Development

### Code Quality

- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Configured with React and TypeScript rules
- **Code Organization**: Modular structure with clear separation of concerns

### Best Practices

- ✅ Type-safe code with TypeScript
- ✅ Custom hooks for reusable logic
- ✅ Centralized validation and constants
- ✅ Proper cleanup of event listeners and timeouts
- ✅ Accessibility-first approach
- ✅ Mobile-responsive design
- ✅ Performance optimizations (useCallback, useRef)

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🚧 Known Limitations

### Current Limitations

- No persistent storage (history is lost on page refresh)
- Limited to basic mathematical operations
- No scientific calculator functions
- No unit conversion features
- No expression editing after calculation
- No route-level data loading (loaders not yet implemented)
- Expression length limit: 50 characters (validation) / 100 characters (calculator evaluation)

### Future Enhancements

- [ ] Add localStorage for history persistence
- [ ] Implement scientific calculator functions
- [ ] Add unit conversion features
- [ ] Create comprehensive test suite
- [ ] Add dark mode support
- [ ] Implement expression editing
- [ ] Add copy/paste functionality
- [ ] Support for parentheses and complex expressions
- [ ] Add calculator history page with React Router
- [ ] Implement route-level data loading with loaders
- [ ] Create about/help page with route
- [ ] Add unit tests for calculator logic
- [ ] Add E2E tests for user flows

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the code style and best practices
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain accessibility standards (WCAG 2.1 AA)
- Add proper error handling
- Write meaningful commit messages
- Update documentation as needed
- Ensure code passes linting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework and continuous improvements
- **Tailwind CSS** for the utility-first CSS approach
- **Vite** for the lightning-fast build tool
- **Lucide** for the beautiful icon library
- **TypeScript** for type safety and developer experience
- **React Router** for declarative routing and navigation

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Browser version and OS
   - Screenshots if applicable

## 📊 Project Stats

- **Lines of Code**: ~1500+
- **Components**:
  - Calculator: 3 components (Display, CalculatorButton, History)
  - Home: 4 components (Hero, FeatureCard, FeatureCardsGrid, FeaturesList)
  - Skeletons: 2 skeleton components (HomeSkeleton, CalculatorSkeleton)
- **Custom Hooks**: 2 hooks (useCalculator, useKeyboard)
- **Routes**: 3 routes (Home, Calculator, Error)
- **Utility Functions**: 10+ functions
- **TypeScript Coverage**: 100%

---

**Built with ❤️ using React 19, TypeScript, Vite, Tailwind CSS v4, and React Router v7**
