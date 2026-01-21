import { Difficulty, StudyStatus, SolutionStatus } from '../types/schema';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
};

const STATUS_STYLES: Record<StudyStatus | SolutionStatus, string> = {
  solved: 'bg-blue-100 text-blue-800',
  done: 'bg-blue-100 text-blue-800',
  solving: 'bg-yellow-100 text-yellow-800',
  wip: 'bg-yellow-100 text-yellow-800',
  todo: 'bg-gray-100 text-gray-800',
  draft: 'bg-gray-100 text-gray-800',
  revisiting: 'bg-purple-100 text-purple-800',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'difficulty' | 'status' | 'tag';
  difficulty?: Difficulty;
  status?: StudyStatus | SolutionStatus;
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  difficulty,
  status,
  size = 'md'
}: BadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-1.5 py-0.5 text-xs'
    : 'px-2 py-1 text-xs';

  let colorClasses = 'bg-gray-100 text-gray-800';

  if (variant === 'difficulty' && difficulty) {
    colorClasses = DIFFICULTY_STYLES[difficulty] ?? 'bg-gray-100 text-gray-800';
  } else if (variant === 'status' && status) {
    colorClasses = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-800';
  } else if (variant === 'tag') {
    colorClasses = 'bg-slate-100 text-slate-700';
  }

  return (
    <span className={`${sizeClasses} font-medium rounded-full ${colorClasses}`}>
      {children}
    </span>
  );
}
