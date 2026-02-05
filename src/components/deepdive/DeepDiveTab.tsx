import { Layers, Ban, AlertOctagon, Clock } from 'lucide-react';
import { Accordion, AccordionGroup } from '../Accordion';
import { AlternativeApproachesTable } from './AlternativeApproachesTable';
import { WhenNotToUsePanel } from './WhenNotToUsePanel';
import { CommonMistakesList } from './CommonMistakesList';
import { ComplexityDeepPanel } from './ComplexityDeepPanel';
import { ProblemV3 } from '../../types/schema';

interface DeepDiveTabProps {
    editorial: NonNullable<ProblemV3['content']['editorial']>;
}

export function DeepDiveTab({ editorial }: DeepDiveTabProps) {
    const hasContent =
        editorial.alternative_approaches?.length ||
        editorial.when_not_to_use ||
        editorial.common_mistakes?.length ||
        editorial.complexity_notes?.detailed_md;

    if (!hasContent) {
        return (
            <div className="text-center py-12 text-slate-500">
                <Layers className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No Deep Dive content yet</p>
                <p className="text-sm mt-2">Add editorial content to your problem.yaml to see it here.</p>
            </div>
        );
    }

    return (
        <AccordionGroup showControls className="space-y-3">
            {/* Alternative Approaches */}
            {editorial.alternative_approaches && editorial.alternative_approaches.length > 0 && (
                <Accordion
                    title="Alternative Approaches"
                    icon={<Layers className="w-4 h-4 text-blue-600" />}
                    badge={
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {editorial.alternative_approaches.length}
                        </span>
                    }
                    defaultOpen={false}
                >
                    <AlternativeApproachesTable approaches={editorial.alternative_approaches} />
                </Accordion>
            )}

            {/* When NOT to use */}
            {editorial.when_not_to_use && (
                <Accordion
                    title="When NOT to use"
                    icon={<Ban className="w-4 h-4 text-amber-600" />}
                    defaultOpen={false}
                >
                    <WhenNotToUsePanel data={editorial.when_not_to_use} />
                </Accordion>
            )}

            {/* Common Mistakes */}
            {editorial.common_mistakes && editorial.common_mistakes.length > 0 && (
                <Accordion
                    title="Common Mistakes (Canonical)"
                    icon={<AlertOctagon className="w-4 h-4 text-red-600" />}
                    badge={
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                            {editorial.common_mistakes.length}
                        </span>
                    }
                    defaultOpen={false}
                >
                    <CommonMistakesList mistakes={editorial.common_mistakes} />
                </Accordion>
            )}

            {/* Complexity Notes (Deep) */}
            {editorial.complexity_notes?.detailed_md && (
                <Accordion
                    title="Complexity Notes (Deep)"
                    icon={<Clock className="w-4 h-4 text-purple-600" />}
                    defaultOpen={false}
                >
                    <ComplexityDeepPanel data={editorial.complexity_notes} />
                </Accordion>
            )}
        </AccordionGroup>
    );
}
