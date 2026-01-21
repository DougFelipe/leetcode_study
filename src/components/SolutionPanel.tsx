import { useState } from 'react';
import { SolutionV3 } from '../types/schema';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CodeViewer } from './CodeViewer';
import { dataLoader } from '../utils/dataLoader';
import { Badge } from './Badge';

interface SolutionPanelProps {
  solution: SolutionV3;
  problemSlug: string;
}

export function SolutionPanel({ solution, problemSlug }: SolutionPanelProps) {
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);

  const currentArtifact = solution.code_artifacts[activeCodeIndex];
  const codeContent = currentArtifact
    ? dataLoader.getCodeFile(problemSlug, currentArtifact.path)
    : undefined;

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="tag">{solution.language}</Badge>
          <Badge variant="tag">{solution.paradigm}</Badge>
          <Badge variant="status" status={solution.status}>
            {solution.status}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{solution.approach.name}</h3>
        <div className="flex gap-2 flex-wrap">
          {solution.approach.tags.map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-3 text-sm text-slate-700">
          <span className="font-medium">Time:</span> {solution.complexity.time} |{' '}
          <span className="font-medium">Space:</span> {solution.complexity.space}
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold text-slate-900 mb-3">Rationale</h4>
        <MarkdownRenderer content={solution.text.rationale_md} />
      </div>

      <div>
        <h4 className="text-md font-semibold text-slate-900 mb-3">Walkthrough</h4>
        <MarkdownRenderer content={solution.text.walkthrough_md} />
      </div>

      {solution.code_artifacts.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-slate-900 mb-3">Code</h4>
          {solution.code_artifacts.length > 1 && (
            <div className="flex gap-2 mb-3">
              {solution.code_artifacts.map((artifact, index) => (
                <button
                  key={artifact.code_id}
                  onClick={() => setActiveCodeIndex(index)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeCodeIndex === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {artifact.role}
                </button>
              ))}
            </div>
          )}
          {codeContent && (
            <CodeViewer
              code={codeContent}
              language={currentArtifact.render.syntax}
              showLineNumbers={currentArtifact.render.show_line_numbers}
            />
          )}
        </div>
      )}

      {solution.pitfalls.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="text-md font-semibold text-red-900 mb-2">Pitfalls</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-red-800">
            {solution.pitfalls.map((pitfall, index) => (
              <li key={index}>{pitfall}</li>
            ))}
          </ul>
        </div>
      )}

      {solution.tradeoffs.length > 0 && (
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h4 className="text-md font-semibold text-amber-900 mb-2">Tradeoffs</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
            {solution.tradeoffs.map((tradeoff, index) => (
              <li key={index}>{tradeoff}</li>
            ))}
          </ul>
        </div>
      )}

      {solution.comparison_notes.highlights.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-slate-900 mb-2">Comparison Highlights</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            {solution.comparison_notes.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}

      {solution.comparison_notes.gotchas_language_specific.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-slate-900 mb-2">Language-Specific Gotchas</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            {solution.comparison_notes.gotchas_language_specific.map((gotcha, index) => (
              <li key={index}>{gotcha}</li>
            ))}
          </ul>
        </div>
      )}

      {solution.review_questions.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-md font-semibold text-blue-900 mb-2">Review Questions</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
            {solution.review_questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
