import { Link } from 'react-router-dom';
import { ProblemV3 } from '../types/schema';
import { Badge } from './Badge';
import { ChevronRight } from 'lucide-react';

interface ProblemCardProps {
  problem: ProblemV3;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link
      to={`/p/${problem.slug}`}
      className="block bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-4 sm:p-5 group"
    >
      {/* Header: Título + Badges */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {problem.title}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <Badge variant="difficulty" difficulty={problem.catalog.difficulty}>
            {problem.catalog.difficulty}
          </Badge>
          <Badge variant="status" status={problem.study.status}>
            {problem.study.status}
          </Badge>
        </div>
      </div>

      {/* Editorial Summary */}
      {problem.content.editorial_summary_md && (
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {problem.content.editorial_summary_md}
        </p>
      )}

      {/* Topics/Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {problem.catalog.topics.slice(0, 3).map((topic) => (
          <Badge key={topic} variant="tag" size="sm">
            {topic}
          </Badge>
        ))}
        {problem.catalog.topics.length > 3 && (
          <Badge variant="tag" size="sm">+{problem.catalog.topics.length - 3}</Badge>
        )}
      </div>

      {/* Footer: Métricas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span>Priority: {problem.study.priority}/5</span>
          <span>Confidence: {problem.study.confidence}/5</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 group-hover:text-blue-600 transition-colors">
          <span>{problem.solutions_index.length} solutions</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

