import ValidationFormComponent from "./ValidationFormComponent";

interface InputComponentProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  errorMessage,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-xs ${errorMessage ? "border-red-500" : ""}`}
      />
      {errorMessage && (
        <ValidationFormComponent
        errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default InputComponent;
