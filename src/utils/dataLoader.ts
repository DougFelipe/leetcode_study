import yaml from 'js-yaml';
import { ProblemV3, SolutionV3 } from '../types/schema';

const problemFiles = import.meta.glob('/data/problems/**/problem.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const solutionFiles = import.meta.glob('/data/problems/**/solutions/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const codeFiles = import.meta.glob('/data/problems/**/code/*', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export interface ProblemWithPath {
  problem: ProblemV3;
  path: string;
}

export class DataLoader {
  private problems: Map<string, ProblemWithPath> = new Map();
  private solutions: Map<string, { solution: SolutionV3; path: string }> = new Map();
  private codes: Map<string, string> = new Map();

  constructor() {
    this.loadData();
  }

  private loadData() {
    for (const [path, content] of Object.entries(problemFiles)) {
      try {
        const problem = yaml.load(content as string) as ProblemV3;
        if (problem.schema_version !== 3) {
          console.error(`Invalid schema version for ${path}`);
          continue;
        }
        this.problems.set(problem.slug, { problem, path });
      } catch (error) {
        console.error(`Error loading problem ${path}:`, error);
      }
    }

    for (const [path, content] of Object.entries(solutionFiles)) {
      try {
        const solution = yaml.load(content as string) as SolutionV3;
        if (solution.schema_version !== 3) {
          console.error(`Invalid schema version for ${path}`);
          continue;
        }
        this.solutions.set(path, { solution, path });
      } catch (error) {
        console.error(`Error loading solution ${path}:`, error);
      }
    }

    for (const [path, content] of Object.entries(codeFiles)) {
      this.codes.set(path, content as string);
    }
  }

  getAllProblems(): ProblemV3[] {
    return Array.from(this.problems.values()).map(p => p.problem);
  }

  getProblemBySlug(slug: string): ProblemV3 | undefined {
    return this.problems.get(slug)?.problem;
  }

  getSolutionForProblem(problemSlug: string, solutionRef: string): SolutionV3 | undefined {
    const problemData = this.problems.get(problemSlug);
    if (!problemData) return undefined;

    const problemDir = problemData.path.substring(0, problemData.path.lastIndexOf('/'));
    const solutionPath = `${problemDir}/${solutionRef}`;

    const solutionData = this.solutions.get(solutionPath);
    return solutionData?.solution;
  }

  getCodeFile(problemSlug: string, relativePath: string): string | undefined {
    const problemData = this.problems.get(problemSlug);
    if (!problemData) return undefined;

    const problemDir = problemData.path.substring(0, problemData.path.lastIndexOf('/'));

    const parts = relativePath.split('/');
    const cleanPath = parts.filter(p => p !== '..').join('/');
    const codePath = `${problemDir}/${cleanPath}`;

    return this.codes.get(codePath);
  }
}

export const dataLoader = new DataLoader();
