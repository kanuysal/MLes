export default function CloseButton({ onClick }) {
  return (
    <button title="Close" className="p-3 rounded-xl bg-black border hover:bg-gray-700" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
