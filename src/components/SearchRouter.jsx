import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchRouter() {
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const qRaw = query.get('q') || '';
    const q = qRaw.trim();
    const ql = q.toLowerCase();
    const enc = encodeURIComponent(q);

    // Tokenize for safer word checks (avoid matching inside other words like "highlight")
    const tokens = ql.split(/[^a-z0-9]+/).filter(Boolean);
    const has = (word) => tokens.includes(word);
    const hasAny = (arr) => arr.some((w) => has(w));
    const hasPhrase = (phrase) => ql.includes(phrase);

    // Simple intent routing based on keywords
    // Heuristic routing by keywords
    const isVehiclesContext = hasAny(['vehicle', 'vehicles', 'truck', 'trucks']);
    const isHeavy =
      has('heavyweight') ||
      hasPhrase('heavy weight') ||
      hasPhrase('heavy-duty') ||
      hasPhrase('heavy duty') ||
      (has('heavy') && (isVehiclesContext || has('duty')));

    const isLight =
      has('lightweight') ||
      hasPhrase('light weight') ||
      hasPhrase('light-duty') ||
      hasPhrase('light duty') ||
      (has('light') && (isVehiclesContext || has('duty')));

    // Define explicit flags to avoid reference errors in branches below
    const isHeavyWeight = has('heavyweight') || hasPhrase('heavy weight');
    const isLightWeight = has('lightweight') || hasPhrase('light weight');

    // Vehicle type intents (map to Listings type filter)
    const isSUV = has('suv') || has('suvs') || has('subs'); // include common typo 'subs'
    const isCrossover = has('crossover') || has('crossovers');
    const isSedan = has('sedan') || has('sedans');
    const isWagon = has('wagon') || has('wagons');
    const isCoupe = has('coupe') || has('coupes') || has('coup');

    const isNews = hasAny(['news', 'article', 'articles', 'update', 'updates', 'press', 'blog']);
    const isSeller = hasAny(['seller', 'sell']) || hasPhrase('post ad') || hasPhrase('post listing');
    const isAbout = hasPhrase('about us') || has('about') || has('company') || has('team');
    const isHome = hasAny(['home', 'landing', 'start']);

    if (isHeavy) { navigate(`/listing?category=heavyweight&q=${enc}`, { replace: true }); return; }
    if (isHeavyWeight) { navigate(`/listing?category=heavyweight&q=${enc}`, { replace: true }); return; }
    if (isLightWeight) { navigate(`/listing?category=lightweight&q=${enc}`, { replace: true }); return; }
    if (isLight) { navigate(`/listing?category=lightweight&q=${enc}`, { replace: true }); return; }
    if (isNews) { navigate(`/news?q=${enc}`, { replace: true }); return; }
    if (isSeller) { navigate('/seller', { replace: true }); return; }
    if (isAbout) { navigate('/about', { replace: true }); return; }
    if (isHome) { navigate('/', { replace: true }); return; }

    // Brand detection (map tokens/phrases to canonical brand values used in Listings.jsx)
    const brandCandidates = [
      { brand: 'Toyota', tests: [() => has('toyota')] },
      { brand: 'Honda', tests: [() => has('honda')] },
      { brand: 'Kia', tests: [() => has('kia')] },
      { brand: 'Mercedes Benz', tests: [() => has('mercedes'), () => has('benz'), () => hasPhrase('mercedes-benz'), () => hasPhrase('mercedes benz')] },
      { brand: 'BMW', tests: [() => has('bmw')] },
      { brand: 'Audi', tests: [() => has('audi')] },
      { brand: 'Hyundai', tests: [() => has('hyundai')] },
      { brand: 'Ferrari', tests: [() => has('ferrari')] },
      { brand: 'Ford', tests: [() => has('ford')] },
      { brand: 'Chevrolet', tests: [() => has('chevrolet'), () => has('chevy')] },
      { brand: 'Nissan', tests: [() => has('nissan')] },
      { brand: 'Volkswagen', tests: [() => has('volkswagen'), () => has('vw')] },
      { brand: 'Lexus', tests: [() => has('lexus')] },
      { brand: 'Porsche', tests: [() => has('porsche')] },
    ];

    const detectedBrand = (() => {
      for (const c of brandCandidates) {
        if (c.tests.some((t) => t())) return c.brand;
      }
      return null;
    })();

    // Transmission detection
    const isManual = has('manual');
    const isAutomatic = has('automatic');
    const isSemiAutomatic = hasPhrase('semi-automatic') || hasPhrase('semi automatic') || has('semiautomatic') || (has('semi') && has('automatic'));
    const detectedTrans = isSemiAutomatic ? 'Semi Automatic' : isAutomatic ? 'Automatic' : isManual ? 'Manual' : null;

    // Status (new/used) detection
    const isNew = has('new') || hasPhrase('brand new') || has('latest');
    const isUsed = has('used') || hasPhrase('pre-owned') || hasPhrase('pre owned') || hasPhrase('second-hand') || hasPhrase('second hand');
    const detectedStatus = isNew ? 'new' : isUsed ? 'used' : null;

    // Determine type string if present
    const typeStr = isSUV ? 'SUV' : isCrossover ? 'Crossover' : isSedan ? 'Sedan' : isWagon ? 'Wagon' : isCoupe ? 'Coupe' : null;

    // If any of brand/type/trans/status detected, route with combined filters
    if (detectedBrand || typeStr || detectedTrans || detectedStatus) {
      const params = new URLSearchParams();
      if (detectedBrand) params.set('brand', detectedBrand);
      if (typeStr) params.set('type', typeStr);
      if (detectedTrans) params.set('trans', detectedTrans);
      if (detectedStatus) params.set('status', detectedStatus);
      params.set('q', q);
      navigate(`/listing?${params.toString()}` , { replace: true });
      return;
    }

    // Type-specific routing to listings (fallback if combined block didn't trigger)
    if (isSUV) { navigate(`/listing?type=SUV&q=${enc}`, { replace: true }); return; }
    if (isCrossover) { navigate(`/listing?type=Crossover&q=${enc}`, { replace: true }); return; }
    if (isSedan) { navigate(`/listing?type=Sedan&q=${enc}`, { replace: true }); return; }
    if (isWagon) { navigate(`/listing?type=Wagon&q=${enc}`, { replace: true }); return; }
    if (isCoupe) { navigate(`/listing?type=Coupe&q=${enc}`, { replace: true }); return; }

    // Status-specific fallback routes
    if (isNew) { navigate(`/listing?status=new&q=${enc}`, { replace: true }); return; }
    if (isUsed) { navigate(`/listing?status=used&q=${enc}`, { replace: true }); return; }

    // Default: send to listings with query
    navigate(`/listing?q=${enc}`, { replace: true });
  }, [navigate, query]);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ color: '#64748b' }}>Finding results…</p>
    </main>
  );
}
