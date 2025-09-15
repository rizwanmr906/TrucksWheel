import React from 'react';

/**
 * BrandBody
 * Extracted section that shows brand chips and body type cards.
 * Visual/structure is unchanged; moved here for clarity.
 */
export default function BrandBody() {
  return (
    <section className="brand-body">
      <p className="eyebrow">Browse Top Car</p>
      <h2 className="section-title">Brands With Body Type</h2>

      {/* Brand chips */}
      <div className="brand-chips" role="list">
        <span className="chip">Honda</span>
        <span className="chip">Toyota</span>
        <span className="chip chip-active">Mercedes Benz</span>
        <span className="chip">Volkswagen</span>
        <span className="chip">Hyundai</span>
        <span className="chip">Ferrari</span>
      </div>

      {/* Body types grid */}
      <div className="body-grid">
        {[
          { name: 'Crossover' },
          { name: 'Suv', active: true },
          { name: 'Sedan' },
          { name: 'Wagon' },
          { name: 'Coup' },
        ].map((b) => (
          <div key={b.name} className={`body-card${b.active ? ' is-active' : ''}`}>
            <div className="icon-wrap" aria-hidden="true">
              {/* simple car icon */}
              <svg width="64" height="28" viewBox="0 0 64 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16h4l3-6h22c5 0 9 4 9 9v3H6v-6z" stroke="#111" strokeWidth="2" fill="none" />
                <circle cx="16" cy="22" r="3" fill="#111" />
                <circle cx="44" cy="22" r="3" fill="#111" />
              </svg>
            </div>
            <div className="body-name">{b.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
