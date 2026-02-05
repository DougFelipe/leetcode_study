import { AlertTriangle, ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';
import { ProblemV3 } from '../../types/schema';

type WhenNotToUseData = NonNullable<NonNullable<ProblemV3['content']['editorial']>['when_not_to_use']>;

interface WhenNotToUsePanelProps {
    data: WhenNotToUseData;
}

export function WhenNotToUsePanel({ data }: WhenNotToUsePanelProps) {
    return (
        <div className="space-y-4">
            {/* Heuristics */}
            {data.heuristics_md && (
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        <h4 className="font-semibold text-amber-900 text-sm">Heuristics</h4>
                    </div>
                    <div className="text-sm text-amber-800">
                        <MarkdownRenderer content={data.heuristics_md} />
                    </div>
                </div>
            )}

            {/* Scenarios */}
            {data.scenarios && data.scenarios.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-700">Specific Scenarios</h4>
                    {data.scenarios.map((scenario, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h5 className="font-medium text-slate-900 mb-2">{scenario.scenario}</h5>

                            <div className="text-sm text-slate-600 mb-3">
                                <MarkdownRenderer content={scenario.why_md} />
                            </div>

                            {/* Recommended instead */}
                            {scenario.recommended_instead && scenario.recommended_instead.length > 0 && (
                                <div className="bg-white rounded p-3 border border-slate-200">
                                    <h6 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                        Recommended Instead
                                    </h6>
                                    <ul className="space-y-2">
                                        {scenario.recommended_instead.map((rec, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-medium text-slate-900">{rec.name}</span>
                                                    {rec.note_md && (
                                                        <span className="text-slate-600 ml-1">
                                                            — <MarkdownRenderer content={rec.note_md} />
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Example */}
                            {scenario.example_md && (
                                <div className="mt-3 text-sm text-slate-600">
                                    <h6 className="text-xs font-semibold text-slate-500 uppercase mb-1">Example</h6>
                                    <MarkdownRenderer content={scenario.example_md} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
