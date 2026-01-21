import { useState, ReactNode, createContext, useContext } from 'react';
import { ChevronDown, ChevronRight, ChevronsUpDown } from 'lucide-react';

// Context para controle global dos accordions
interface AccordionContextType {
    forceState: 'expanded' | 'collapsed' | null;
}

const AccordionContext = createContext<AccordionContextType>({ forceState: null });

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    icon?: ReactNode;
    badge?: ReactNode;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
}

export function Accordion({
    title,
    children,
    defaultOpen = false,
    icon,
    badge,
    isOpen: controlledIsOpen,
    onToggle,
}: AccordionProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
    const { forceState } = useContext(AccordionContext);

    // Determinar estado: forceState > controlledIsOpen > internalIsOpen
    const isOpen = forceState === 'expanded'
        ? true
        : forceState === 'collapsed'
            ? false
            : controlledIsOpen !== undefined
                ? controlledIsOpen
                : internalIsOpen;

    const handleToggle = () => {
        const newState = !isOpen;
        if (onToggle) {
            onToggle(newState);
        } else {
            setInternalIsOpen(newState);
        }
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-medium text-slate-900 text-sm sm:text-base">{title}</span>
                    {badge}
                </div>
                {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="p-3 sm:p-4 border-t border-slate-200">
                    {children}
                </div>
            )}
        </div>
    );
}

interface AccordionGroupProps {
    children: ReactNode;
    className?: string;
    showControls?: boolean;
}

export function AccordionGroup({ children, className = '', showControls = false }: AccordionGroupProps) {
    const [forceState, setForceState] = useState<'expanded' | 'collapsed' | null>(null);

    const handleExpandAll = () => setForceState('expanded');
    const handleCollapseAll = () => setForceState('collapsed');
    const handleReset = () => setForceState(null);

    return (
        <AccordionContext.Provider value={{ forceState }}>
            {showControls && (
                <div className="flex items-center gap-2 mb-3">
                    <button
                        onClick={handleExpandAll}
                        className="text-xs text-slate-600 hover:text-slate-900 underline"
                    >
                        Expand All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                        onClick={handleCollapseAll}
                        className="text-xs text-slate-600 hover:text-slate-900 underline"
                    >
                        Collapse All
                    </button>
                    {forceState && (
                        <>
                            <span className="text-slate-300">|</span>
                            <button
                                onClick={handleReset}
                                className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                            >
                                <ChevronsUpDown className="w-3 h-3" />
                                Reset
                            </button>
                        </>
                    )}
                </div>
            )}
            <div className={`space-y-2 ${className}`}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

