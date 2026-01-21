import { useState } from 'react';
import { SolutionV3, Language } from '../../types/schema';
import { CodeViewer } from '../CodeViewer';
import { useCode } from '../../contexts/DataContext';
import { Columns2, ArrowLeftRight } from 'lucide-react';
import { InsightCard } from './InsightCard';
import { AlertTriangle, Bug } from 'lucide-react';

interface ComparePanelProps {
    solutions: SolutionV3[];
    problemSlug: string;
}

// Agrupar soluções por linguagem
function groupByLanguage(solutions: SolutionV3[]): Map<Language, SolutionV3> {
    const map = new Map<Language, SolutionV3>();
    solutions.forEach((sol) => {
        if (!map.has(sol.language)) {
            map.set(sol.language, sol);
        }
    });
    return map;
}

export function ComparePanel({ solutions, problemSlug }: ComparePanelProps) {
    const languageMap = groupByLanguage(solutions);
    const availableLanguages = Array.from(languageMap.keys());

    const [leftLang, setLeftLang] = useState<Language>(availableLanguages[0] || 'go');
    const [rightLang, setRightLang] = useState<Language>(
        availableLanguages[1] || availableLanguages[0] || 'python'
    );
    const [showPitfalls, setShowPitfalls] = useState(false);

    const leftSolution = languageMap.get(leftLang);
    const rightSolution = languageMap.get(rightLang);

    const swapLanguages = () => {
        setLeftLang(rightLang);
        setRightLang(leftLang);
    };

    if (availableLanguages.length < 2) {
        return (
            <div className="text-center py-12 text-slate-500">
                <Columns2 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">Compare Mode requires at least 2 solutions</p>
                <p className="text-sm mt-2">Add solutions in different languages to compare them side by side.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 overflow-hidden">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                {/* Left language selector */}
                <LanguageSelector
                    value={leftLang}
                    onChange={setLeftLang}
                    options={availableLanguages}
                    exclude={rightLang}
                />

                {/* Swap button */}
                <button
                    onClick={swapLanguages}
                    className="p-2 rounded-full bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
                    title="Swap languages"
                >
                    <ArrowLeftRight className="w-4 h-4 text-slate-600" />
                </button>

                {/* Right language selector */}
                <LanguageSelector
                    value={rightLang}
                    onChange={setRightLang}
                    options={availableLanguages}
                    exclude={leftLang}
                />

                {/* Include pitfalls toggle */}
                <label className="flex items-center gap-2 ml-auto cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showPitfalls}
                        onChange={(e) => setShowPitfalls(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">Show Pitfalls</span>
                </label>
            </div>

            {/* Side by side code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4 min-w-0 overflow-hidden">
                    {leftSolution && (
                        <CompareColumn
                            solution={leftSolution}
                            problemSlug={problemSlug}
                            showPitfalls={showPitfalls}
                        />
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-4 min-w-0 overflow-hidden">
                    {rightSolution && (
                        <CompareColumn
                            solution={rightSolution}
                            problemSlug={problemSlug}
                            showPitfalls={showPitfalls}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// Language Selector component
function LanguageSelector({
    value,
    onChange,
    options,
    exclude,
}: {
    value: Language;
    onChange: (lang: Language) => void;
    options: Language[];
    exclude: Language;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as Language)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            {options.map((lang) => (
                <option key={lang} value={lang} disabled={lang === exclude}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
            ))}
        </select>
    );
}

// Compare Column component
function CompareColumn({
    solution,
    problemSlug,
    showPitfalls,
}: {
    solution: SolutionV3;
    problemSlug: string;
    showPitfalls: boolean;
}) {
    const artifact = solution.code_artifacts[0];
    const code = useCode(problemSlug, artifact?.path || '');

    return (
        <div className="space-y-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-100 rounded-lg px-4 py-2">
                <span className="font-semibold text-slate-900 capitalize">
                    {solution.language}
                </span>
                <span className="text-sm text-slate-600">
                    {solution.complexity.time} / {solution.complexity.space}
                </span>
            </div>

            {/* Code */}
            {code && artifact && (
                <CodeViewer
                    code={code}
                    language={artifact.render.syntax}
                    showLineNumbers={true}
                />
            )}

            {/* Pitfalls & Gotchas */}
            {showPitfalls && (
                <div className="space-y-3">
                    <InsightCard
                        title="Pitfalls"
                        icon={AlertTriangle}
                        items={solution.pitfalls}
                        variant="danger"
                    />
                    <InsightCard
                        title="Language Gotchas"
                        icon={Bug}
                        items={solution.comparison_notes.gotchas_language_specific}
                        variant="warning"
                    />
                </div>
            )}
        </div>
    );
}
