interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-slate-200 rounded ${className}`}
        />
    );
}

export function ProblemCardSkeleton() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex justify-between mb-3">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            </div>
            <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
        </div>
    );
}

export function CodeViewerSkeleton() {
    return (
        <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-4/5" />
        </div>
    );
}

export function SolutionPanelSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Content sections */}
            <div>
                <Skeleton className="h-5 w-24 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Code */}
            <CodeViewerSkeleton />
        </div>
    );
}
