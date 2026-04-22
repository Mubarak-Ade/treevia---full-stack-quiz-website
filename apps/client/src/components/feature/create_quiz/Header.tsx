interface HeaderProps {
    handleSaveDraft: () => void;
    handleDiscardDraft: () => void;
    handleCancel: () => void;
    handlePublish: () => void;
    isEditing: boolean;
    isSubmitting: boolean;
    saveStatus: 'idle' | 'saving' | 'saved' | 'local' | 'error';
    lastSavedAt: string | null;
}

export const Header = ({
    handleSaveDraft,
    handleDiscardDraft,
    handleCancel,
    handlePublish,
    isEditing,
    isSubmitting,
    saveStatus,
    lastSavedAt,
}: HeaderProps) => {
    const statusLabel = {
        idle: 'No changes saved yet',
        saving: 'Saving draft...',
        saved: lastSavedAt ? `Saved to server at ${lastSavedAt}` : 'Saved to server',
        local: lastSavedAt ? `Saved locally at ${lastSavedAt}` : 'Saved locally',
        error: 'Autosave needs attention',
    }[saveStatus];

    return (
        <div className="flex p-6 justify-between items-center border-b border-secondary-btn/20">
            <div>
                <h1 className="text-3xl font-bold text-primary">
                    {isEditing ? 'Edit Quiz' : 'Build New Quiz'}
                </h1>
                <p className="text-secondary text-sm mt-1">
                    Create a quiz draft, update its questions, then publish when it is ready.
                </p>
                <p className="mt-2 text-xs font-medium text-secondary">{statusLabel}</p>
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="border border-default bg-transparent text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors font-semibold"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleDiscardDraft}
                    disabled={isSubmitting}
                    className="border border-default bg-surface-alt text-primary px-6 py-3 rounded-md hover:bg-red-500/10 transition-colors font-semibold"
                >
                    Discard Draft
                </button>
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                    className="border border-default bg-brand-subtle text-primary px-6 py-3 rounded-md hover:bg-primary/20 transition-colors font-semibold"
                >
                    {isEditing ? 'Save Changes' : 'Save Draft'}
                </button>
                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="bg-brand  cursor-pointer rounded-md font-bold px-6 py-3 transition-colors text-on-brand"
                >
                    {isSubmitting ? 'Saving...' : 'Publish Quiz'}
                </button>
            </div>
        </div>
    );
};
