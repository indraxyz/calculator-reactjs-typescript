# Modern Calculator App

A beautiful, secure, and feature-rich calculator built with React, TypeScript, and Tailwind CSS. This calculator combines modern design with robust security measures and excellent user experience.

## ✨ Features

### 🧮 Mathematical Operations

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Percentage Calculations**: Convert numbers to percentages
- **Clear Functions**: Clear entry (CE) and clear all (C)
- **Backspace**: Remove last entered digit
- **Decimal Support**: Handle decimal numbers with validation
- **Expression History**: Track calculation history with newest items highlighted

### 🎨 Modern UI/UX Design

- **Glass Morphism**: Beautiful backdrop blur effects with transparency
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive Animations**:
  - Button ripple effects and hover animations
  - Smooth transitions and scaling effects
  - Pulse animation for latest history items
- **Accessibility**:
  - ARIA labels for screen readers
  - Keyboard navigation support
  - Focus management
- **Visual Feedback**:
  - Active button states
  - Error highlighting
  - Tooltips for long text

### 🔒 Security & Validation

- **Input Sanitization**: Prevents XSS attacks and malicious input
- **Expression Validation**: Strict validation of mathematical expressions
- **Overflow Protection**: Prevents number overflow and underflow
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Memory Safety**: Proper event listener cleanup to prevent memory leaks

### ⌨️ Keyboard Support

- **Number Keys**: 0-9 for digit input
- **Operators**: +, -, \*, / for mathematical operations
- **Special Keys**:
  - Enter/Return for equals (=)
  - Backspace for delete (⌫)
  - Escape for clear (C)
  - Period for decimal point

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

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

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the calculator in action.

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Technology Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
calculator-reactjs/
├── src/
│   ├── App.tsx              # Main calculator component
│   ├── main.tsx            # Application entry point
│   ├── vite-env.d.ts       # Vite type definitions
│   └── components/
│       └── calendar-arrow-down.tsx  # History icon component
├── public/
│   └── vite.svg            # Vite logo
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎯 Key Features Explained

### Security Implementation

The calculator implements multiple security layers:

```typescript
// Input sanitization to prevent XSS
const sanitizeText = (text: string): string => {
  return text.replace(/[<>]/g, "").substring(0, 50);
};

// Expression validation
const validExpression = /^[\d+\-x/*%\s.]+$/.test(sanitizedExpr);

// Safe mathematical evaluation
const result = eval(processedExpr);
```

### Responsive Design

The calculator adapts to different screen sizes:

```typescript
// Mobile-first responsive design
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

- **Primary**: Blue gradient (`from-blue-50 via-indigo-50 to-purple-50`)
- **Background**: Glass morphism with white transparency
- **Buttons**: Gray borders with blue accent for active states
- **Text**: Dark gray for readability

### Typography

- **Display**: Bold, large text for results
- **History**: Monospace font for expressions
- **Buttons**: Semibold weight for clear hierarchy

### Spacing & Layout

- **Grid System**: 4-column grid for calculator buttons
- **Spacing**: Consistent gap system (gap-2, gap-3)
- **Padding**: Responsive padding (p-4 md:p-6)

## 🔧 Customization

### Adding New Operations

To add new mathematical operations:

1. Update the `BUTTONS` array in `App.tsx`
2. Add handler function for the new operation
3. Update keyboard mapping if needed
4. Add validation for the new operation

### Styling Customization

Modify `tailwind.config.js` to customize:

- Color palette
- Typography
- Spacing
- Border radius
- Shadows

### Theme Support

The calculator is designed to easily support themes:

- CSS custom properties for colors
- Conditional classes based on theme state
- Dark mode ready structure

## 🧪 Testing

While the current version doesn't include tests, here's how you can add them:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain accessibility standards
- Add proper error handling
- Write meaningful commit messages

## 🐛 Known Issues & Limitations

### Current Limitations

- No persistent storage (history is lost on page refresh)
- Limited to basic mathematical operations
- No scientific calculator functions
- No unit conversion features

### Planned Improvements

- [ ] Add localStorage for history persistence
- [ ] Implement scientific calculator functions
- [ ] Add unit conversion features
- [ ] Create comprehensive test suite
- [ ] Add dark mode support
- [ ] Implement keyboard shortcuts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS approach
- **Vite** for the fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
