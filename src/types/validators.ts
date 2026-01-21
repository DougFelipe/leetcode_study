import { z } from 'zod';

// ============================================
// Enums / Literal Types
// ============================================

export const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
export const StudyStatusSchema = z.enum(['todo', 'solving', 'solved', 'revisiting']);
export const SolutionStatusSchema = z.enum(['done', 'draft', 'wip']);
export const LanguageSchema = z.enum(['go', 'python', 'java', 'kotlin', 'javascript', 'scala', 'rust']);
export const ParadigmSchema = z.enum(['imperative', 'oop_classic', 'oop_prototype', 'functional', 'systems']);

// ============================================
// Sub-schemas
// ============================================

const SourceSchema = z.object({
    platform: z.string(),
    id: z.number(),
    slug: z.string(),
    url: z.string().url(),
});

const CatalogSchema = z.object({
    difficulty: DifficultySchema,
    topics: z.array(z.string()),
    patterns: z.array(z.string()),
    companies: z.array(z.string()).optional(),
});

const ConstraintsSchema = z.object({
    summary: z.string(),
    notes_md: z.string(),
});

const ReviewSchema = z.object({
    srs_enabled: z.boolean(),
    next_review: z.string().optional(),
    interval_days: z.number().optional(),
});

const StudySchema = z.object({
    status: StudyStatusSchema,
    priority: z.number().min(1).max(5),
    confidence: z.number().min(1).max(5),
    created_at: z.string(),
    solved_at: z.string().optional(),
    time_spent_min: z.number().optional(),
    review: ReviewSchema,
    mistakes: z.array(z.string()),
});

const ContentSchema = z.object({
    statement_md: z.string().optional(),
    editorial_summary_md: z.string().optional(),
    key_insights: z.array(z.string()),
    pitfalls: z.array(z.string()),
    review_questions: z.array(z.string()),
});

const SolutionIndexEntrySchema = z.object({
    solution_id: z.string(),
    language: LanguageSchema,
    paradigm: ParadigmSchema,
    title: z.string(),
    status: SolutionStatusSchema,
    approach_tags: z.array(z.string()),
    solution_ref: z.string(),
});

const HistoryEntrySchema = z.object({
    at: z.string(),
    change: z.string(),
});

// ============================================
// Main Schemas
// ============================================

export const ProblemSchema = z.object({
    schema_version: z.literal(3),
    problem_id: z.string(),
    slug: z.string(),
    title: z.string(),
    source: SourceSchema,
    catalog: CatalogSchema,
    constraints: ConstraintsSchema,
    study: StudySchema,
    content: ContentSchema,
    solutions_index: z.array(SolutionIndexEntrySchema),
    history: z.array(HistoryEntrySchema),
});

const ApproachSchema = z.object({
    name: z.string(),
    tags: z.array(z.string()),
});

const ComplexitySchema = z.object({
    time: z.string(),
    space: z.string(),
});

const TextSchema = z.object({
    rationale_md: z.string(),
    walkthrough_md: z.string(),
});

const ComparisonNotesSchema = z.object({
    highlights: z.array(z.string()),
    gotchas_language_specific: z.array(z.string()),
});

const RenderSchema = z.object({
    syntax: z.string(),
    show_line_numbers: z.boolean(),
    default_view: z.string(),
});

const CodeArtifactSchema = z.object({
    code_id: z.string(),
    lang: LanguageSchema,
    role: z.enum(['solution', 'helper', 'snippet']),
    path: z.string(),
    render: RenderSchema,
});

export const SolutionSchema = z.object({
    schema_version: z.literal(3),
    solution_id: z.string(),
    problem_id: z.string(),
    language: LanguageSchema,
    paradigm: ParadigmSchema,
    approach: ApproachSchema,
    complexity: ComplexitySchema,
    text: TextSchema,
    pitfalls: z.array(z.string()),
    tradeoffs: z.array(z.string()),
    comparison_notes: ComparisonNotesSchema,
    review_questions: z.array(z.string()),
    code_artifacts: z.array(CodeArtifactSchema),
    history: z.array(HistoryEntrySchema),
});

// ============================================
// Type Exports (inferred from schemas)
// ============================================

export type ValidatedProblem = z.infer<typeof ProblemSchema>;
export type ValidatedSolution = z.infer<typeof SolutionSchema>;

// ============================================
// Validation Functions
// ============================================

export function validateProblem(data: unknown): ValidatedProblem {
    return ProblemSchema.parse(data);
}

export function validateSolution(data: unknown): ValidatedSolution {
    return SolutionSchema.parse(data);
}

export function safeParseProblem(data: unknown) {
    return ProblemSchema.safeParse(data);
}

export function safeParseSolution(data: unknown) {
    return SolutionSchema.safeParse(data);
}
