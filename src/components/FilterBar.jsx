import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectWithArrow({ id, label, options }) {
  const selectRef = React.useRef(null);
  const openSelect = (e) => {
    e.preventDefault();
    // Focus and click to open the native select menu
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, }}>
      <label htmlFor={id} style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <select id={id} name={id} ref={selectRef} style={{ ...selectStyle, width: '100%' }}>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        {/* Chevron button */}
        <button
          type="button"
          aria-label={`Open ${label} dropdown`}
          onMouseDown={openSelect}
          onClick={openSelect}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            height: 28,
            width: 28,
            display: 'grid',
            placeItems: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            background: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7l5 6 5-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function FilterBar() {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const hideAtRef = React.useRef(Number.POSITIVE_INFINITY);

  // Recalculate the point where we should hide (as the ListingButtonSection begins)
  const recalcHidePoint = React.useCallback(() => {
    // ListingButtonSection root uses class 'hero-section'
    const el = document.querySelector('.hero-section');
    if (el) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      // start hiding slightly before the listing section begins
      hideAtRef.current = Math.max(0, top - 200);
    } else {
      hideAtRef.current = Number.POSITIVE_INFINITY;
    }
  }, []);

  React.useEffect(() => {
    recalcHidePoint();
    const onScroll = () => {
      const y = window.scrollY;
      const showAfter = 120; // show after user scrolls a bit
      const hideAfter = hideAtRef.current; // hide before categories
      setVisible(y > showAfter && y < hideAfter);
    };
    const onResize = () => {
      recalcHidePoint();
      onScroll();
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Recalculate after images/fonts load
    window.addEventListener('load', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [recalcHidePoint]);
  return (
    <div
      className="filter-bar"
      style={{
        position: 'relative',
        zIndex: 5,
        height: 0, // do not take up vertical space
        marginTop: '0px',
        marginLeft: '-100px',
        marginRight: '-100px',
        pointerEvents: 'none', // let only the panel capture events
      }}
    >
      <div
        className={`filter-panel ${visible ? 'is-visible' : 'is-hidden'}`}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(140px, 1fr))',
          gap: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.36)',
          border: '1px solid rgba(229, 231, 235, 0.6)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
          borderRadius: '12px',
          padding: '12px',
          width: '100%',
          maxWidth: '1100px',
          alignItems: 'center',
          // pointer events controlled via class
        }}
      >
        {/* City with arrow */}
        <SelectWithArrow
          id="city"
          options={[
            { value: '', label: 'Choose city' },
            'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
          ]}
        />

        {/* Location as writable input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="location" style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}></label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Preferred area"
            style={{ ...selectStyle, backgroundColor: '#ffffff' }}
          />
        </div>

        {/* Model with arrow */}
        <SelectWithArrow
          id="model"
          options={[
            { value: '', label: 'Choose model' },
            '2025', '2024', '2023', '2022', 'Older',
          ]}
        />

        {/* Company with arrow */}
        <SelectWithArrow
          id="company"
          options={[
            { value: '', label: 'Choose company' },
            'Honda', 'Toyota', 'Kia', 'Suzuki', 'Hyundai',
          ]}
        />

        {/* Action */}
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'black',
              color: '#ffffff',
              border: 'none',
              borderRadius: 10,
              padding: '12px 16px',
              fontWeight: 700,
              boxShadow: '0 4px 10px rgba(17, 48, 114, 0.35)',
              cursor: 'pointer',
              width: '100%',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onClick={() => {
              // Read values from controls
              const city = document.getElementById('city')?.value || '';
              const area = document.getElementById('location')?.value?.trim() || '';
              const model = document.getElementById('model')?.value || '';
              const company = document.getElementById('company')?.value || '';

              const params = new URLSearchParams();
              if (company) params.set('brand', company);
              if (city) params.set('city', city);
              if (area) params.set('area', area);
              if (model) params.set('model', model);

              const qs = params.toString();
              navigate(`/listing${qs ? `?${qs}` : ''}#results`);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <style>{`
        /* Base positioning and animation */
        .filter-panel {
          transform: translate(-50%, -170px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .filter-panel.is-visible {
          transform: translate(-50%, -150px);
          opacity: 1;
          pointer-events: auto;
        }

        /* Breakpoints: adjust both hidden and visible offsets */
        @media (max-width: 1024px) {
          .filter-bar { margin-left: 0; margin-right: 0; }
          .filter-panel { transform: translate(-50%, -150px); }
          .filter-panel.is-visible { transform: translate(-50%, -130px); }
        }
        @media (max-width: 768px) {
          .filter-panel { transform: translate(-50%, -130px); }
          .filter-panel.is-visible { transform: translate(-50%, -110px); }
          .filter-bar > .filter-panel { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
        }
        @media (max-width: 480px) {
          .filter-panel { transform: translate(-50%, -100px); width: calc(100% - 16px); }
          .filter-panel.is-visible { transform: translate(-50%, -80px); }
          .filter-bar > .filter-panel { grid-template-columns: 1fr; gap: 10px; }
        }
      `}</style>
    </div>
  );
}

const selectStyle = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  color: '#111827',
  padding: '10px 40px 10px 12px',
  borderRadius: 10,
  fontWeight: 600,
  outline: 'none',
};

export default FilterBar;
