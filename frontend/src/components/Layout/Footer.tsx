// frontend/src/components/Layout/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} BenevolCentral. All rights reserved.</p>
    </footer>
  );
};