import PropTypes from 'prop-types'

function InputText({ value, onChange, label, placeholder, id, errorText }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-gray-500 font-medium">{label}</label>
      <input value={value} onChange={onChange} type="text" id={id} className="w-full border py-3 px-4" placeholder={placeholder} />
      {errorText && <small className="text-red-500">{errorText}</small>}
    </div>
  )
}

InputText.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  placeholder: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired
}

export default InputText;