import { SolutionV3 } from '../../types/schema';
import { MarkdownRenderer } from '../MarkdownRenderer';
import { Accordion, AccordionGroup } from '../Accordion';
import { BookOpen, Route } from 'lucide-react';

interface SolutionContentProps {
    solution: SolutionV3;
}

export function SolutionContent({ solution }: SolutionContentProps) {
    return (
        <AccordionGroup showControls={true}>
            <Accordion
                title="Rationale"
                icon={<BookOpen className="w-4 h-4 text-slate-600" />}
                defaultOpen={false}
            >
                <MarkdownRenderer content={solution.text.rationale_md} />
            </Accordion>

            <Accordion
                title="Walkthrough"
                icon={<Route className="w-4 h-4 text-slate-600" />}
                defaultOpen={true}
            >
                <MarkdownRenderer content={solution.text.walkthrough_md} />
            </Accordion>
        </AccordionGroup>
    );
}
