import React, { useEffect } from 'react';

export default function ProfileModal({ open, onClose, user, onEdit, onSignout }) {
  if (!open) return null;

  const { name, email, phone, photoUrl, packageName } = user || {};

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile"
      style={{ position: 'fixed', inset: 0, zIndex: 2100, display: 'grid', placeItems: 'center', padding: 16 }}
    >
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.65)', backdropFilter: 'blur(4px)' }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 460,
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
          style={{ position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div style={{ padding: 24, display: 'grid', gap: 12 }}>
          {/* Top center profile picture */}
          <div style={{ display: 'grid', placeItems: 'center', marginTop: 8 }}>
            <img
              src={photoUrl || 'images/logo.png'}
              alt="Profile"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'images/logo.png'; }}
              style={{ width: 96, height: 96, borderRadius: '9999px', border: '2px solid #e2e8f0', objectFit: 'cover' }}
            />
          </div>
          {/* Name */}
          <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 20 }}>{name || 'User'}</div>
          {/* Email (left) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
            <div style={{ fontWeight: 600, color: '#334155' }}>Email</div>
            <div style={{ color: '#0f172a' }}>{email || '-'}</div>
          </div>
          {/* Phone (left) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
            <div style={{ fontWeight: 600, color: '#334155' }}>Phone</div>
            <div style={{ color: '#0f172a' }}>{phone || '03337864890'}</div>
          </div>
          {/* Edit button (right) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onEdit}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: 'white', fontWeight: 700, cursor: 'pointer' }}
            >
              Edit
            </button>
          </div>
          {/* Package (center) */}
          <div style={{ textAlign: 'center', color: '#2563eb', fontWeight: 800 }}>
            {packageName || 'Premium'}
          </div>
          {/* Sign out (center) */}
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <button
              type="button"
              onClick={onSignout}
              style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #ef4444', background: '#ef4444', color: 'white', fontWeight: 800, cursor: 'pointer', minWidth: 140 }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
