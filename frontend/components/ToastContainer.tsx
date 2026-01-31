// ToastContainer.tsx
import React from 'react';
import { Toast } from '../types/toast.types';
import "../app.css"

export const ToastContainer = ({ toasts }: { toasts: Toast[] }) => {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
};
