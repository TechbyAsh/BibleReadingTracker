
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'streak_7',
    title: '7-Day Streak',
    description: 'Read the Bible for 7 consecutive days',
    icon: 'flame',
    unlocked: false
  },
  {
    id: 'streak_30',
    title: '30-Day Warrior',
    description: 'Maintain a reading streak for 30 days',
    icon: 'trophy',
    unlocked: false
  },
  {
    id: 'gospels',
    title: 'Gospel Reader',
    description: 'Complete reading all four Gospels',
    icon: 'book',
    unlocked: false
  }
];
