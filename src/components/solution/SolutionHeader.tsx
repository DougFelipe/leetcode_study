import { SolutionV3 } from '../../types/schema';
import { Badge } from '../Badge';

interface SolutionHeaderProps {
    solution: SolutionV3;
}

export function SolutionHeader({ solution }: SolutionHeaderProps) {
    return (
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
                <Badge variant="tag">{solution.language}</Badge>
                <Badge variant="tag">{solution.paradigm}</Badge>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {solution.approach.name}
            </h3>
            <div className="flex gap-2 flex-wrap mb-3">
                {solution.approach.tags.map((tag) => (
                    <Badge key={tag} variant="tag" size="sm">
                        {tag}
                    </Badge>
                ))}
            </div>
            <div className="text-sm text-slate-700">
                <span className="font-medium">Time:</span> {solution.complexity.time} |{' '}
                <span className="font-medium">Space:</span> {solution.complexity.space}
            </div>
        </div>
    );
}
