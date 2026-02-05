import { useState } from 'react';
import { ChevronDown, ChevronRight, Check, X } from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';
import { ProblemV3 } from '../../types/schema';

type Approach = NonNullable<ProblemV3['content']['editorial']>['alternative_approaches'] extends (infer T)[] | undefined ? T : never;

interface AlternativeApproachesTableProps {
    approaches: Approach[];
}

export function AlternativeApproachesTable({ approaches }: AlternativeApproachesTableProps) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const toggleRow = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left py-2 px-3 font-semibold text-slate-700">Approach</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">Time</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">Space</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">Indices?</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700">When to use</th>
                    </tr>
                </thead>
                <tbody>
                    {approaches.map((approach, index) => (
                        <>
                            <tr
                                key={`row-${index}`}
                                className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${expandedRow === index ? 'bg-blue-50' : ''}`}
                                onClick={() => toggleRow(index)}
                            >
                                <td className="py-2 px-3">
                                    <div className="flex items-center gap-2">
                                        {expandedRow === index ? (
                                            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        )}
                                        <span className="font-medium text-slate-900">{approach.name}</span>
                                    </div>
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{approach.time}</code>
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{approach.space}</code>
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {approach.preserve_indices === true ? (
                                        <Check className="w-4 h-4 text-green-600 mx-auto" />
                                    ) : approach.preserve_indices === false ? (
                                        <X className="w-4 h-4 text-red-600 mx-auto" />
                                    ) : (
                                        <span className="text-slate-400">—</span>
                                    )}
                                </td>
                                <td className="py-2 px-3 text-slate-600 text-xs">
                                    {approach.when_to_use_md?.split('.')[0] || '—'}
                                </td>
                            </tr>
                            {expandedRow === index && (
                                <tr key={`detail-${index}`} className="bg-blue-50/50">
                                    <td colSpan={5} className="p-4">
                                        <div className="space-y-4">
                                            {/* Idea */}
                                            <div>
                                                <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">Idea</h5>
                                                <MarkdownRenderer content={approach.idea_md} />
                                            </div>

                                            {/* When to use (full) */}
                                            {approach.when_to_use_md && (
                                                <div>
                                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">When to use</h5>
                                                    <MarkdownRenderer content={approach.when_to_use_md} />
                                                </div>
                                            )}

                                            {/* Why not */}
                                            {approach.why_not_md && (
                                                <div>
                                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">Why not for this problem</h5>
                                                    <MarkdownRenderer content={approach.why_not_md} />
                                                </div>
                                            )}

                                            {/* Pitfalls */}
                                            {approach.pitfalls && approach.pitfalls.length > 0 && (
                                                <div>
                                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">Pitfalls</h5>
                                                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                                                        {approach.pitfalls.map((pitfall, i) => (
                                                            <li key={i}>{pitfall}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Example */}
                                            {approach.example_md && (
                                                <div>
                                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">Example</h5>
                                                    <MarkdownRenderer content={approach.example_md} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
