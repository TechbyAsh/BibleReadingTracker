
# Technical Documentation

## Architecture Overview

The application follows a component-based architecture using React Native and Expo. Key architectural decisions include:

### Component Structure
- **NeomorphBox**: Custom neumorphic design system component
- **ProgressCircle**: SVG-based circular progress indicator
- **NavigationBar**: Bottom navigation with custom animations

### State Management
- Local state using React hooks
- Persistent storage using AsyncStorage
- Future Redux implementation planned

### Navigation
- File-based routing with Expo Router
- Stack and Tab navigation patterns
- Custom transition animations

### Styling
- Custom theme system
- Linear gradients for visual appeal
- Responsive design patterns

## Core Components

### ProgressCircle
```typescript
interface ProgressCircleProps {
  progress: number;
  size: number;
  strokeWidth?: number;
  color?: string;
}
```

### NeomorphBox
```typescript
interface NeomorphBoxProps {
  children: React.ReactNode;
  style?: ViewStyle;
  darkShadow?: boolean;
}
```

## Performance Considerations

- Lazy loading for Bible book data
- Optimized SVG rendering
- Minimal re-renders using React.memo
