import ValidationFormComponent from "./ValidationFormComponent";

const SelectComponent = ({ span, name, value, onChange, options, errorMessage }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{span}</span>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`select select-bordered ${errorMessage ? "border-red-500" : ""}`}
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
      {errorMessage && (
        <ValidationFormComponent
        errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default SelectComponent;
