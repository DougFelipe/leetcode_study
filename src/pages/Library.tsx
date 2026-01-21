import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dataLoader } from '../utils/dataLoader';
import { ProblemCard } from '../components/ProblemCard';
import { FilterBar } from '../components/FilterBar';
import { Difficulty, StudyStatus } from '../types/schema';
import { BookOpen } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export function Library() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ler filtros da URL
  const searchQuery = searchParams.get('q') || '';
  const selectedDifficulty = (searchParams.get('difficulty') as Difficulty | 'all') || 'all';
  const selectedStatus = (searchParams.get('status') as StudyStatus | 'all') || 'all';

  // Debounce da busca para melhor performance
  const debouncedQuery = useDebounce(searchQuery, 300);

  const problems = dataLoader.getAllProblems();

  // Atualizar filtros na URL
  const updateFilters = useCallback((updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      return newParams;
    });
  }, [setSearchParams]);

  const handleSearchChange = useCallback((value: string) => {
    updateFilters({ q: value });
  }, [updateFilters]);

  const handleDifficultyChange = useCallback((value: Difficulty | 'all') => {
    updateFilters({ difficulty: value });
  }, [updateFilters]);

  const handleStatusChange = useCallback((value: StudyStatus | 'all') => {
    updateFilters({ status: value });
  }, [updateFilters]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        debouncedQuery === '' ||
        problem.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        problem.slug.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        problem.catalog.topics.some((topic) =>
          topic.toLowerCase().includes(debouncedQuery.toLowerCase())
        ) ||
        problem.catalog.patterns.some((pattern) =>
          pattern.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

      const matchesDifficulty =
        selectedDifficulty === 'all' || problem.catalog.difficulty === selectedDifficulty;

      const matchesStatus =
        selectedStatus === 'all' || problem.study.status === selectedStatus;

      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [problems, debouncedQuery, selectedDifficulty, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header - Responsivo */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">LeetCode Study Library</h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600">
            Browse and track your progress across {problems.length} LeetCode problems
          </p>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={handleDifficultyChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />

        {filteredProblems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No problems found matching your filters</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

