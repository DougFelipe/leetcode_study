import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type InsightVariant = 'success' | 'warning' | 'info' | 'danger';

const VARIANT_STYLES: Record<InsightVariant, {
    bg: string;
    border: string;
    icon: string;
    title: string;
    text: string;
}> = {
    success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-700',
        title: 'text-green-900',
        text: 'text-green-800',
    },
    warning: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'text-amber-700',
        title: 'text-amber-900',
        text: 'text-amber-800',
    },
    info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-700',
        title: 'text-blue-900',
        text: 'text-blue-800',
    },
    danger: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-700',
        title: 'text-red-900',
        text: 'text-red-800',
    },
};

interface InsightCardProps {
    title: string;
    icon: LucideIcon;
    items: string[];
    variant: InsightVariant;
    children?: ReactNode;
}

export function InsightCard({
    title,
    icon: Icon,
    items,
    variant,
    children
}: InsightCardProps) {
    const styles = VARIANT_STYLES[variant];

    if (items.length === 0 && !children) {
        return null;
    }

    return (
        <div className={`${styles.bg} rounded-lg p-4 border ${styles.border}`}>
            <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${styles.icon}`} />
                <h4 className={`text-md font-semibold ${styles.title}`}>{title}</h4>
            </div>
            {items.length > 0 && (
                <ul className={`list-disc pl-5 space-y-1 text-sm ${styles.text}`}>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
            {children}
        </div>
    );
}
