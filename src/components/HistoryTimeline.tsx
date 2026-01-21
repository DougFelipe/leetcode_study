import { HistoryEntry } from '../types/schema';
import { Clock } from 'lucide-react';

interface HistoryTimelineProps {
  history: HistoryEntry[];
}

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  return (
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            {index < history.length - 1 && (
              <div className="w-0.5 h-full bg-slate-200 mt-2" />
            )}
          </div>
          <div className="flex-1 pb-8">
            <div className="text-sm font-medium text-slate-900">{entry.change}</div>
            <div className="text-xs text-slate-500 mt-1">{entry.at}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
