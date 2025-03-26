
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

## Screen Breakdown

### Welcome Screen (index.tsx)
- Entry point of the application
- Features welcome message and hero image
- "Get Started" button for navigation
- Introduces app's purpose and core functionality

### Dashboard Screen (dashboard.tsx)
- Main hub for user activity
- Components:
  - Daily verse display
  - Reading progress circle
  - Quick action buttons
  - Stats display (streak, chapters read)
  - Reading reminders
- Navigation to all major features

### Books and Chapters Screen (books-and-chapters.tsx)
- Displays all Bible books
- Progress tracking per book
- Interactive book selection
- Visual progress indicators
- Seamless navigation to chapter view

### Book Chapters Screen (book-chapters.tsx)
- Individual book view
- Chapter-by-chapter progress tracking
- Interactive chapter completion toggles
- Progress visualization
- Back navigation to book list

### Goals Screen (goals.tsx)
- Reading goals management
- Features:
  - Current plan progress
  - Daily/weekly goals
  - Progress statistics
  - Calendar view for readings
  - Reading checklist
- Goal creation and tracking

### Planner Screen (planner.tsx)
- Reading plan configuration
- Step-by-step plan setup:
  1. Plan selection
  2. Schedule configuration
  3. Plan review and start
- Custom plan creation options
- Frequency settings

### Journal Screen (journal.tsx)
- Bible study journaling
- Features:
  - Entry creation
  - Bible passage reference
  - Entry listing
  - Date tracking
- Rich text input support

### Profile Screen (profile.tsx)
- User profile management
- Features:
  - Profile information
  - Statistics display
  - Settings management
  - Notification preferences
  - Theme settings
- Account management options

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

### NavigationBar
```typescript
interface NavigationBarProps {
  currentRoute?: string;
  onNavigate?: (screen: string) => void;
}
```

## Data Flow

### Reading Progress
1. User selects book → Updates book progress
2. Chapter completion → Updates overall progress
3. Progress updates → Reflects in dashboard
4. Goals checked → Updates achievements

### Journal Entries
1. User creates entry
2. Entry stored with metadata
3. Entries listed chronologically
4. Searchable by reference/date

### Reading Plans
1. Plan selection/creation
2. Schedule configuration
3. Progress tracking
4. Reminder generation

## Performance Considerations

- Lazy loading for Bible book data
- Optimized SVG rendering
- Minimal re-renders using React.memo
- Efficient state updates
- Cached reading progress
- Optimized image loading
- Smooth transitions and animations

## Future Enhancements

- Offline support
- Social sharing features
- Advanced study tools
- Multiple reading plans
- Progress insights
- Community features
