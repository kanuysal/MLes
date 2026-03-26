export default function UpdownButton() {
    return (
        <div title="Monter/Descendre de tâche" className="p-3 mb-2 bg-black border rounded-xl hover:bg-gray-700 task-sort-handler cursor-move hide-on-mobile">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
        </div>
    );
}
