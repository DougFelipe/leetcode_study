import { useState } from 'react';
import { SolutionV3 } from '../../types/schema';
import { CodeViewer } from '../CodeViewer';
import { useCode } from '../../contexts/DataContext';
import { Accordion } from '../Accordion';
import { Code, Hash } from 'lucide-react';

interface SolutionCodeProps {
    solution: SolutionV3;
    problemSlug: string;
}

export function SolutionCode({ solution, problemSlug }: SolutionCodeProps) {
    const [activeCodeIndex, setActiveCodeIndex] = useState(0);
    const [showLineNumbers, setShowLineNumbers] = useState(true);

    if (solution.code_artifacts.length === 0) {
        return null;
    }

    const currentArtifact = solution.code_artifacts[activeCodeIndex];

    return (
        <Accordion
            title="Code"
            icon={<Code className="w-4 h-4 text-slate-600" />}
            defaultOpen={true}
        >
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-3">
                {solution.code_artifacts.length > 1 && (
                    <div className="flex gap-2">
                        {solution.code_artifacts.map((artifact, index) => (
                            <button
                                key={artifact.code_id}
                                onClick={() => setActiveCodeIndex(index)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeCodeIndex === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                                    }`}
                            >
                                {artifact.role}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowLineNumbers(!showLineNumbers)}
                        className={`p-2 rounded-lg border transition-colors ${showLineNumbers
                            ? 'bg-slate-100 border-slate-300'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                        title="Toggle line numbers"
                    >
                        <Hash className="w-4 h-4 text-slate-600" />
                    </button>
                </div>
            </div>

            <CodeContent
                problemSlug={problemSlug}
                artifact={currentArtifact}
                showLineNumbers={showLineNumbers}
            />
        </Accordion>
    );
}

// Sub-componente para carregar código
function CodeContent({
    problemSlug,
    artifact,
    showLineNumbers
}: {
    problemSlug: string;
    artifact: SolutionV3['code_artifacts'][0];
    showLineNumbers: boolean;
}) {
    const codeContent = useCode(problemSlug, artifact.path);

    if (!codeContent) {
        return (
            <div className="text-center py-8 text-slate-500">
                Code file not found
            </div>
        );
    }

    return (
        <CodeViewer
            code={codeContent}
            language={artifact.render.syntax}
            showLineNumbers={showLineNumbers}
        />
    );
}
