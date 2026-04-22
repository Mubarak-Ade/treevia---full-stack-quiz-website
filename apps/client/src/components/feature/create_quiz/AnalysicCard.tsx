import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

interface AnalysicCardProps {
    handlePublish: (e: React.MouseEvent) => void;
}

export const AnalysicCard = ({ handlePublish }: AnalysicCardProps) => {
    const navigate = useNavigate()
     const handleDiscard = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(-1);
    };
    return (
        <div className="max-w-7xl mx-auto mt-6">
            <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 rounded-full p-3">
                        <CheckCircle2 className="text-green-400" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-primary">Smart Analysis</h3>
                        <p className="text-sm text-secondary">
                            Quiz structure looks healthy. Estimated completion time: 5 minutes.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleDiscard}
                        className="px-6 py-3 rounded-lg border border-default cursor-pointer text-primary bg-brand-subtle transition-colors font-semibold"
                    >
                        Discard Draft
                    </button>
                    <button
                        onClick={handlePublish}
                        className="bg-brand hover:bg-green-700 text-on-brand cursor-pointer px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                        Publish Live
                    </button>
                </div>
            </div>
        </div>
    );
};
