import React, { useEffect, useState } from 'react';
import AuthPage from './AuthPage';

export default function AuthModal({ open, onClose }) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    if (!internalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [internalOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (internalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [internalOpen]);

  if (!internalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'grid',
        placeItems: 'center',
        padding: 16,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(2, 6, 23, 0.65)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          background: 'white',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 50px rgba(2,6,23,0.35)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'transparent',
            border: 'none',
            padding: 8,
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{ padding: 12 }}>
          {/* Render the existing page inside modal; it is responsive and self-styled */}
          <AuthPage />
        </div>
      </div>
    </div>
  );
}
