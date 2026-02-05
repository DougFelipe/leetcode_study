import { X, Check } from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';
import { ProblemV3 } from '../../types/schema';

type Mistake = NonNullable<ProblemV3['content']['editorial']>['common_mistakes'] extends (infer T)[] | undefined ? T : never;

interface CommonMistakesListProps {
    mistakes: Mistake[];
}

export function CommonMistakesList({ mistakes }: CommonMistakesListProps) {
    return (
        <div className="space-y-4">
            {mistakes.map((mistake, index) => (
                <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-red-50 px-4 py-3 border-b border-red-100">
                        <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-red-900">{mistake.mistake}</h4>
                            {mistake.tags && mistake.tags.length > 0 && (
                                <div className="flex gap-1 flex-shrink-0">
                                    {mistake.tags.map((tag, i) => (
                                        <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Why */}
                        <div>
                            <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                <X className="w-3 h-3 text-red-500" />
                                Why this is wrong
                            </h5>
                            <div className="text-sm text-slate-700">
                                <MarkdownRenderer content={mistake.why_md} />
                            </div>
                        </div>

                        {/* Fix */}
                        <div>
                            <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                <Check className="w-3 h-3 text-green-500" />
                                How to fix
                            </h5>
                            <div className="text-sm text-slate-700">
                                <MarkdownRenderer content={mistake.fix_md} />
                            </div>
                        </div>

                        {/* Examples */}
                        {(mistake.example_bad_md || mistake.example_good_md) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {mistake.example_bad_md && (
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                        <h6 className="text-xs font-semibold text-red-700 uppercase mb-2">❌ Bad</h6>
                                        <div className="text-sm">
                                            <MarkdownRenderer content={mistake.example_bad_md} />
                                        </div>
                                    </div>
                                )}
                                {mistake.example_good_md && (
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <h6 className="text-xs font-semibold text-green-700 uppercase mb-2">✓ Good</h6>
                                        <div className="text-sm">
                                            <MarkdownRenderer content={mistake.example_good_md} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
