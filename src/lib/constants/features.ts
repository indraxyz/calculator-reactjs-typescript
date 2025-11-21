import {
  Calculator,
  Zap,
  Shield,
  Keyboard,
  type LucideIcon,
} from "lucide-react";

export interface FeatureCard {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconColor: string;
}

export interface FeatureItem {
  text: string;
}

export const featureCards: FeatureCard[] = [
  {
    icon: Zap,
    title: "Fast",
    description: "Lightning-fast calculations with optimized performance",
    iconColor: "text-blue-600",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Built with security best practices and input validation",
    iconColor: "text-green-600",
  },
  {
    icon: Keyboard,
    title: "Keyboard Support",
    description: "Full keyboard navigation and shortcuts",
    iconColor: "text-purple-600",
  },
  {
    icon: Calculator,
    title: "History",
    description: "Track your calculation history with visual feedback",
    iconColor: "text-orange-600",
  },
];

export const featuresList: FeatureItem[][] = [
  [
    { text: "Basic arithmetic operations" },
    { text: "Percentage calculations" },
    { text: "Expression history" },
    { text: "Real-time expression display" },
  ],
  [
    { text: "Responsive design" },
    { text: "Glass morphism UI" },
    { text: "Accessibility support" },
    { text: "Type-safe with TypeScript" },
  ],
];
