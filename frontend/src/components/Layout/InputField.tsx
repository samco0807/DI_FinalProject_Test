import React from "react";

interface InputFieldPropos {
  label: string;
  name: string;
  type: "text" | "password" | "email" | "number" | "datetime";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  required?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldPropos> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  required = false,
  className,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label} </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
