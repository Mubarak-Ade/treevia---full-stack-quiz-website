import { Search } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface FilterBarProps {
    searchTerm: string;
    status: string;
    difficulty: string;
    statuses: string[];
    difficulties: string[];
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    handleStatusChange: (value: string) => void;
    handleDifficultyChange: (value: string) => void;
}

export const FilterBar = ({
    searchTerm,
    status,
    difficulty,
    statuses,
    difficulties,
    handleSearch,
    handleStatusChange,
    handleDifficultyChange,
}: FilterBarProps) => {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-4 text-secondary-btn w-4 h-4" />
                <input
                    type="text"
                    placeholder="Filter by quiz title or category..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 bg-surface-alt border border-default rounded-lg text-primary placeholder-secondary-btn focus:outline-none focus:border-secondary-btn/60 transition-colors"
                />
            </div>
            <select
                value={status}
                onChange={e => handleStatusChange(e.target.value)}
                className="px-4 py-3 bg-surface-alt border border-default rounded-lg text-primary focus:outline-none focus:border-secondary-btn/60 transition-colors"
            >
                {statuses.map(option => (
                    <option key={option} value={option}>
                        {option === 'all' ? 'All Statuses' : option}
                    </option>
                ))}
            </select>
            <select
                value={difficulty}
                onChange={e => handleDifficultyChange(e.target.value)}
                className="px-4 py-3 bg-surface-alt border border-default rounded-lg text-primary focus:outline-none focus:border-secondary-btn/60 transition-colors"
            >
                {difficulties.map(option => (
                    <option key={option} value={option}>
                        {option === 'all' ? 'All Difficulties' : option}
                    </option>
                ))}
            </select>
        </div>
    );
};
