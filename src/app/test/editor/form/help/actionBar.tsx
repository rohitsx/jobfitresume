export const ActionBar = ({
  onSave,
  onDiscard,
  hasChanges,
}: {
  onSave: () => void;
  onDiscard: () => void;
  hasChanges: boolean;
}) => (
  <div className="sticky bottom-0 z-10 bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200">
    <div className="max-w-4xl mx-auto flex justify-end items-center gap-4">
      <button
        onClick={onDiscard}
        disabled={!hasChanges}
        className="px-4 py-2 text-sm  text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Discard
      </button>
      <button
        onClick={onSave}
        disabled={!hasChanges}
        className="px-4 py-2 text-sm  text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Save Changes
      </button>
    </div>
  </div>
);
