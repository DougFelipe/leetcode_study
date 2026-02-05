export type Difficulty = 'easy' | 'medium' | 'hard';
export type StudyStatus = 'todo' | 'solving' | 'solved' | 'revisiting';
export type SolutionStatus = 'done' | 'draft' | 'wip';
export type Language = 'go' | 'python' | 'java' | 'kotlin' | 'javascript' | 'scala' | 'rust';
export type Paradigm = 'imperative' | 'oop_classic' | 'oop_prototype' | 'functional' | 'systems';

export interface ProblemV3 {
  schema_version: 3;
  problem_id: string;
  slug: string;
  title: string;
  source: {
    platform: string;
    id: number;
    slug: string;
    url: string;
  };
  catalog: {
    difficulty: Difficulty;
    topics: string[];
    patterns: string[];
    companies?: string[];
  };
  constraints: {
    summary: string;
    notes_md: string;
  };
  study: {
    status: StudyStatus;
    priority: number;
    confidence: number;
    created_at: string;
    solved_at?: string;
    time_spent_min?: number;
    review: {
      srs_enabled: boolean;
      next_review?: string;
      interval_days?: number;
    };
    mistakes: string[];
  };
  content: {
    statement_md?: string;
    editorial_summary_md?: string;
    key_insights: string[];
    pitfalls: string[];
    review_questions: string[];
    editorial?: {
      algorithm_blueprint?: {
        compact_md?: string;
        mermaid?: {
          type?: string;
          direction?: string;
          code: string;
        };
      };
      complexity_notes?: {
        compact_md?: string;
        detailed_md?: string;
        notes?: string[];
        gotchas?: string[];
        references?: Array<{ label: string; url: string }>;
      };
      alternative_approaches?: Array<{
        name: string;
        idea_md: string;
        time: string;
        space: string;
        preserve_indices?: boolean;
        when_to_use_md?: string;
        why_not_md?: string;
        pitfalls?: string[];
        example_md?: string;
      }>;
      when_not_to_use?: {
        heuristics_md?: string;
        scenarios?: Array<{
          scenario: string;
          why_md: string;
          recommended_instead?: Array<{ name: string; note_md?: string }>;
          example_md?: string;
        }>;
      };
      common_mistakes?: Array<{
        mistake: string;
        why_md: string;
        fix_md: string;
        example_bad_md?: string;
        example_good_md?: string;
        tags?: string[];
      }>;
    };
  };
  solutions_index: SolutionIndexEntry[];
  history: HistoryEntry[];
}

export interface SolutionIndexEntry {
  solution_id: string;
  language: Language;
  paradigm: Paradigm;
  title: string;
  status: SolutionStatus;
  approach_tags: string[];
  solution_ref: string;
}

export interface SolutionV3 {
  schema_version: 3;
  solution_id: string;
  problem_id: string;
  language: Language;
  paradigm: Paradigm;
  approach: {
    name: string;
    tags: string[];
  };
  complexity: {
    time: string;
    space: string;
  };
  text: {
    rationale_md: string;
    walkthrough_md: string;
  };
  pitfalls: string[];
  tradeoffs: string[];
  comparison_notes: {
    highlights: string[];
    gotchas_language_specific: string[];
  };
  review_questions: string[];
  code_artifacts: CodeArtifact[];
  history: HistoryEntry[];
}

export interface CodeArtifact {
  code_id: string;
  lang: Language;
  role: 'solution' | 'helper' | 'snippet';
  path: string;
  render: {
    syntax: string;
    show_line_numbers: boolean;
    default_view: string;
  };
}

export interface HistoryEntry {
  at: string;
  change: string;
}
