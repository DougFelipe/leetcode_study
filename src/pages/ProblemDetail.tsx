import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProblem, useSolution, useData } from '../contexts/DataContext';
import { Badge } from '../components/Badge';
import { Tabs } from '../components/Tabs';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { SolutionPanel, ComparePanel } from '../components/solution';
import { HistoryTimeline } from '../components/HistoryTimeline';
import { Accordion } from '../components/Accordion';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { DeepDiveTab } from '../components/deepdive';
import { ArrowLeft, ExternalLink, Target, Brain, AlertTriangle, Workflow, FileText } from 'lucide-react';

export function ProblemDetail() {
  const { problemSlug } = useParams<{ problemSlug: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const { getSolutionForProblem } = useData();

  const problem = useProblem(problemSlug || '');

  // Get current solution ref
  const currentSolutionRef = problem?.solutions_index[activeSolutionIndex]?.solution_ref;
  const currentSolution = useSolution(problemSlug || '', currentSolutionRef || '');

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Problem Not Found</h1>
          <p className="text-slate-600 mb-4">The requested problem could not be loaded.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Library
          </Link>
        </div>
      </div>
    );
  }

  // Extrai exemplos do statement_md (linhas que começam com **Example)
  const statementParts = problem.content.statement_md?.split(/(?=\*\*Example \d+)/i) || [];
  const mainStatement = statementParts[0] || '';
  const examples = statementParts.slice(1);

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Problem Statement */}
          {mainStatement && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem Statement</h3>
              <MarkdownRenderer content={mainStatement.trim()} />
            </div>
          )}

          {/* Algorithm Blueprint como Accordion */}
          {problem.content.editorial?.algorithm_blueprint && (
            <Accordion
              title="Algorithm Blueprint"
              icon={<Workflow className="w-4 h-4 text-indigo-600" />}
              defaultOpen={false}
            >
              <div className="space-y-4">
                {problem.content.editorial.algorithm_blueprint.compact_md && (
                  <p className="text-sm text-indigo-800 font-mono bg-indigo-100 rounded px-3 py-2">
                    {problem.content.editorial.algorithm_blueprint.compact_md}
                  </p>
                )}
                {problem.content.editorial.algorithm_blueprint.mermaid?.code && (
                  <MermaidDiagram code={problem.content.editorial.algorithm_blueprint.mermaid.code} />
                )}
              </div>
            </Accordion>
          )}

          {/* Examples em Accordion */}
          {examples.length > 0 && (
            <Accordion
              title={`Examples (${examples.length})`}
              icon={<FileText className="w-4 h-4 text-slate-600" />}
              defaultOpen={false}
            >
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <MarkdownRenderer content={example.trim()} />
                  </div>
                ))}
              </div>
            </Accordion>
          )}

          {/* Key Insights */}
          {problem.content.key_insights.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-green-700" />
                <h3 className="text-lg font-semibold text-green-900">Key Insights</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-green-800">
                {problem.content.key_insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Pitfalls */}
          {problem.content.pitfalls.length > 0 && (
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-700" />
                <h3 className="text-lg font-semibold text-red-900">Pitfalls</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-red-800">
                {problem.content.pitfalls.map((pitfall, index) => (
                  <li key={index}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Review Questions */}
          {problem.content.review_questions.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-semibold text-blue-900">Review Questions</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
                {problem.content.review_questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'solutions',
      label: `Solutions (${problem.solutions_index.length})`,
      content: (
        <div>
          {problem.solutions_index.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No solutions available yet</div>
          ) : (
            <div>
              {/* Botões compactos de linguagem em linha horizontal */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {problem.solutions_index.map((sol, index) => (
                  <button
                    key={sol.solution_id}
                    onClick={() => setActiveSolutionIndex(index)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeSolutionIndex === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    title={sol.title}
                  >
                    {sol.language.charAt(0).toUpperCase() + sol.language.slice(1)}
                  </button>
                ))}
              </div>
              {currentSolution && (
                <SolutionPanel solution={currentSolution} problemSlug={problemSlug!} />
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'compare',
      label: 'Compare',
      content: (
        <ComparePanel
          solutions={problem.solutions_index.map((si) => {
            return getSolutionForProblem(problemSlug || '', si.solution_ref);
          }).filter(Boolean) as any}
          problemSlug={problemSlug || ''}
        />
      ),
    },
    {
      id: 'deep_dive',
      label: 'Deep Dive',
      content: (
        <DeepDiveTab editorial={problem.content.editorial || {}} />
      ),
    },
    {
      id: 'history',
      label: 'History',
      content: (
        <div className="space-y-6">
          {/* Study Progress */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Study Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-slate-600 mb-1">Status</div>
                <Badge variant="status" status={problem.study.status}>
                  {problem.study.status}
                </Badge>
              </div>
              <div>
                <div className="text-slate-600 mb-1">Priority</div>
                <div className="font-medium text-slate-900">{problem.study.priority}/5</div>
              </div>
              <div>
                <div className="text-slate-600 mb-1">Confidence</div>
                <div className="font-medium text-slate-900">{problem.study.confidence}/5</div>
              </div>
              <div>
                <div className="text-slate-600 mb-1">Created</div>
                <div className="font-medium text-slate-900">{problem.study.created_at}</div>
              </div>
            </div>
            {problem.study.mistakes.length > 0 && (
              <div className="mt-4">
                <div className="text-slate-600 mb-2">Mistakes Made</div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  {problem.study.mistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Problem History */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Problem History</h3>
            <HistoryTimeline history={problem.history} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>

        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{problem.title}</h1>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="difficulty" difficulty={problem.catalog.difficulty}>
                  {problem.catalog.difficulty}
                </Badge>
                <Badge variant="status" status={problem.study.status}>
                  {problem.study.status}
                </Badge>
              </div>
            </div>
            <a
              href={problem.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium text-slate-700 flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              LeetCode
            </a>
          </div>

          {/* Editorial Summary no cabeçalho */}
          {problem.content.editorial_summary_md && (
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">
              {problem.content.editorial_summary_md}
            </p>
          )}

          <div className="flex gap-2 flex-wrap">
            {problem.catalog.topics.map((topic) => (
              <Badge key={topic} variant="tag">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
}
