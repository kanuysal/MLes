export default function DeleteButton({ onClick }) {
  return (
    <button title="Supprimer" className="p-1 rounded-full border border-black text-black left-2.5 right-2.5 px-8 py-2 transform hover:scale-105 transition-transform duration-500 ease-out w-[180px] lg:w-[180px] mb-2"

    onClick={onClick}>
    Supprimer
    </button>
  )
}
