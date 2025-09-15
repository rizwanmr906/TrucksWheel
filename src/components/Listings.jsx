/**
 * Listings.jsx
 *
 * Purpose:
 *  - Show a filter panel (tabs + dropdowns/inputs)
 *  - Filter a demo list of vehicles based on selected options
 *  - Keep the selected filters in the page URL for shareability
 *
 * Notes:
 *  - No visual/styling changes here. Only explanatory comments for clarity.
 */
import React from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import './Listings.css';
// BrandBody removed per request
import ListingPageSection2 from './ListingPageSection2';
import ListingSection from './ListingSection';
import { vehicles } from '../data/vehicles';

/**
 * DropdownIcon()
 * A tiny inline SVG used as the dropdown indicator button icon.
 */
function DropdownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 7l5 6 5-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/**
 * LabeledSelect()
 * Reusable select (dropdown) with a separate chevron button that opens it.
 * Props:
 *  - id: string (html id/name)
 *  - label: string (visible field label)
 *  - value: current selected value
 *  - onChange: handler called when user picks a value
 *  - children: <option> elements
 *  - placeholder: optional placeholder option label
 */
function LabeledSelect({ id, label, value, onChange, children, placeholder }) {
  const selectRef = React.useRef(null);
  const openSelect = (e) => {
    // When the chevron is clicked, focus the native select and trigger its opening.
    e.preventDefault();
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };
  return (
    <div className="fld">
      <label htmlFor={id}>{label}</label>
      <div className="select-wrap">
        <select id={id} name={id} ref={selectRef} value={value} onChange={onChange}>
          {placeholder ? (
            <option value="">{placeholder}</option>
          ) : null}
          {children}
        </select>
        <button className="chev" type="button" aria-label={`Open ${label} dropdown`} onMouseDown={openSelect} onClick={openSelect}>
          <DropdownIcon />
        </button>
      </div>
    </div>
  );
}

/**
 * Listings()
 * The main page component for browsing/filtering vehicles.
 * State is synced to the URL so that filters can be shared and revisited.
 */
export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  // Read relevant query params coming from SearchRouter/nav
  const categoryParam = searchParams.get('category');
  const qParam = (searchParams.get('q') || '').toLowerCase();
  // Active tab/status (all/new/used/light/heavy)
  const [status, setStatus] = React.useState(
    searchParams.get('status') ||
      (categoryParam === 'lightweight' ? 'light' : categoryParam === 'heavyweight' ? 'heavy' : 'all')
  );
  // Dropdown/text filter values
  const [brand, setBrand] = React.useState(searchParams.get('brand') || '');
  const [type, setType] = React.useState(searchParams.get('type') || '');
  const [model, setModel] = React.useState(searchParams.get('model') || '');
  const [trans, setTrans] = React.useState(searchParams.get('trans') || '');
  const [city, setCity] = React.useState(searchParams.get('city') || '');
  const [area, setArea] = React.useState(searchParams.get('area') || '');
  // body can be set from Section 2
  const body = searchParams.get('body') || '';

  // Ref to results section for smooth scrolling
  const resultsRef = React.useRef(null);
  const scrollToResults = React.useCallback(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // updateUrlWithFilters(): write current filters into the address bar as query params.
  const updateUrlWithFilters = React.useCallback((next = {}) => {
    const params = new URLSearchParams({
      status, brand, type, model, trans, city, area,
      ...next,
    });
    // remove empty values 
    for (const [k, v] of params.entries()) if (!v) params.delete(k);
    setSearchParams(params);
  }, [status, brand, type, model, trans, city, area, setSearchParams]);

  // If arriving with a category (lightweight/heavyweight) but no explicit status, sync the tab
  React.useEffect(() => {
    if (!searchParams.get('status') && (categoryParam === 'lightweight' || categoryParam === 'heavyweight')) {
      const next = categoryParam === 'lightweight' ? 'light' : 'heavy';
      setStatus(next);
    }
  }, [categoryParam, searchParams]);

  // handleTabClick(): when a tab is clicked, update the status, sync URL, and jump to results.
  const handleTabClick = (nextStatus) => {
    setStatus(nextStatus);
    updateUrlWithFilters({ status: nextStatus });
    // Jump to results so the user sees the changes
    setTimeout(scrollToResults, 0);
  };

  // handleSearchClick(): when the search button is clicked, sync URL and jump to results.
  const handleSearchClick = () => {
    updateUrlWithFilters();
    // Jump to results so the user sees the changes
    setTimeout(scrollToResults, 0);
  };

  // Slideshow images for hero (single-image-at-a-time)
  const slides = React.useMemo(() => [
   '/images/listinghero1.jpg',
   '/images/listinghero2.jpg',
   
  ], []);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % slides.length);
    }, 4000); // change every 4s
    return () => clearInterval(id);
  }, [slides.length]);

  // If arriving with status/body/brand or #results, auto-scroll to results.
  // Also run on subsequent filter param changes.
  const firstRender = React.useRef(true);
  React.useEffect(() => {
    // Always defer until after layout to make sure the section is in the DOM
    const shouldScroll = !!(
      searchParams.get('brand') ||
      searchParams.get('body') ||
      searchParams.get('status') ||
      searchParams.get('type') ||
      searchParams.get('trans') ||
      searchParams.get('q') ||
      location.hash === '#results'
    );
    if (firstRender.current) {
      firstRender.current = false;
      if (!shouldScroll) return;
    }
    if (shouldScroll) {
      // Use rAF to ensure layout complete before scrolling
      requestAnimationFrame(() => scrollToResults());
    }
  }, [searchParams, location.hash, scrollToResults]);

  // Vehicle data is now imported from the shared `src/data/vehicles.js` file.

  // Map status tabs to dataset fields
  const matchesStatus = (v) => {
    if (status === 'all') return true;
    if (status === 'new') return v.status === 'new';
    if (status === 'used') return v.status === 'used';
    if (status === 'light') return v.weightClass === 'light';
    if (status === 'heavy') return v.weightClass === 'heavy';
    return true;
  };

  // Match free-text query `q` against key fields, but ignore control keywords
  // that are already applied as filters via URL (status/type/trans/category, etc.).
  const matchesQuery = React.useCallback((v, q) => {
    if (!q) return true;
    const hay = `${v.title} ${v.brand} ${v.model} ${v.type} ${v.body}`.toLowerCase();
    const all = q.split(/[^a-z0-9]+/).filter(Boolean);
    const stop = new Set([
      // route/page intents
      'news','article','articles','press','blog','update','updates',
      // weight/status intents
      'light','lightweight','light-duty','heavy','heavyweight','heavy-duty','duty',
      'new','used','latest','pre','owned','pre-owned','second','hand','second-hand',
      // generic vehicle words
      'vehicle','vehicles','car','cars','truck','trucks',
      // types
      'suv','suvs','subs','crossover','crossovers','sedan','sedans','wagon','wagons','coupe','coupes','coup',
      // transmissions
      'automatic','manual','semi','semiautomatic','semi-automatic'
    ]);
    const tokens = all.filter((t) => !stop.has(t));
    if (tokens.length === 0) return true;
    return tokens.every((t) => hay.includes(t));
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    matchesStatus(v) &&
    (!brand || v.brand === brand) &&
    (!type || v.type === type) &&
    (!model || v.model === model) &&
    (!trans || v.trans === trans) &&
    (!city || v.city === city) &&
    (!area || v.area?.toLowerCase().includes(area.toLowerCase())) &&
    (!body || v.body === body) &&
    (!qParam || matchesQuery(v, qParam))
  );

  return (
    <main className="listings-page">
      {/* Top hero background */}
      <section className="listing-hero">
        {/* Single-image slideshow with fade transitions */}
        <div className="hero-slideshow" aria-hidden="true">
          {slides.map((src, idx) => (
            <img key={src + idx} className={`slide${idx === currentSlide ? ' is-active' : ''}`} src={src} alt="" />
          ))}
        </div>
        <div className="hero-inner">
          {/* Filter Card */}
          <div className="filter-card">
            {/* Tabs */}
            <div className="filter-tabs" role="tablist" aria-label="Listing status">
              <button role="tab" aria-selected={status==='all'} className={`tab${status==='all' ? ' is-active' : ''}`} onClick={() => handleTabClick('all')}>All Status</button>
              <button role="tab" aria-selected={status==='new'} className={`tab${status==='new' ? ' is-active' : ''}`} onClick={() => handleTabClick('new')}>New Car</button>
              <button role="tab" aria-selected={status==='used'} className={`tab${status==='used' ? ' is-active' : ''}`} onClick={() => handleTabClick('used')}>Used Car</button>
              <button role="tab" aria-selected={status==='light'} className={`tab${status==='light' ? ' is-active' : ''}`} onClick={() => handleTabClick('light')}>Light Vehicle</button>
              <button role="tab" aria-selected={status==='heavy'} className={`tab${status==='heavy' ? ' is-active' : ''}`} onClick={() => handleTabClick('heavy')}>Heavy Vehicle</button>
            </div>

            {/* Inputs row */}
            <div className="inputs-row">
              <LabeledSelect id="brand" label="Brand Name" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="Mercedes Benz">Mercedes Benz</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
                <option value="Audi">Audi</option>
              </LabeledSelect>
              <LabeledSelect id="type" label="Select Type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Wagon">Wagon</option>
                <option value="Crossover">Crossover</option>
                <option value="Coupe">Coupe</option>
              </LabeledSelect>
              <LabeledSelect id="model" label="Select Models" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="Brooklands">Brooklands</option>
                <option value="Civic">Civic</option>
                <option value="Corolla">Corolla</option>
                <option value="GLA">GLA</option>
                <option value="Q5">Q5</option>
              </LabeledSelect>
              <LabeledSelect id="trans" label="Transmission" placeholder="Transmission" value={trans} onChange={(e) => setTrans(e.target.value)}>
                <option value="Semi Automatic">Semi Automatic</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </LabeledSelect>
              <LabeledSelect id="city" label="Choose by City" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
              </LabeledSelect>
              <div className="fld">
                <label htmlFor="area">Preferred Area</label>
                <input
                  id="area"
                  name="area"
                  type="text"
                  className="text-input"
                  placeholder="Type area (e.g., Downtown)"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="action">
                <button className="btn-primary" type="button" onClick={handleSearchClick}>Search Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed white section below hero */}
      <ListingPageSection2 />

      {/* Featured Listings Slider */}
      <div style={{ margin: '40px 0' }}>
        <ListingSection />
      </div>

      {/* Results section */}
      <section
        ref={resultsRef}
        id="results"
        className="results-section"
        style={{ scrollMarginTop: '80px' }}
      >
        <div className="results-header">
          <h3 className="results-title">Results</h3>
          <div className="results-count">{filteredVehicles.length} matches</div>
        </div>

        {/* Active filters summary */}
        <div className="filters-chips">
          {status && status !== 'all' ? <span className="chip">Status: {status}</span> : null}
          {brand ? <span className="chip">Brand: {brand}</span> : null}
          {type ? <span className="chip">Type: {type}</span> : null}
          {model ? <span className="chip">Model: {model}</span> : null}
          {trans ? <span className="chip">Trans: {trans}</span> : null}
          {city ? <span className="chip">City: {city}</span> : null}
          {area ? <span className="chip">Area: {area}</span> : null}
          {body ? <span className="chip">Body: {body}</span> : null}
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="results-empty">No results found. Try changing filters.</div>
        ) : (
          <div className="results-grid">
            {filteredVehicles.map((v) => (
              <article key={v.id} className="result-card" style={{ 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {v.image ? (
                  <figure className="card-media" style={{ margin: '8px 0 10px', position: 'relative' }}>
                    {v.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        zIndex: 2
                      }}>
                        FEATURED
                      </div>
                    )}
                    <img src={v.image} alt={v.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  </figure>
                ) : null}
                <div className="card-head">
                  <h4 className="card-title">{v.title}</h4>
                  <span className={`status-pill ${v.status}`}>{v.status.toUpperCase()}</span>
                </div>
                <div className="card-attrs">
                  <div>Brand: {v.brand}</div>
                  <div>Type: {v.type}</div>
                  <div>Model: {v.model}</div>
                  <div>Body: {v.body}</div>
                  <div>Trans: {v.trans}</div>
                  <div>City: {v.city}</div>
                </div>
                <div style={{
                  marginTop: 'auto',
                  padding: '12px 16px',
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <Link 
                    to={`/vehicle/${v.id}`}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      textDecoration: 'none',
                      display: 'inline-block',
                      ':hover': {
                        backgroundColor: '#2563eb'
                      }
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Small inline styles for results UI
const chipStyle = {
  background: '#f3f4f6',
  color: '#111827',
  border: '1px solid #e5e7eb',
  borderRadius: 999,
  padding: '4px 10px',
  fontSize: 12,
  fontWeight: 700,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: 12,
};

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 12,
  boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
};

const pillStyle = {
  color: '#ffffff',
  borderRadius: 999,
  padding: '2px 8px',
  fontSize: 11,
  fontWeight: 900,
};
