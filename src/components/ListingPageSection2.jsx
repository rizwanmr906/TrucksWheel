// ListingPageSection2.jsx
// What this does:
//  - Shows a title area
//  - Shows brand buttons you can scroll and click
//  - Shows car body cards you can click
//  - Saves your picks in the page URL (?brand=...&body=...)
import React from 'react';
import { useSearchParams } from 'react-router-dom';

// CarIcon: simple car drawing.
// Turns red when selected (active), gray when not.
function CarIcon({ active }) {
  const stroke = active ? '#ef4444' : '#9ca3af'; // red if active, gray if not
  const fill = active ? '#ef4444' : 'none';      // light fill when active
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* soft car body highlight */}
      <rect x="8" y="12" width="40" height="10" rx="3" stroke={stroke} strokeWidth="2" fill={fill} opacity={active ? 0.1 : 0} />
      {/* ground line */}
      <path d="M6 22h52" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      {/* wheels */}
      <circle cx="20" cy="24" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <circle cx="44" cy="24" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      {/* cabin */}
      <rect x="14" y="14" width="24" height="5" rx="2" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

// Dedicated outline icons to match the picture style
function IconCrossover({ active }) {
  const stroke = active ? '#ef4444' : '#9ca3af';
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 19c2-5 6-7 12-7h8c6 0 10 2 12 7" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 19h32" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="22" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <circle cx="42" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <path d="M24 12h10l3 4H21l3-4z" stroke={stroke} strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function IconSUV({ active }) {
  const stroke = active ? '#ef4444' : '#9ca3af';
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="16" y="14" width="24" height="6" rx="2" stroke={stroke} strokeWidth="2"/>
      <path d="M12 20h40" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 14l4-3h12l4 3" stroke={stroke} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="22" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <circle cx="42" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
    </svg>
  );
}

function IconSedan({ active }) {
  const stroke = active ? '#ef4444' : '#9ca3af';
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M14 19h36" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 19c2-4 6-6 14-6s12 2 14 6" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 13h8l2 3H22l2-3z" stroke={stroke} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="24" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <circle cx="44" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
    </svg>
  );
}

function IconWagon({ active }) {
  const stroke = active ? '#ef4444' : '#9ca3af';
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M16 14h18c6 0 10 3 12 6" stroke={stroke} strokeWidth="2"/>
      <path d="M12 20h40" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 14l6-3h10l6 3" stroke={stroke} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="22" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <circle cx="42" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <path d="M44 14h6v6h-6" stroke={stroke} strokeWidth="2"/> {/* extended rear */}
    </svg>
  );
}

function IconCoupe({ active }) {
  const stroke = active ? '#ef4444' : '#9ca3af';
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M14 19h36" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 19c3-5 8-7 20-7" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 12h10l4 5H22l4-5z" stroke={stroke} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="24" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
      <circle cx="44" cy="23" r="3" stroke={stroke} strokeWidth="2" fill={active ? stroke : 'white'} />
    </svg>
  );
}

export default function ListingPageSection2() {
  // Brand buttons (scroll left/right if they overflow)
  const brands = ['Honda', 'Toyota', 'Mercedes Benz', 'Volkswagen', 'Hyundai', 'Ferrari'];
  // Body types shown as cards
  const bodies = [
    { key: 'crossover', label: 'Crossover' },
    { key: 'suv', label: 'Suv' },
    { key: 'sedan', label: 'Sedan' },
    { key: 'wagon', label: 'Wagon' },
    { key: 'coup', label: 'Coup' },
  ];

  // Read/write picks in the URL (?brand, ?body)
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBrand = searchParams.get('brand') || ''; // current brand
  const selectedBody = searchParams.get('body') || '';   // current body type

  // Set or remove a URL value (acts like a toggle)
  const setParam = (k, v) => {
    const next = new URLSearchParams(searchParams);
    if (v) next.set(k, v); else next.delete(k); // set if has value, remove if empty
    setSearchParams(next, { replace: false });  // update the URL
  };

  // inner card content
  return (
    <section className="listing-page-section-2" aria-label="Listing page section 2">{/* outer background */}
      <div className="listing-page-section-2__inner">{/* the card that pops out */}
        <div className="lp2-heading">{/* small line + big title */}
          <div className="lp2-eyebrow">Browse Top Car</div>
          <h2 className="lp2-title">Brands With Body Type</h2>
        </div>

        {/* Brands row. Click to set or clear ?brand */}
        <div className="lp2-brands" role="tablist" aria-label="Select brand">
          {brands.map((b) => {
            const active = b === selectedBrand; // selected?
            return (
              <button
                key={b}
                type="button"
                className={`brand-chip${active ? ' is-active' : ''}`}
                onClick={() => setParam('brand', active ? '' : b)}
                aria-pressed={active}
              >
                {b}
              </button>
            );
          })}
        </div>

        {/* Body type cards. Click to set or clear ?body */}
        <div className="lp2-bodies" aria-label="Select body type">
          {bodies.map(({ key, label }) => {
            const active = key === selectedBody; // selected?
            return (
              <button
                key={key}
                type="button"
                className={`body-card${active ? ' is-active' : ''}`}
                onClick={() => setParam('body', active ? '' : key)}
                aria-pressed={active}
              >
                {/* Render the specific icon for each body type to match the design */}
                {key === 'crossover' && <IconCrossover active={active} />}
                {key === 'suv' && <IconSUV active={active} />}
                {key === 'sedan' && <IconSedan active={active} />}
                {key === 'wagon' && <IconWagon active={active} />}
                {key === 'coup' && <IconCoupe active={active} />}
                <span className="body-label">{label}</span>{/* name */}
                {active && <span className="body-badge" aria-hidden>↗</span>}{/* small badge when active */}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
