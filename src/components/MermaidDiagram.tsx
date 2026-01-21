import { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, Download, Workflow } from 'lucide-react';

// Inicializar mermaid uma única vez
mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'neutral',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
});

interface MermaidDiagramProps {
    code: string;
    className?: string;
}

export function MermaidDiagram({ code, className = '' }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const uniqueId = useId().replace(/:/g, '-');

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code || !containerRef.current) return;

            try {
                const { svg: renderedSvg } = await mermaid.render(
                    `mermaid-${uniqueId}`,
                    code.trim()
                );
                setSvg(renderedSvg);
                setError(null);
            } catch (err) {
                console.error('Mermaid render error:', err);
                setError('Failed to render diagram');
            }
        };

        renderDiagram();
    }, [code, uniqueId]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadSvg = () => {
        if (!svg) return;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'algorithm-blueprint.svg';
        a.click();
        URL.revokeObjectURL(url);
    };

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {error}
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {/* Toolbar */}
            <div className="flex items-center justify-end gap-1 mb-2">
                <button
                    onClick={handleCopy}
                    className="p-1.5 bg-white hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                    title="Copy Mermaid code"
                >
                    {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                    )}
                </button>
                <button
                    onClick={handleDownloadSvg}
                    className="p-1.5 bg-white hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                    title="Download SVG"
                    disabled={!svg}
                >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                </button>
            </div>

            {/* Diagram container */}
            <div
                ref={containerRef}
                className="overflow-x-auto bg-white rounded-lg border border-slate-200 p-4"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
}

// Componente para o Algorithm Blueprint completo
interface AlgorithmBlueprintProps {
    compact_md?: string;
    mermaid?: {
        type?: string;
        direction?: string;
        code: string;
    };
}

export function AlgorithmBlueprint({ compact_md, mermaid: mermaidData }: AlgorithmBlueprintProps) {
    if (!compact_md && !mermaidData?.code) {
        return null;
    }

    return (
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center gap-2 mb-3">
                <Workflow className="w-5 h-5 text-indigo-700" />
                <h3 className="text-lg font-semibold text-indigo-900">Algorithm Blueprint</h3>
            </div>

            {/* Compact description */}
            {compact_md && (
                <p className="text-sm text-indigo-800 mb-4 font-mono bg-indigo-100 rounded px-3 py-2">
                    {compact_md}
                </p>
            )}

            {/* Mermaid diagram */}
            {mermaidData?.code && (
                <MermaidDiagram code={mermaidData.code} />
            )}
        </div>
    );
}
