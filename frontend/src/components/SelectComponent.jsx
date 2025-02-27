const SelectComponent = ({ span, name, value, onChange, options }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{span}</span>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="select select-bordered"
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
