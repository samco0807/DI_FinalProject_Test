// components/button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  onclick: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  classname?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onclick,
  type = "button",
  disabled = false,
  classname = "",
}) => {
  return (
    <button type={type} onClick={onclick} disabled={disabled}>
      {label}
    </button>
  );
};

export const SubmitButton: React.FC<ButtonProps> = ({
  label,
  onclick,
  type = "submit",
  disabled = false,
  classname = "",
}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      disabled={disabled}
      className={classname}
    >
      {label}
    </button>
  );
};

export const ResetButton: React.FC<ButtonProps> = ({
  label,
  onclick,
  type = "submit",
  disabled = false,
  classname = "",
}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      disabled={disabled}
      className={classname}
    >
      {label}
    </button>
  );
};
