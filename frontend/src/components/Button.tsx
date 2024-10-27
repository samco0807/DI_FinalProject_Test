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
  variant = "primary",
  disabled = false,
  classname = "",
}) => {
  return (
    <button type={type} onClick={onclick} disabled={disabled}>
      {label}
    </button>
  );
};
