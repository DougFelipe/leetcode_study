import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { Copy, Check, WrapText, Download } from 'lucide-react';
import { CodeViewerSkeleton } from './Skeleton';

// Mapeamento de linguagens para ícones/cores
const LANGUAGE_CONFIG: Record<string, { label: string; color: string }> = {
  go: { label: 'Go', color: 'bg-cyan-100 text-cyan-800' },
  python: { label: 'Python', color: 'bg-yellow-100 text-yellow-800' },
  java: { label: 'Java', color: 'bg-orange-100 text-orange-800' },
  javascript: { label: 'JavaScript', color: 'bg-amber-100 text-amber-800' },
  typescript: { label: 'TypeScript', color: 'bg-blue-100 text-blue-800' },
  rust: { label: 'Rust', color: 'bg-red-100 text-red-800' },
  kotlin: { label: 'Kotlin', color: 'bg-purple-100 text-purple-800' },
  scala: { label: 'Scala', color: 'bg-red-100 text-red-800' },
};

interface CodeViewerProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  showLanguageBadge?: boolean;
  showToolbar?: boolean;
}

export function CodeViewer({
  code,
  language,
  showLineNumbers = true,
  showLanguageBadge = true,
  showToolbar = true,
}: CodeViewerProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);

  useEffect(() => {
    setLoading(true);
    codeToHtml(code, {
      lang: language,
      theme: 'github-light',
    })
      .then(setHtml)
      .finally(() => setLoading(false));
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = language === 'python' ? 'py' : language === 'javascript' ? 'js' : language;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <CodeViewerSkeleton />;
  }

  const langConfig = LANGUAGE_CONFIG[language] || { label: language, color: 'bg-gray-100 text-gray-800' };

  return (
    <div className="relative">
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between mb-2 px-1">
          {/* Language Badge */}
          {showLanguageBadge && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${langConfig.color}`}>
              {langConfig.label}
            </span>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWrap(!wrap)}
              className={`p-1.5 rounded transition-colors ${wrap ? 'bg-slate-200' : 'bg-white hover:bg-slate-100'
                } border border-slate-200`}
              title={wrap ? 'Disable wrap' : 'Enable wrap'}
            >
              <WrapText className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 bg-white hover:bg-slate-100 rounded border border-slate-200 transition-colors"
              title="Download code"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 bg-white hover:bg-slate-100 rounded border border-slate-200 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Code Block */}
      <div
        className={`code-viewer rounded-lg overflow-x-auto border border-slate-200 ${showLineNumbers ? 'line-numbers' : ''
          } ${wrap ? 'whitespace-pre-wrap' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

