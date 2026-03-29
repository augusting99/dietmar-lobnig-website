"use client";
import Header from "../components/Header";
import ScrollGradient from "../components/ScrollGradient";
import FadeIn from "../components/FadeIn";
import ShareButton from "../components/ShareButton";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

const vehicles = [
  { brand: "Audi", model: "A6 Avant 50 TDI", year: 2022, km: 68000, power: 286, fuel: "Diesel", price: 49900, image: "/images/green_audi.jpeg" },
  { brand: "Volkswagen", model: "Golf 8 GTI", year: 2023, km: 23000, power: 245, fuel: "Benzin", price: 38500, image: "/images/black_mercedes.jpeg" },
  { brand: "BMW", model: "520d xDrive Touring", year: 2021, km: 57000, power: 190, fuel: "Diesel", price: 42900, image: "/images/g_class.jpeg" },
  { brand: "Mercedes-Benz", model: "C 300 d AMG Line", year: 2023, km: 18500, power: 265, fuel: "Diesel", price: 54900, image: "/images/behind.jpeg" },
];

const brands = [...new Set(vehicles.map((v) => v.brand))].sort();
const years = [...new Set(vehicles.map((v) => v.year))].sort((a, b) => b - a);

function formatNum(n: number) {
  return n.toLocaleString("de-AT");
}

export default function Fahrzeuge() {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxKm, setMaxKm] = useState("");
  const [minPower, setMinPower] = useState("");

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || v.brand.toLowerCase().includes(q) || v.model.toLowerCase().includes(q);
      const matchesBrand = !brandFilter || v.brand === brandFilter;
      const matchesYear = !yearFilter || v.year === Number(yearFilter);
      const matchesPrice = !maxPrice || v.price <= Number(maxPrice);
      const matchesKm = !maxKm || v.km <= Number(maxKm);
      const matchesPower = !minPower || v.power >= Number(minPower);
      return matchesSearch && matchesBrand && matchesYear && matchesPrice && matchesKm && matchesPower;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "km-asc": return a.km - b.km;
        case "power-desc": return b.power - a.power;
        case "year-desc": return b.year - a.year;
        default: return 0;
      }
    });

    return result;
  }, [search, brandFilter, yearFilter, sortBy, maxPrice, maxKm, minPower]);

  const resetFilters = () => {
    setSearch(""); setBrandFilter(""); setYearFilter("");
    setSortBy("price-asc"); setMaxPrice(""); setMaxKm(""); setMinPower("");
  };

  const hasActiveFilters = search || brandFilter || yearFilter || maxPrice || maxKm || minPower;

  return (
    <div className="bg-bg-primary relative">
      <ScrollGradient />
      <div className="relative z-[1]">
      <Header />

      {/* Hero banner — same style as StatementBreak */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
        <Image src="/images/behind.jpeg" alt="Fahrzeuge" fill className="object-cover" style={{ filter: "grayscale(40%) brightness(0.4) contrast(1.1)" }} />
        <div className="absolute inset-0 bg-black/40" />
        <FadeIn className="relative z-[2] max-w-[900px] px-10 max-tablet:px-5">
          <h1 className="text-[clamp(24px,4vw,56px)] font-extralight text-white leading-[1.2] -tracking-[0.5px]">Fahrzeuge</h1>
          <p className="block mt-6 text-sm tracking-[2px] uppercase text-white/40">Ausgewähltes Portfolio — das Wesentliche im Fokus</p>
        </FadeIn>
      </div>

      <main className="max-w-[1280px] mx-auto px-10 max-tablet:px-5 pt-14 pb-24">

        <FadeIn>
          <div className="bg-bg-card border border-border rounded-sm p-8 max-tablet:p-5 mb-10">
            <div className="relative mb-6">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Marke oder Modell suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 pr-3 pl-10 outline-none transition-[border-color] duration-300 w-full focus:border-border-light placeholder:text-text-muted placeholder:text-xs"
              />
            </div>

            <div className="grid grid-cols-6 max-tablet:grid-cols-3 max-mobile:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted">Hersteller</label>
                <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="form-select-arrow bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 px-3 outline-none transition-[border-color] duration-300 w-full focus:border-border-light cursor-pointer">
                  <option value="">Alle</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted">Baujahr</label>
                <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="form-select-arrow bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 px-3 outline-none transition-[border-color] duration-300 w-full focus:border-border-light cursor-pointer">
                  <option value="">Alle</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted">Max. Preis (&euro;)</label>
                <input type="number" placeholder="z.B. 50000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 px-3 outline-none transition-[border-color] duration-300 w-full focus:border-border-light placeholder:text-text-muted placeholder:text-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted">Max. km</label>
                <input type="number" placeholder="z.B. 50000" value={maxKm} onChange={(e) => setMaxKm(e.target.value)} className="bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 px-3 outline-none transition-[border-color] duration-300 w-full focus:border-border-light placeholder:text-text-muted placeholder:text-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted">Min. PS</label>
                <input type="number" placeholder="z.B. 200" value={minPower} onChange={(e) => setMinPower(e.target.value)} className="bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 px-3 outline-none transition-[border-color] duration-300 w-full focus:border-border-light placeholder:text-text-muted placeholder:text-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted">Sortierung</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select-arrow bg-bg-primary border border-border rounded-sm text-text-primary font-[inherit] text-[13px] py-2.5 px-3 outline-none transition-[border-color] duration-300 w-full focus:border-border-light cursor-pointer">
                  <option value="price-asc">Preis aufsteigend</option>
                  <option value="price-desc">Preis absteigend</option>
                  <option value="km-asc">Kilometerstand</option>
                  <option value="power-desc">Leistung</option>
                  <option value="year-desc">Neueste zuerst</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                className="mt-5 text-xs text-text-muted tracking-[1px] uppercase bg-transparent border border-border rounded-sm py-2 px-4 cursor-pointer transition-all duration-300 hover:text-white hover:border-border-light"
                onClick={resetFilters}
              >
                Filter zurücksetzen
              </button>
            )}
          </div>
        </FadeIn>

        <div className="mb-6">
          <p className="text-[13px] text-text-muted">{filtered.length} {filtered.length === 1 ? "Fahrzeug" : "Fahrzeuge"} gefunden</p>
        </div>

        <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-4">
          {filtered.map((vehicle) => (
            <article className="inventory-card border border-border rounded-sm overflow-hidden cursor-pointer transition-all duration-500" style={{ transitionTimingFunction: "var(--ease)" }} key={vehicle.model}>
              <div className="inventory-card-img-wrap relative aspect-[16/10] overflow-hidden">
                <Image className="inventory-card-img object-cover transition-transform duration-1000" style={{ transitionTimingFunction: "var(--ease-out)" }} src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <ShareButton brand={vehicle.brand} model={vehicle.model} year={vehicle.year} price={formatNum(vehicle.price)} />
              </div>
              <div className="py-7 px-8 max-tablet:p-5">
                <span className="text-[10px] font-semibold tracking-[3px] uppercase text-text-muted block mb-1">{vehicle.brand}</span>
                <h3 className="text-xl font-normal text-white mb-4 -tracking-[0.3px]">{vehicle.model}</h3>
                <div className="flex gap-4 mb-5 flex-wrap">
                  <span className="text-xs text-text-muted">{vehicle.year}</span>
                  <span className="text-xs text-text-muted">{formatNum(vehicle.km)} km</span>
                  <span className="text-xs text-text-muted">{vehicle.power} PS</span>
                  <span className="text-xs text-text-muted">{vehicle.fuel}</span>
                </div>
                <p className="text-xl font-semibold text-white -tracking-[0.3px]">&euro; {formatNum(vehicle.price)}</p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-[15px] mb-6">Keine Fahrzeuge gefunden.</p>
            <button
              className="inline-flex items-center gap-2.5 py-3.5 px-8 bg-white text-[#080808] font-semibold text-xs tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:bg-[#e0e0e0] hover:-translate-y-0.5"
              style={{ transitionTimingFunction: "var(--ease)" }}
              onClick={resetFilters}
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

        <FadeIn>
          <p className="text-center text-[13px] text-text-muted mt-16">Bestand ständig angepasst. Kontaktieren Sie uns für Ihr Wunschmodell.</p>
        </FadeIn>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-bg-primary border-t border-border pt-20 pb-10 px-10 max-tablet:px-5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] max-tablet:grid-cols-2 max-mobile:grid-cols-1 gap-12 max-w-[1280px] mx-auto mb-15">
          <div>
            <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.15em] mb-4 block text-white">DL</span>
            <p className="text-sm text-text-muted leading-[1.8] max-w-[320px]">Dietmar Lobnig GmbH — Ihr verlässlicher Partner für Gebrauchtwagen in Klagenfurt seit 1996.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-secondary mb-5">Navigation</h4>
            <ul>
              <li className="mb-2.5"><Link href="/" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Home</Link></li>
              <li className="mb-2.5"><Link href="/fahrzeuge" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Fahrzeuge</Link></li>
              <li className="mb-2.5"><Link href="/#services" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Services</Link></li>
              <li className="mb-2.5"><Link href="/#about" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Über uns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-secondary mb-5">Kontakt</h4>
            <ul>
              <li className="mb-2.5"><a href="tel:+436643418135" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">+43 664 34 18 135</a></li>
              <li className="mb-2.5"><a href="mailto:lobnig@lobnig.cc" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">lobnig@lobnig.cc</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-secondary mb-5">Adresse</h4>
            <ul>
              <li className="mb-2.5 text-sm text-text-muted">Siriusstraße 13</li>
              <li className="mb-2.5 text-sm text-text-muted">9020 Klagenfurt</li>
              <li className="mb-2.5 text-sm text-text-muted">Österreich</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <p className="text-[13px] text-text-muted">&copy; {new Date().getFullYear()} Dietmar Lobnig GmbH</p>
          <div className="flex gap-6">
            <a href="#" className="text-[13px] text-text-muted transition-colors duration-300 hover:text-white">Impressum</a>
            <a href="#" className="text-[13px] text-text-muted transition-colors duration-300 hover:text-white">Datenschutz</a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
