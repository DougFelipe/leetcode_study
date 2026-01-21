import { createContext, useContext, ReactNode, useMemo } from 'react';
import { ProblemV3, SolutionV3 } from '../types/schema';
import { DataLoader } from '../utils/dataLoader';

interface DataContextType {
    problems: ProblemV3[];
    getProblemBySlug: (slug: string) => ProblemV3 | undefined;
    getSolutionForProblem: (slug: string, ref: string) => SolutionV3 | undefined;
    getCodeFile: (slug: string, path: string) => string | undefined;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
    const loader = useMemo(() => new DataLoader(), []);

    const value: DataContextType = useMemo(() => ({
        problems: loader.getAllProblems(),
        getProblemBySlug: (slug) => loader.getProblemBySlug(slug),
        getSolutionForProblem: (slug, ref) => loader.getSolutionForProblem(slug, ref),
        getCodeFile: (slug, path) => loader.getCodeFile(slug, path),
    }), [loader]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const ctx = useContext(DataContext);
    if (!ctx) {
        throw new Error('useData must be used within a DataProvider');
    }
    return ctx;
}

// Hook específico para problemas
export function useProblem(slug: string) {
    const { getProblemBySlug } = useData();
    return getProblemBySlug(slug);
}

// Hook específico para soluções
export function useSolution(problemSlug: string, solutionRef: string) {
    const { getSolutionForProblem } = useData();
    return getSolutionForProblem(problemSlug, solutionRef);
}

// Hook para código
export function useCode(problemSlug: string, codePath: string) {
    const { getCodeFile } = useData();
    return getCodeFile(problemSlug, codePath);
}
