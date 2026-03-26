import PropTypes from 'prop-types'

function InputTextarea({ value, onChange, label, placeholder, id }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-gray-500 font-medium">{label}</label>
      <textarea value={value} onChange={onChange} type="text" id={id} className="w-full border py-3 px-4" placeholder={placeholder} rows="15"></textarea>
    </div>
  )
}

InputTextarea.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  placeholder: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired
}

export default InputTextarea;