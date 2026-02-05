import { ExternalLink, AlertCircle, Info } from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';
import { ProblemV3 } from '../../types/schema';

type ComplexityNotesData = NonNullable<NonNullable<ProblemV3['content']['editorial']>['complexity_notes']>;

interface ComplexityDeepPanelProps {
    data: ComplexityNotesData;
}

export function ComplexityDeepPanel({ data }: ComplexityDeepPanelProps) {
    return (
        <div className="space-y-4">
            {/* Main detailed analysis */}
            {data.detailed_md && (
                <div className="prose prose-sm max-w-none">
                    <MarkdownRenderer content={data.detailed_md} />
                </div>
            )}

            {/* Compact summary */}
            {data.compact_md && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                        <Info className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-700 uppercase">Quick Summary</span>
                    </div>
                    <p className="text-sm text-purple-800 font-mono">{data.compact_md}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Notes */}
                {data.notes && data.notes.length > 0 && (
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Points</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                            {data.notes.map((note, i) => (
                                <li key={i}>{note}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Gotchas */}
                {data.gotchas && data.gotchas.length > 0 && (
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <h4 className="text-sm font-semibold text-amber-700">Gotchas</h4>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
                            {data.gotchas.map((gotcha, i) => (
                                <li key={i}>{gotcha}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* References */}
            {data.references && data.references.length > 0 && (
                <div className="border-t border-slate-200 pt-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">References</h4>
                    <ul className="space-y-1">
                        {data.references.map((ref, i) => (
                            <li key={i}>
                                <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                                >
                                    {ref.label}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
