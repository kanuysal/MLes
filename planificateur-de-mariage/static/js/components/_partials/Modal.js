import PropTypes from 'prop-types'
import CloseButton from './CloseButton'

function Modal(props) {

  const { title, isOpen, onClose, onSave } = props

  return (
    <div className={`fixed inset-0 w-full h-screen z-[990] ${isOpen ? 'block' : 'hidden'}`}>
      <div className="h-full overflow-auto bg-gray-700 bg-opacity-20 relative">
        <div className={`absolute top-0 md:top-10 left-1/2 transform -translate-x-1/2 border border-gray-300 w-full max-w-xl bg-white`}>
          <div className="flex items-center justify-between p-6 border-b">
            <p>{title}</p>
            <CloseButton onClick={onClose} />
          </div>
          <div className="p-6 space-y-6">

            {props.children}

            {onSave && (<div className="text-right">
              <button className="rounded-full left-2.5 right-2.5 px-8 py-4 bg-black text-white hover:bg-gray-900 border font-medium" onClick={onSave}>
              Enregistrer
              </button>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.any.isRequired,
  isOpen: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
}

export default Modal;