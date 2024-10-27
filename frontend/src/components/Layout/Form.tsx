import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, title }) => {
  return (
    <form onSubmit={onSubmit}>
      {title && <h2>{title}</h2>}
      {children}
    </form>
  );
};
