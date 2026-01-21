import { SolutionV3 } from '../../types/schema';
import { SolutionHeader } from './SolutionHeader';
import { SolutionContent } from './SolutionContent';
import { SolutionCode } from './SolutionCode';
import { InsightCard } from './InsightCard';
import { AlertTriangle, Scale, Brain, Zap, Bug } from 'lucide-react';

interface SolutionPanelProps {
    solution: SolutionV3;
    problemSlug: string;
}

export function SolutionPanel({ solution, problemSlug }: SolutionPanelProps) {
    return (
        <div className="space-y-6">
            {/* Header com badges e complexidade */}
            <SolutionHeader solution={solution} />

            {/* Rationale + Walkthrough em accordions */}
            <SolutionContent solution={solution} />

            {/* Code artifacts */}
            <SolutionCode solution={solution} problemSlug={problemSlug} />

            {/* Insight cards */}
            <div className="grid gap-4 md:grid-cols-2">
                <InsightCard
                    title="Pitfalls"
                    icon={AlertTriangle}
                    items={solution.pitfalls}
                    variant="danger"
                />

                <InsightCard
                    title="Tradeoffs"
                    icon={Scale}
                    items={solution.tradeoffs}
                    variant="warning"
                />
            </div>

            {/* Comparison notes */}
            {(solution.comparison_notes.highlights.length > 0 ||
                solution.comparison_notes.gotchas_language_specific.length > 0) && (
                    <div className="grid gap-4 md:grid-cols-2">
                        <InsightCard
                            title="Comparison Highlights"
                            icon={Zap}
                            items={solution.comparison_notes.highlights}
                            variant="info"
                        />

                        <InsightCard
                            title="Language-Specific Gotchas"
                            icon={Bug}
                            items={solution.comparison_notes.gotchas_language_specific}
                            variant="warning"
                        />
                    </div>
                )}

            {/* Review questions */}
            <InsightCard
                title="Review Questions"
                icon={Brain}
                items={solution.review_questions}
                variant="info"
            />
        </div>
    );
}
