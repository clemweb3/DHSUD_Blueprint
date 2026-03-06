import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area, LabelList, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
const C = {
  navy: "#0C2461",
  blue: "#1B3F7A",
  midBlue: "#2C5F9E",
  lightBlue: "#4A90D9",
  sky: "#7EB8F7",
  red: "#C0392B",
  crimson: "#E74C3C",
  gold: "#D4A017",
  amber: "#F0B429",
  green: "#1A7A4A",
  teal: "#0D7A8A",
  white: "#FFFFFF",
  offWhite: "#F7F9FC",
  lightGray: "#EDF2F7",
  gray: "#6B7280",
  text: "#1A2332",
  muted: "#5A6B80",
};

// ─── CHART DATA ───────────────────────────────────────────────────────────────
const affordabilityData = [
  { label: "D1 ₱8K", affordable: 2400, required: 4824, income: 8000 },
  { label: "D2 ₱12K", affordable: 3582, required: 4824, income: 11940 },
  { label: "D3 ₱17K", affordable: 5211, required: 4824, income: 17369 },
  { label: "D4 ₱21K", affordable: 6300, required: 4824, income: 21000 },
  { label: "D5 ₱26K", affordable: 7800, required: 4824, income: 26000 },
  { label: "D6 ₱33K", affordable: 9900, required: 4824, income: 33000 },
  { label: "D7 ₱43K", affordable: 12900, required: 4824, income: 43000 },
  { label: "D8 ₱58K", affordable: 17400, required: 4824, income: 58000 },
  { label: "D9 ₱85K", affordable: 25500, required: 4824, income: 85000 },
  { label: "D10 ₱200K", affordable: 60000, required: 4824, income: 200000 },
];

const housingPrices = [
  { name: "Socialized Ceiling", price: 1800000, fill: C.teal },
  { name: "Median (Nationwide)", price: 3460000, fill: C.midBlue },
  { name: "Metro Manila Condo", price: 3460000, fill: C.lightBlue },
  { name: "Metro Manila House", price: 7360000, fill: C.red },
];

const densityData = [
  { area: "National Avg", density: 376, fill: C.teal },
  { area: "CALABARZON", density: 850, fill: C.midBlue },
  { area: "Central Luzon", density: 720, fill: C.lightBlue },
  { area: "Metro Manila", density: 21765, fill: C.red },
];

const landData = [
  { location: "Rural Province", cost: 1000, fill: C.green },
  { location: "Provincial City", cost: 5000, fill: C.teal },
  { location: "CALABARZON", cost: 20000, fill: C.midBlue },
  { location: "Metro Manila", cost: 100000, fill: C.red },
];

const budgetTrend = [
  { year: "2017", pct: 0.28 }, { year: "2018", pct: 0.32 },
  { year: "2019", pct: 0.35 }, { year: "2020", pct: 0.31 },
  { year: "2021", pct: 0.29 }, { year: "2022", pct: 0.27 },
  { year: "2023", pct: 0.30 }, { year: "2024", pct: 0.33 },
  { year: "2025", pct: 0.34 }, { year: "2026", pct: 0.19 },
];

const agencyBudget = [
  { agency: "NHA", amount: 2200, fill: C.blue },
  { agency: "HSAC", amount: 168, fill: C.teal },
  { agency: "SHFC", amount: 166.1, fill: C.lightBlue },
  { agency: "Other", amount: 3025.9, fill: C.gray },
];

const financingMix = [
  { name: "Provident Fund (60%)", value: 60, color: C.navy },
  { name: "Bonds / NHMFC (30%)", value: 30, color: C.teal },
  { name: "Gov't Budget (10%)", value: 10, color: C.gold },
];

const capitalByYear = [
  { year: "2026", pf: 55, bonds: 10, gaa: 5.56 },
  { year: "2027", pf: 55, bonds: 20, gaa: 11 },
  { year: "2028", pf: 55, bonds: 20, gaa: 11 },
];

const unitsTarget = [
  { year: "Now (4PH)", units: 7500, fill: C.gray },
  { year: "2026", units: 10000, fill: C.lightBlue },
  { year: "2027", units: 17500, fill: C.midBlue },
  { year: "2028", units: 25000, fill: C.blue },
  { year: "2029-30 Goal", units: 45000, fill: C.gold },
];

const regionalData = [
  { region: "Metro Manila", pop: 14.03, land: 100000, fill: C.red },
  { region: "CALABARZON", pop: 16.39, land: 20000, fill: C.blue },
  { region: "Central Luzon", pop: 12.99, land: 8000, fill: C.teal },
  { region: "Cebu", pop: 5.1, land: 5000, fill: C.lightBlue },
  { region: "Davao", pop: 5.2, land: 3000, fill: C.green },
];

const nhmfcCycle = [
  { year: "2026", mortgages: 10, bonds: 10 },
  { year: "2027", mortgages: 20, bonds: 20 },
  { year: "2028", mortgages: 20, bonds: 20 },
];

const providentFundFlow = [
  { source: "Member Contributions", amount: 90 },
  { source: "Investment Income", amount: 9.43 },
  { source: "Loan Repayments", amount: 45 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const peso = (v) => {
  if (v >= 1000000000) return `₱${(v / 1000000000).toFixed(1)}B`;
  if (v >= 1000000) return `₱${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `₱${(v / 1000).toFixed(0)}K`;
  return `₱${v.toLocaleString()}`;
};

const CustomTip = ({ active, payload, label, fmt }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.lightGray}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
      <p style={{ margin: 0, fontWeight: 700, color: C.text }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ margin: "3px 0 0", color: p.color || p.fill || C.blue }}>
          {p.name}: {fmt ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

// ─── COMPONENT BLOCKS ─────────────────────────────────────────────────────────

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.white, borderRadius: 14, padding: "24px 28px", marginBottom: 24, boxShadow: "0 2px 16px rgba(12,36,97,0.08)", border: `1px solid #E2EBF8`, ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ num, title, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
      <div style={{ background: C.navy, color: C.white, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{num}</div>
      <h2 style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: C.navy, fontWeight: 700 }}>{title}</h2>
    </div>
    {subtitle && <p style={{ margin: "0 0 0 44px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{subtitle}</p>}
  </div>
);

const Insight = ({ children, color = C.blue }) => (
  <div style={{ background: `${color}0D`, borderLeft: `4px solid ${color}`, borderRadius: "0 8px 8px 0", padding: "12px 16px", marginTop: 16, fontSize: 13, color: C.text, lineHeight: 1.65 }}>
    {children}
  </div>
);

const Stat = ({ value, label, sub, color }) => (
  <div style={{ background: C.white, borderRadius: 12, padding: "20px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderTop: `4px solid ${color}` }}>
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 800, color }}>{value}</div>
    <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>{sub}</div>}
  </div>
);

const Source = ({ text }) => (
  <p style={{ fontSize: 10.5, color: C.muted, fontStyle: "italic", marginTop: 12 }}>Source: {text}</p>
);

// ─── TOWNSHIP ILLUSTRATION ────────────────────────────────────────────────────
const TownshipIllustration = () => {
  const [hovered, setHovered] = useState(null);

  const zones = [
    { id: "residential", emoji: "🏘️", label: "Residential", sub: "500–5,000 Units", angle: 0, r: 0, color: C.navy, isCenter: true },
    { id: "education", emoji: "🎓", label: "Education", sub: "10-min walk", angle: -80, r: 115, color: C.teal },
    { id: "health", emoji: "🏥", label: "Healthcare", sub: "10-min walk", angle: 0, r: 120, color: C.green },
    { id: "commercial", emoji: "🏪", label: "Market & Shops", sub: "5-min walk", angle: 80, r: 115, color: C.gold },
    { id: "employment", emoji: "🏭", label: "Employment", sub: "15-min walk", angle: 160, r: 130, color: C.lightBlue },
    { id: "transport", emoji: "🚊", label: "Transport Hub", sub: "5-min walk", angle: 235, r: 115, color: C.red },
    { id: "park", emoji: "🌳", label: "Green Spaces", sub: "2-min walk", angle: 300, r: 105, color: C.green },
  ];

  const info = {
    residential: "500 to 5,000 housing units in mid-rise buildings (4–6 floors). Mix of sizes for different family types. Green spaces and playgrounds included.",
    education: "Elementary school mandatory for townships over 1,000 units. High school for 3,000+ units. Day care and TESDA vocational training centers.",
    health: "Barangay health station minimum. Rural Health Unit for larger townships. Pharmacy, mental health and social services on-site.",
    commercial: "Public market, grocery stores, banks and remittance centers, post office, government service centers, restaurants and eateries.",
    employment: "Light industrial zones, BPO centers, commercial areas. Minimum 1,000 jobs within 30 minutes of township required before approval.",
    transport: "Priority: Within 2km of train stations (Metro Manila Subway, NSCR, LRT, MRT). Internal bike lanes and community shuttles.",
    park: "Parks, playgrounds, community gardens. Reduces urban heat and promotes physical wellness of residents.",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      {/* SVG Map */}
      <svg width="440" height="440" viewBox="0 0 440 440" style={{ overflow: "visible" }}>
        {/* Radius rings */}
        {[170, 125, 80].map((r, i) => (
          <circle key={i} cx={220} cy={220} r={r}
            fill={["#EDF5FF", "#D8ECFF", "#C2E0FF"][i]}
            stroke={`${C.blue}30`} strokeWidth={1} strokeDasharray="6 4" />
        ))}
        {/* Ring labels */}
        <text x={220 + 170} y={220} fontSize={9} fill={C.muted} textAnchor="start" dy={3}>15-min</text>
        <text x={220 + 125} y={210} fontSize={9} fill={C.muted} textAnchor="start">10-min</text>
        <text x={220 + 80} y={212} fontSize={9} fill={C.muted} textAnchor="start">5-min</text>

        {/* Connector lines */}
        {zones.filter(z => !z.isCenter).map((z, i) => {
          const rad = (z.angle * Math.PI) / 180;
          const x2 = 220 + z.r * Math.cos(rad);
          const y2 = 220 + z.r * Math.sin(rad);
          return (
            <line key={i} x1={220} y1={220} x2={x2} y2={y2}
              stroke={z.color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5} />
          );
        })}

        {/* Zone nodes */}
        {zones.map((z, i) => {
          const rad = (z.angle * Math.PI) / 180;
          const cx = z.isCenter ? 220 : 220 + z.r * Math.cos(rad);
          const cy = z.isCenter ? 220 : 220 + z.r * Math.sin(rad);
          const size = z.isCenter ? 56 : 46;
          const isHov = hovered === z.id;
          return (
            <g key={i} style={{ cursor: "pointer" }} onClick={() => setHovered(hovered === z.id ? null : z.id)}>
              <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size}
                rx={z.isCenter ? 14 : 10}
                fill={z.isCenter ? C.navy : isHov ? z.color : C.white}
                stroke={z.color} strokeWidth={isHov || z.isCenter ? 3 : 2}
                style={{ filter: isHov ? `drop-shadow(0 4px 10px ${z.color}80)` : "none", transition: "all 0.2s" }} />
              <text x={cx} y={cy - 6} textAnchor="middle" fontSize={z.isCenter ? 20 : 17}>{z.emoji}</text>
              <text x={cx} y={cy + 9} textAnchor="middle" fontSize={z.isCenter ? 8 : 7.5} fontWeight={700}
                fill={z.isCenter ? C.white : z.color}>{z.label}</text>
              {!z.isCenter && (
                <text x={cx} y={cy + 19} textAnchor="middle" fontSize={7} fill={C.muted}>{z.sub}</text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Info panel */}
      <div style={{
        background: hovered ? `${zones.find(z => z.id === hovered)?.color}10` : C.lightGray,
        border: `1px solid ${hovered ? zones.find(z => z.id === hovered)?.color + "40" : "#E2EBF8"}`,
        borderRadius: 12, padding: "14px 20px", width: "100%", minHeight: 64, transition: "all 0.25s"
      }}>
        {hovered ? (
          <>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: zones.find(z => z.id === hovered)?.color, marginBottom: 4 }}>
              {zones.find(z => z.id === hovered)?.emoji} {zones.find(z => z.id === hovered)?.label}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>{info[hovered]}</div>
          </>
        ) : (
          <div style={{ fontSize: 12.5, color: C.muted, textAlign: "center", paddingTop: 8 }}>
            👆 Click any zone to learn more about what's included
          </div>
        )}
      </div>
    </div>
  );
};

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────
const ComparisonBlock = () => {
  const rows = [
    { label: "Land", old: "₱800,000 (family pays)", newv: "₱0 (govt keeps it)", oldC: C.red, newC: C.green },
    { label: "House Construction", old: "₱700,000", newv: "₱700,000", oldC: C.gray, newC: C.gray },
    { label: "Total Cost", old: "₱1,500,000", newv: "₱700,000", oldC: C.red, newC: C.green, bold: true },
    { label: "Monthly Payment", old: "₱4,824 / month", newv: "₱2,254 / month", oldC: C.red, newC: C.green, bold: true },
    { label: "% of ₱15K Income", old: "32% — Unaffordable", newv: "15% — Affordable", oldC: C.red, newC: C.green, bold: true },
    { label: "Monthly Savings", old: "—", newv: "₱2,570 saved", oldC: C.gray, newC: C.green },
    { label: "Speculation Risk", old: "High (can be flipped)", newv: "None (anti-flip rules)", oldC: C.red, newC: C.green },
    { label: "Heritability", old: "Yes", newv: "Yes (passes to children)", oldC: C.gray, newC: C.green },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
        { heading: "❌ Old Way: Full Ownership", bg: `${C.red}08`, border: `${C.red}30`, rows: rows.map(r => ({ label: r.label, val: r.old, c: r.oldC, bold: r.bold })) },
        { heading: "✅ New Way: 50-Year Usufruct", bg: `${C.green}08`, border: `${C.green}30`, rows: rows.map(r => ({ label: r.label, val: r.newv, c: r.newC, bold: r.bold })) },
      ].map((col, ci) => (
        <div key={ci} style={{ borderRadius: 12, padding: "18px 20px", background: col.bg, border: `1px solid ${col.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 14, color: ci === 0 ? C.red : C.green, textTransform: "uppercase", letterSpacing: 0.8 }}>{col.heading}</div>
          {col.rows.map((r, ri) => (
            <div key={ri} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${ci === 0 ? "#F3E8E8" : "#E8F3EA"}`, fontSize: 12.5 }}>
              <span style={{ color: C.muted }}>{r.label}</span>
              <span style={{ fontWeight: r.bold ? 800 : 600, color: r.c }}>{r.val}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
const Timeline = () => {
  const steps = [
    { n: "1", title: "Land Identification", time: "Month 1–3", desc: "Bulacan LGU identifies 10-hectare site near planned train station. Land cost ₱100M. Near industrial zone with 3,000 jobs and existing school.", color: C.teal },
    { n: "2", title: "Township Planning", time: "Month 4–6", desc: "DHSUD reviews plan for 1,500 units, public market, elementary school, health clinic — all within 15-minute walk. Plan approved.", color: C.blue },
    { n: "3", title: "Financing Arranged", time: "Month 7–9", desc: "Bulacan issues ₱100M bond (PHILGUARANTEE-backed). Provident Fund commits ₱900M for family loans. NHMFC commits to securitize ₱300M. Total: ₱1.3B.", color: C.midBlue },
    { n: "4", title: "Construction", time: "Month 10–30", desc: "NHA or private developer builds 1,500 units + roads, water, electricity, market, school, clinic. Families pre-qualified and matched.", color: C.lightBlue },
    { n: "5", title: "Turnover", time: "Month 31–33", desc: "Families receive 50-year usufructuary agreement, house ownership, Provident Fund loan at 3–4%. Monthly: ₱2,500–₱3,500 vs. old ₱4,800.", color: C.gold },
    { n: "6", title: "Self-Sustaining Operation", time: "Year 3+", desc: "Families move in. Market opens (200+ vendors). Provident Fund receives repayments. NHMFC securitizes loans. Capital recycled for next township.", color: C.green },
  ];

  return (
    <div style={{ position: "relative", paddingLeft: 40 }}>
      <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.teal}, ${C.green})`, borderRadius: 2 }} />
      {steps.map((s, i) => (
        <div key={i} style={{ position: "relative", marginBottom: 24, paddingLeft: 20 }}>
          <div style={{ position: "absolute", left: -32, top: 0, width: 28, height: 28, borderRadius: "50%", background: s.color, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>{s.n}</div>
          <div style={{ background: `${s.color}0A`, border: `1px solid ${s.color}30`, borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: s.color }}>{s.title}</span>
              <span style={{ fontSize: 11, color: C.muted, background: `${s.color}18`, borderRadius: 20, padding: "2px 10px" }}>{s.time}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        </div>
      ))}
      <Insight color={C.green}>
        <strong>Net Government Subsidy for this Township: ₱0.</strong> The entire ₱1.3B project is financed through municipal bonds, Provident Fund capital, and private investors — self-sustaining and repeatable in any municipality in the Philippines.
      </Insight>
    </div>
  );
};

// ─── AGENCY CARDS ─────────────────────────────────────────────────────────────
const AgencyCards = () => {
  const [active, setActive] = useState(null);
  const agencies = [
    {
      name: "DHSUD", role: "Policy Maker & Regulator", color: C.navy, emoji: "🏛️",
      targets: ["100% of cities update land-use plans", "80% of permits in 30 days", "Digital one-stop permitting system"],
      desc: "Sets national rules, approves LGU plans, coordinates with DOTr, DepEd, DOH. Ensures every township meets the 15-minute community standard."
    },
    {
      name: "NHA", role: "Public Rental Developer", color: C.blue, emoji: "🏢",
      targets: ["15,000 public rental units by 2028", "Rent: ₱1,500–₱3,500/month", "50,000 old units retrofitted"],
      desc: "Builds and manages public rental housing for the poorest families who cannot access any mortgage — no debt burden, no risk of eviction."
    },
    {
      name: "SHFC", role: "Community Financing", color: C.teal, emoji: "👥",
      targets: ["50,000 families with secure tenure", "₱250M in community mortgage loans", "25% of loans to rural areas"],
      desc: "Works with organized communities — not individuals — using collective land purchase to dramatically lower default risk and serve informal settlers."
    },
    {
      name: "Provident Fund", role: "Primary Lender (60%)", color: C.midBlue, emoji: "💰",
      targets: ["360,000 housing loans (2026–28)", "72-hour approval system", "3% rate for lowest-income borrowers"],
      desc: "Uses its ₱1.23T in assets and ₱9.43B investment income to provide affordable loans — no congressional approval needed."
    },
    {
      name: "NHMFC", role: "Bond Market (30%)", color: C.lightBlue, emoji: "📈",
      targets: ["₱50B in mortgage-backed bonds", "10,000+ mortgages purchased", "Bonds sold to pension funds"],
      desc: "The 'recycling center' — buys mortgages from banks, bundles them, sells to investors. Frees up banks to issue new loans continuously."
    },
    {
      name: "PHILGUARANTEE", role: "Risk Shield", color: C.gold, emoji: "🛡️",
      targets: ["Guarantee ₱5B in municipal bonds", "Enable 15 cities to self-finance", "₱10B in developer loan support"],
      desc: "Makes risky loans safe for investors by guaranteeing repayment. Drops interest rates from 8–10% down to 4–6% for LGUs."
    },
    {
      name: "HSAC", role: "Dispute Resolution", color: C.green, emoji: "⚖️",
      targets: ["Zero case backlog by 2027", "95% decisions upheld on appeal", "Full digital case filing"],
      desc: "Resolves land disputes, developer fraud, and homeowner complaints fast — because legal paralysis is the silent killer of housing projects."
    },
  ];

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {agencies.map((a, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)}
            style={{ borderRadius: 12, padding: "14px 16px", background: active === i ? a.color : `${a.color}0D`, border: `2px solid ${active === i ? a.color : a.color + "40"}`, cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{a.emoji}</div>
            <div style={{ fontWeight: 800, fontSize: 13, color: active === i ? C.white : a.color }}>{a.name}</div>
            <div style={{ fontSize: 11, color: active === i ? `${C.white}CC` : C.muted, marginTop: 2 }}>{a.role}</div>
          </div>
        ))}
        <div style={{ borderRadius: 12, padding: "14px 16px", background: C.lightGray, border: `2px dashed ${C.lightGray}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>↑ Click any agency to see its targets</span>
        </div>
      </div>
      {active !== null && (
        <div style={{ borderRadius: 12, padding: "18px 22px", background: `${agencies[active].color}0A`, border: `1px solid ${agencies[active].color}40`, marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: agencies[active].color, marginBottom: 8 }}>{agencies[active].emoji} {agencies[active].name} — {agencies[active].role}</div>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{agencies[active].desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {agencies[active].targets.map((t, ti) => (
              <div key={ti} style={{ background: agencies[active].color, color: C.white, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600 }}>🎯 {t}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "Isn't renting just throwing money away? Why not let families own?",
      a: "For the poorest 30%, rental is safer than ownership that leads to default and eviction. Consider Maria (₱12K/month): with ownership she pays ₱4,800/month, struggles, defaults, and loses everything. With NHA rental at ₱2,000/month, she builds savings, invests in children's education, and has security without crushing debt. Homeownership is great — when families can actually afford it."
    },
    {
      q: "If govt keeps the land, aren't families just tenants forever?",
      a: "No. Families get: a 50-year legal right to occupy (renewable), ownership of the house structure (can renovate freely), right to pass to children, protection from arbitrary eviction, and ability to sell — at capped prices to another qualified family. Singapore has used 99-year leasehold since the 1960s. Result: 89% homeownership rate, 80% in public housing. Affordability and security co-exist."
    },
    {
      q: "Why build in the provinces? The jobs are in Metro Manila.",
      a: "This is circular reasoning that traps us. Government builds only in Manila → all jobs go to Manila → land becomes expensive → housing unaffordable → cycle repeats. CALABARZON already has 16.39 million people — more than Metro Manila's 14 million — because industries moved there when Manila got too expensive. The Blueprint breaks this cycle by building townships WITH industrial zones, creating jobs WHERE people live."
    },
    {
      q: "How do we prevent ghost towns like previous projects?",
      a: "Old projects failed because they violated basic rules: built 80–100km from jobs with no transport. This Blueprint requires: (1) 1,000+ jobs within 30 minutes before any approval; (2) connection to existing rail/bus routes; (3) school mandatory; (4) minimum 95% occupancy tracked; (5) 10 pilot townships in 2026 before national scaling. Hong Kong, Japan, Singapore have all proven transit-oriented housing works."
    },
    {
      q: "Where does the ₱250–300 billion actually come from?",
      a: "60% = Provident Fund's own assets (₱1.23T total). Uses member contributions (₱80–100B/yr), investment income (₱9.43B/yr), loan repayments (₱40–50B/yr). 30% = NHMFC issues mortgage-backed bonds to pension funds and insurance companies — private capital, not government. 10% = Government budget (GAA), the only part needing Congress. Bottom line: 90% bypasses congressional approval entirely."
    },
  ];

  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} style={{ marginBottom: 12, borderRadius: 12, overflow: "hidden", border: `1px solid ${open === i ? C.blue + "60" : C.lightGray}`, transition: "all 0.2s" }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", textAlign: "left", padding: "14px 18px", background: open === i ? `${C.navy}08` : C.white, border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 13.5, color: C.navy, lineHeight: 1.4 }}>{f.q}</span>
            <span style={{ fontSize: 18, color: C.blue, flexShrink: 0, fontWeight: 300 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 18px 16px", background: `${C.navy}04`, fontSize: 13, color: C.text, lineHeight: 1.7 }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = ["Executive Summary", "The Problem", "The Solution", "Agency Roles", "Road Map", "FAQs"];

export default function DHSUDBlueprint() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ background: C.offWhite, minHeight: "100vh", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* HERO HEADER */}
      <div style={{
        background: `linear-gradient(140deg, ${C.navy} 0%, #1A3A7A 55%, #0A4D5E 100%)`,
        padding: "0 0 0",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: `${C.lightBlue}12` }} />
        <div style={{ position: "absolute", bottom: -40, left: 80, width: 180, height: 180, borderRadius: "50%", background: `${C.gold}10` }} />
        <div style={{ position: "absolute", top: 30, right: 120, width: 100, height: 100, borderRadius: "50%", background: `${C.teal}15` }} />

        <div style={{ maxWidth: 940, margin: "0 auto", padding: "40px 24px 0" }}>
          {/* DHSUD Logo Row */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
            {/* Logo mark */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: 16, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(212,160,23,0.5)" }}>
                <svg viewBox="0 0 48 48" width={44} height={44}>
                  {/* House shape */}
                  <polygon points="24,4 44,18 44,44 4,44 4,18" fill="none" stroke={C.navy} strokeWidth={3} strokeLinejoin="round" />
                  <polygon points="24,4 44,18 4,18" fill={C.navy} opacity={0.7} />
                  {/* Door */}
                  <rect x={19} y={30} width={10} height={14} rx={2} fill={C.navy} />
                  {/* Windows */}
                  <rect x={10} y={26} width={8} height={7} rx={1.5} fill={C.navy} opacity={0.7} />
                  <rect x={30} y={26} width={8} height={7} rx={1.5} fill={C.navy} opacity={0.7} />
                  {/* Sun/star */}
                  <circle cx={24} cy={14} r={2.5} fill={C.gold} />
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#85B4D9", fontWeight: 600, marginBottom: 4 }}>
                Republic of the Philippines
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.white, letterSpacing: 0.5 }}>
                Department of Human Settlements and Urban Development
              </div>
              <div style={{ fontSize: 11, color: "#7AB3D9", marginTop: 2 }}>
                DHSUD · Building Communities, Transforming Lives
              </div>
            </div>
          </div>

          {/* Main title */}
          <div style={{ borderLeft: `5px solid ${C.gold}`, paddingLeft: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontWeight: 700, marginBottom: 8 }}>
              Holistic Proposal
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, color: C.white, fontWeight: 800, lineHeight: 1.15 }}>
              DHSUD Blueprint<br />2026–2028
            </h1>
            <p style={{ margin: "12px 0 0", fontSize: 16, color: "#A8CDE8", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
              Breaking the Cycle: A New Housing Framework for the Philippines
            </p>
          </div>

          {/* Key numbers strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: `${C.white}15`, borderRadius: 12, overflow: "hidden", marginBottom: 0 }}>
            {[
              { v: "6.5M", l: "Families without\nadequate housing" },
              { v: "82.6%", l: "Cannot afford\nmarket housing" },
              { v: "₱250B+", l: "Capital mobilized\nwithout Congress" },
              { v: "40K/yr", l: "Target units by\n2028" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "18px 16px", background: `rgba(255,255,255,${i % 2 === 0 ? 0.06 : 0.09})`, textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 800, color: i === 0 ? C.crimson : i === 3 ? C.gold : C.sky }}>{s.v}</div>
                <div style={{ fontSize: 10.5, color: "#90BBDA", marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav Tabs */}
        <div style={{ maxWidth: 940, margin: "0 auto", padding: "20px 24px 0", display: "flex", gap: 4, overflowX: "auto" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: "10px 18px", borderRadius: "10px 10px 0 0", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap",
              background: tab === i ? C.offWhite : "rgba(255,255,255,0.1)",
              color: tab === i ? C.navy : C.white,
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* ═══ TAB 0: EXECUTIVE SUMMARY ═══════════════════════════════════════ */}
        {tab === 0 && (
          <>
            <Card>
              <SectionTitle num="◉" title="What Is This Blueprint?" />
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, margin: "0 0 16px" }}>
                The Philippine housing sector is at a breaking point. With only <strong>₱5.56 billion</strong> allocated for housing in 2026 — just <strong>2.5%</strong> of what was requested — the old approach of waiting for government money while families struggle is over.
              </p>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, margin: "0 0 16px" }}>
                This Blueprint proposes a <strong>fundamentally different system</strong> built on four pillars: separating land from housing (cutting costs by 40–60%), tapping ₱250–300 billion from existing funds without Congress, building complete townships (not isolated units), and partnering with local governments who know their communities best.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 20 }}>
                <Stat value="82.6%" label="Cannot afford market housing" sub="Even 'affordable' socialized units price out the bottom 30%" color={C.red} />
                <Stat value="6.5M" label="Families on housing backlog" sub="At 5,000 units/yr, takes 1,300 years to clear" color={C.navy} />
                <Stat value="90%" label="Capital needing no Congress vote" sub="Provident Fund + bond market funding" color={C.green} />
              </div>
            </Card>

            <Card>
              <SectionTitle num="◉" title="The Four Core Solutions at a Glance" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { n: "01", title: "50-Year Usufructuary Agreement", desc: "Govt keeps the land. Families own the house. Payments drop from ₱4,824 to ₱2,254/month. Anti-speculation rules prevent flipping.", color: C.navy, icon: "🏠" },
                  { n: "02", title: "Self-Sustaining Financing", desc: "60% from Provident Fund assets. 30% from mortgage-backed bonds sold to private investors. Only 10% from government budget.", color: C.teal, icon: "💼" },
                  { n: "03", title: "Integrated Township Development", desc: "Jobs, schools, clinics, markets — all within 15 minutes on foot. No more ghost towns. No more 3-hour commutes.", color: C.blue, icon: "🌆" },
                  { n: "04", title: "LGU Partnership & Land Strategy", desc: "Local governments know their land best. 100× cheaper provincial land + coordinated planning = affordable housing where people actually want to live.", color: C.gold, icon: "🤝" },
                ].map((s, i) => (
                  <div key={i} style={{ borderRadius: 12, padding: "18px 20px", background: `${s.color}08`, border: `1px solid ${s.color}30` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ fontSize: 24 }}>{s.icon}</div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: s.color, letterSpacing: 1.5 }}>SOLUTION {s.n}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>{s.title}</div>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle num="◉" title="Old System vs. New System" subtitle="The clearest way to understand why this Blueprint is different" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
                {[
                  { side: "Old Way", color: C.red, bg: `${C.red}06`, items: ["Wait for Congress to approve ₱225B → Get ₱5.5B", "Buy expensive land + expensive house", "Families can't afford → they sell or abandon", "Move poor families 100km from jobs", "Build 5,000 units/year", "Ghost towns, defaulted loans, stalled projects"] },
                  { side: "New Way", color: C.green, bg: `${C.green}06`, items: ["Use ₱250B from Provident Fund + bonds (no Congress)", "Govt keeps land → family pays only for house", "Monthly payments cut by 53% → families can stay", "Build townships near jobs, schools, transport", "Build 40,000 units/year by 2028", "Occupied, thriving, self-financing communities"] },
                ].map((col, ci) => (
                  <div key={ci} style={{ background: col.bg, padding: "18px 20px", borderRight: ci === 0 ? `1px solid ${C.lightGray}` : "none" }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: col.color, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 }}>{col.side}</div>
                    {col.items.map((it, ii) => (
                      <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
                        <span style={{ color: col.color, flexShrink: 0, fontWeight: 700 }}>{ci === 0 ? "✗" : "✓"}</span>
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ═══ TAB 1: THE PROBLEM ══════════════════════════════════════════════ */}
        {tab === 1 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Stat value="82.6%" label="Priced out of housing market" sub="Cannot afford market-rate homes" color={C.red} />
              <Stat value="6.5M" label="Families on housing backlog" sub="Without adequate shelter" color={C.navy} />
              <Stat value="58×" label="Metro Manila density vs national" sub="21,765 vs 376 people per km²" color={C.teal} />
            </div>

            <Card>
              <SectionTitle num="1" title="The Affordability Gap" subtitle="Most Filipino families earn too little to afford even the cheapest government housing — let alone anything on the market." />
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={affordabilityData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                  <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: C.muted }} />
                  <YAxis tickFormatter={v => `₱${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10.5, fill: C.muted }} />
                  <Tooltip content={<CustomTip fmt={peso} />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={4824} stroke={C.red} strokeWidth={2} strokeDasharray="6 3"
                    label={{ value: "₱4,824/mo required payment", position: "insideTopRight", fontSize: 11, fill: C.red, fontWeight: 700 }} />
                  <Bar dataKey="affordable" name="Max Affordable (30% of income)" fill={C.teal} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="income" name="Gross Monthly Income" fill={`${C.navy}30`} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <Insight color={C.red}>
                <strong>Bottom 30% (Deciles 1–3) cannot bridge this gap.</strong> A family earning ₱15,000/month paying ₱4,824/month for housing has only ₱10,176 left for food, transport, utilities, medicine, and children's education combined.
              </Insight>
              <Source text="PSA FIES 2021 (inflation-adjusted); UP CIDS August 2025; BP 220 affordability standard" />
            </Card>

            <Card>
              <SectionTitle num="2" title="What Houses Actually Cost (2025)" subtitle="Even 'socialized' housing is unaffordable for the families it's meant to serve." />
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={housingPrices} layout="vertical" margin={{ top: 0, right: 90, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} horizontal={false} />
                  <XAxis type="number" tickFormatter={v => `₱${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 11, fill: C.muted }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: C.text }} width={140} />
                  <Tooltip content={<CustomTip fmt={peso} />} />
                  <Bar dataKey="price" name="Median Price" radius={[0, 8, 8, 0]}>
                    {housingPrices.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    <LabelList dataKey="price" position="right" formatter={peso} style={{ fontSize: 11.5, fill: C.text, fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Source text="BSP RPPI Q3 2025; DHSUD-NEDA JMC 2025-001" />
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Card style={{ marginBottom: 0 }}>
                <SectionTitle num="3" title="Population Density" subtitle="Metro Manila is 58× more crowded than the national average." />
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={densityData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                    <XAxis dataKey="area" tick={{ fontSize: 10.5, fill: C.muted }} />
                    <YAxis tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} tick={{ fontSize: 10.5, fill: C.muted }} />
                    <Tooltip formatter={v => [`${v.toLocaleString()} / km²`, "Density"]} />
                    <Bar dataKey="density" radius={[5, 5, 0, 0]}>
                      {densityData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <Source text="PSA 2024 Census of Population" />
              </Card>

              <Card style={{ marginBottom: 0 }}>
                <SectionTitle num="4" title="Land Cost Disparity" subtitle="Metro Manila land is 100× more expensive than rural provinces." />
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={landData} layout="vertical" margin={{ top: 5, right: 70, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} horizontal={false} />
                    <XAxis type="number" tickFormatter={v => `₱${v.toLocaleString()}`} tick={{ fontSize: 9.5, fill: C.muted }} />
                    <YAxis dataKey="location" type="category" tick={{ fontSize: 11, fill: C.text }} width={110} />
                    <Tooltip formatter={v => [`₱${v.toLocaleString()}/m²`, "Land Cost"]} />
                    <Bar dataKey="cost" radius={[0, 5, 5, 0]}>
                      {landData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                      <LabelList dataKey="cost" position="right" formatter={v => `₱${v.toLocaleString()}`} style={{ fontSize: 11, fill: C.text, fontWeight: 600 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <Source text="InvestAsian, Colliers PH, Bamboo Routes 2024–25" />
              </Card>
            </div>

            <Card>
              <SectionTitle num="5" title="The Budget Reality: 10 Years of Under-Investment"
                subtitle="Housing has averaged just 0.3% of the national budget for a decade — a chronic neglect that created today's crisis." />
              <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12.5, color: C.muted }}>What was requested</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>₱225.8 Billion</span>
                    </div>
                    <div style={{ height: 28, background: C.navy, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                      <span style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>₱225.8B Full Request</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12.5, color: C.muted }}>What was actually given</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.red }}>₱5.56 Billion (2.5%)</span>
                    </div>
                    <div style={{ height: 28, background: `${C.red}15`, borderRadius: 6, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "2.46%", background: C.red, borderRadius: 6 }} />
                    </div>
                    <div style={{ fontSize: 10.5, color: C.muted, marginTop: 4 }}>← This red bar is proportionally accurate</div>
                  </div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <PieChart width={140} height={140}>
                    <Pie data={[{ value: 2.46, color: C.red }, { value: 97.54, color: C.lightGray }]}
                      cx={70} cy={70} innerRadius={42} outerRadius={60} dataKey="value" stroke="none">
                      {[C.red, C.lightGray].map((c, i) => <Cell key={i} fill={c} />)}
                    </Pie>
                  </PieChart>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.red, fontFamily: "Georgia, serif", marginTop: -8 }}>2.5%</div>
                  <div style={{ fontSize: 11, color: C.muted }}>of request fulfilled</div>
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 8 }}>10-Year Housing Budget as % of National Expenditure Program</div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={budgetTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="budGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.navy} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={C.navy} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: C.muted }} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: C.muted }} domain={[0, 0.5]} />
                  <Tooltip formatter={v => [`${v}%`, "% of NEP"]} />
                  <ReferenceLine y={0.3} stroke={C.gold} strokeDasharray="5 3"
                    label={{ value: "0.3% avg", position: "insideTopRight", fontSize: 10.5, fill: C.gold }} />
                  <Area type="monotone" dataKey="pct" name="% of NEP" stroke={C.navy} fill="url(#budGrad)" strokeWidth={2.5} dot={{ r: 3.5, fill: C.navy }} />
                </AreaChart>
              </ResponsiveContainer>
              <Insight color={C.red}>
                <strong>At 5,000 units/year, clearing the 6.5 million family backlog would take 1,300 years.</strong> This is not a budget challenge — it's a systemic failure that requires a completely new approach to financing.
              </Insight>
              <Source text="DHSUD FY 2026 Budget Briefer (September 2025); Department of Budget and Management" />
            </Card>

            <Card>
              <SectionTitle num="6" title="2026 Housing Budget by Agency" subtitle="₱5.56 billion distributed across all housing agencies — not even enough to make a dent." />
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={agencyBudget} layout="vertical" margin={{ top: 0, right: 90, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} horizontal={false} />
                  <XAxis type="number" tickFormatter={v => `₱${v}M`} tick={{ fontSize: 11, fill: C.muted }} />
                  <YAxis dataKey="agency" type="category" tick={{ fontSize: 13, fill: C.text }} width={55} />
                  <Tooltip formatter={v => [`₱${v.toLocaleString()}M`, "2026 Allocation"]} />
                  <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                    {agencyBudget.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    <LabelList dataKey="amount" position="right" formatter={v => `₱${v.toLocaleString()}M`} style={{ fontSize: 11, fill: C.text, fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Source text="DHSUD FY 2026 Budget Briefer, September 2025" />
            </Card>
          </>
        )}

        {/* ═══ TAB 2: THE SOLUTION ══════════════════════════════════════════════ */}
        {tab === 2 && (
          <>
            <Card>
              <SectionTitle num="7" title="Solution 1: The 50-Year Usufruct — Breaking the Land Cost Trap"
                subtitle="The government owns the land. Families own the house. Monthly payments drop by 53% immediately." />
              <ComparisonBlock />
              <Insight color={C.green}>
                <strong>₱2,570 saved every month = ₱30,840 per year.</strong> That's a month of groceries, one child's school fees for a term, or the beginning of an emergency fund. Singapore used this exact model since the 1960s and achieved an 89% homeownership rate with 80% of residents in public housing.
              </Insight>
              <div style={{ marginTop: 16, padding: "14px 18px", background: `${C.navy}06`, borderRadius: 10, border: `1px solid ${C.navy}20` }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 8 }}>Anti-Speculation Protections Built In:</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["Cannot sell to outside buyers at market prices", "Can only sell back to govt or another qualified low-income family", "Sale price is capped (original + documented improvements)", "Agreement renewable after 50 years or passed to children"].map((t, i) => (
                    <div key={i} style={{ fontSize: 12.5, color: C.text, display: "flex", gap: 8 }}>
                      <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle num="8" title="Solution 2: Self-Sustaining Financing"
                subtitle="₱250–300 billion mobilized from three sources — 90% without any vote from Congress." />
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 28, alignItems: "center", marginBottom: 20 }}>
                <div style={{ textAlign: "center" }}>
                  <PieChart width={170} height={170}>
                    <Pie data={financingMix} cx={85} cy={85} innerRadius={48} outerRadius={72} dataKey="value" stroke="none">
                      {financingMix.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: -8 }}>₱250–300B Total (2026–28)</div>
                </div>
                <div>
                  {[
                    { pct: "60%", name: "Provident Fund (₱150–180B)", desc: "Uses its own ₱1.23T in assets + ₱9.43B investment income. Internal capital — NO Congress needed.", color: C.navy },
                    { pct: "30%", name: "NHMFC Bonds (₱75–90B)", desc: "Sells mortgage-backed bonds to pension funds and insurance companies. Private capital recycled continuously.", color: C.teal },
                    { pct: "10%", name: "Government Budget (₱25–30B)", desc: "For poorest families and public rental only. The ONLY portion requiring congressional approval.", color: C.gold },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14, padding: "12px 14px", borderRadius: 10, background: `${s.color}08`, border: `1px solid ${s.color}25` }}>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 800, color: s.color, flexShrink: 0, lineHeight: 1 }}>{s.pct}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 3 }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 10 }}>Capital Deployed Each Year (₱ Billions)</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={capitalByYear} margin={{ top: 10, right: 60, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: C.muted }} />
                  <YAxis tickFormatter={v => `₱${v}B`} tick={{ fontSize: 11, fill: C.muted }} />
                  <Tooltip formatter={(v, n) => [`₱${v}B`, n]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="pf" name="Provident Fund" stackId="a" fill={C.navy} />
                  <Bar dataKey="bonds" name="NHMFC Bonds" stackId="a" fill={C.teal} />
                  <Bar dataKey="gaa" name="Gov't Budget" stackId="a" fill={C.gold} radius={[5, 5, 0, 0]}>
                    <LabelList valueAccessor={d => d.pf + d.bonds + d.gaa} position="top"
                      formatter={v => `₱${v.toFixed(1)}B`} style={{ fontSize: 12, fill: C.text, fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 10 }}>How NHMFC Creates ₱50B in New Capital (Bond Market Cycle)</div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={nhmfcCycle} margin={{ top: 5, right: 40, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: C.muted }} />
                    <YAxis tickFormatter={v => `₱${v}B`} tick={{ fontSize: 11, fill: C.muted }} />
                    <Tooltip formatter={v => [`₱${v}B`, ""]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="mortgages" name="Mortgages Purchased (₱B)" fill={C.midBlue} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bonds" name="Bonds Issued (₱B)" fill={C.sky} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 10 }}>Provident Fund Annual Capital Flow (₱ Billions)</div>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={providentFundFlow} layout="vertical" margin={{ top: 0, right: 60, left: 30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} horizontal={false} />
                    <XAxis type="number" tickFormatter={v => `₱${v}B`} tick={{ fontSize: 11, fill: C.muted }} />
                    <YAxis dataKey="source" type="category" tick={{ fontSize: 11, fill: C.text }} width={150} />
                    <Tooltip formatter={v => [`₱${v}B`, "Annual Flow"]} />
                    <Bar dataKey="amount" fill={C.navy} radius={[0, 6, 6, 0]}>
                      <LabelList dataKey="amount" position="right" formatter={v => `₱${v}B`} style={{ fontSize: 11.5, fill: C.text, fontWeight: 700 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Source text="Provident Fund 2025 Annual Report; NHMFC Bahay Bonds precedent; DHSUD Budget Briefer 2026" />
            </Card>

            <Card>
              <SectionTitle num="9" title="Solution 3: The 15-Minute Township"
                subtitle="Build complete communities — not isolated houses. Everything a family needs within 15 minutes on foot." />
              <TownshipIllustration />
              <Insight color={C.teal}>
                <strong>Poor families spend 15–20% of income on transportation.</strong> Proximity is affordability. Every township must be within 2km of a train station (Metro Manila Subway, NSCR, LRT, MRT). Target: combined housing + transport costs below 45% of family income.
              </Insight>
            </Card>

            <Card>
              <SectionTitle num="10" title="Solution 4: LGU Partnership & Strategic Land"
                subtitle="Local governments know their land. Provincial land is 5–100× cheaper. This is where we build." />
              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 10 }}>Regional Population vs. Land Cost — Where to Build</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={regionalData} margin={{ top: 10, right: 90, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                  <XAxis dataKey="region" tick={{ fontSize: 11.5, fill: C.muted }} />
                  <YAxis yAxisId="left" tickFormatter={v => `${v}M`} tick={{ fontSize: 11, fill: C.muted }} label={{ value: "Population (M)", angle: -90, position: "insideLeft", fontSize: 11, fill: C.muted }} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={v => `₱${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: C.red }} label={{ value: "Land ₱/m²", angle: 90, position: "insideRight", fontSize: 11, fill: C.red }} />
                  <Tooltip formatter={(v, n) => n === "Population (M)" ? [`${v}M people`, n] : [`₱${v.toLocaleString()}/m²`, n]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="pop" name="Population (M)" radius={[5, 5, 0, 0]}>
                    {regionalData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Bar>
                  <Line yAxisId="right" type="monotone" dataKey="land" name="Land Cost (₱/m²)" stroke={C.red} strokeWidth={2.5} dot={{ r: 5, fill: C.red }} />
                </BarChart>
              </ResponsiveContainer>
              <Insight color={C.green}>
                <strong>CALABARZON has MORE people than Metro Manila (16.4M vs 14M)</strong> with land 5–20× cheaper. Central Luzon, Cebu, and Davao offer similar opportunities. Building here means cheaper housing AND decongesting Metro Manila — a double win.
              </Insight>
              <Source text="PSA 2024 Census; Colliers Philippines 2024–25; InvestAsian; Bamboo Routes" />
            </Card>
          </>
        )}

        {/* ═══ TAB 3: AGENCY ROLES ═════════════════════════════════════════════ */}
        {tab === 3 && (
          <>
            <Card>
              <SectionTitle num="◉" title="Seven Agencies, One System"
                subtitle="Each agency has a specific, non-overlapping role. Click any agency to see its mandate and 2026–2028 targets." />
              <AgencyCards />
            </Card>

            <Card>
              <SectionTitle num="◉" title="How All Agencies Work Together: The Bulacan Township Example" />
              <Timeline />
            </Card>

            <Card>
              <SectionTitle num="◉" title="Agency Performance Scoreboard (2026–2028 Targets)" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { agency: "Provident Fund", targets: ["360,000 housing loans (120K/yr)", "72-hour digital approval system", "3% rate for lowest-income borrowers", "Non-performing loans below 5%"], color: C.navy },
                  { agency: "NHMFC", targets: ["₱50B in mortgage-backed securities", "10,000+ mortgages purchased", "Bonds placed with private investors", "Reduce govt housing loan exposure"], color: C.teal },
                  { agency: "NHA", targets: ["15,000 public rental units built", "₱1,500–₱3,500/month rent range", "50,000 old units retrofitted", "100% occupancy (no ghost towns)"], color: C.midBlue },
                  { agency: "SHFC", targets: ["50,000 families with secure tenure", "₱250M in community mortgage loans", "15,000 incremental housing units", "25% of loans to rural areas"], color: C.lightBlue },
                  { agency: "PHILGUARANTEE", targets: ["₱5B in municipal housing bonds", "15 cities enabled to self-finance", "₱10B in developer loan support", "Interest rates from 8% → 4–6%"], color: C.gold },
                  { agency: "DHSUD / HSAC", targets: ["100% cities update land-use plans", "80% permits processed in 30 days", "Zero permit backlog", "100% cases resolved on time"], color: C.green },
                ].map((a, i) => (
                  <div key={i} style={{ borderRadius: 12, padding: "16px 18px", background: `${a.color}08`, border: `1px solid ${a.color}30` }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: a.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>{a.agency}</div>
                    {a.targets.map((t, ti) => (
                      <div key={ti} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
                        <span style={{ color: a.color, flexShrink: 0 }}>🎯</span>{t}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ═══ TAB 4: ROAD MAP ══════════════════════════════════════════════════ */}
        {tab === 4 && (
          <>
            <Card>
              <SectionTitle num="◉" title="Housing Production: From 7,500 to 40,000+ Units Per Year"
                subtitle="Under self-sustaining financing, production scales 5× compared to current output by the end of the Blueprint period." />
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={unitsTarget} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: C.muted }} />
                  <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: C.muted }} />
                  <Tooltip formatter={v => [`${v.toLocaleString()} units`, "Housing Units"]} />
                  <Bar dataKey="units" radius={[7, 7, 0, 0]}>
                    {unitsTarget.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    <LabelList dataKey="units" position="top" formatter={v => `${(v / 1000).toFixed(0)}K`} style={{ fontSize: 13, fill: C.text, fontWeight: 800 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Insight color={C.navy}>
                <strong>Old system:</strong> ₱5.5B budget → 5,000 units/year · <strong>New system:</strong> ₱250B from existing sources → 40,000 units/year by 2028. The difference isn't more money from Congress — it's a smarter system that doesn't depend on Congress.
              </Insight>
              <Source text="DHSUD internal projections; Provident Fund capacity analysis" />
            </Card>

            <Card>
              <SectionTitle num="◉" title="Implementation Roadmap by Year" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  {
                    year: "2026", color: C.teal, emoji: "🌱", title: "Build the Foundation",
                    items: ["Issue usufruct standards and guidelines", "Launch 10 pilot townships nationally", "Provident Fund 72-hr approval system live", "NHMFC issues first ₱10B in bonds", "DHSUD digital permitting platform launched", "All LGUs submit updated land-use plans"]
                  },
                  {
                    year: "2027", color: C.blue, emoji: "📈", title: "Scale What Works",
                    items: ["Expand to 30+ townships based on pilots", "17,500 units delivered", "NHMFC issues ₱20B in bonds", "15 cities self-financing housing", "SHFC reaches 25,000 families", "NHA completes 7,500 rental units"],
                  },
                  {
                    year: "2028", color: C.gold, emoji: "🏆", title: "Full System Operation",
                    items: ["25,000+ units produced annually", "50,000 families with secure tenure", "NHMFC ₱50B total bonds issued", "360,000 total Provident Fund loans", "15,000 NHA rental units completed", "System ready to sustain 40K+/yr by 2029"],
                  },
                ].map((yr, i) => (
                  <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: `2px solid ${yr.color}30` }}>
                    <div style={{ background: yr.color, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{yr.emoji}</span>
                      <div>
                        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 800, color: C.white }}>{yr.year}</div>
                        <div style={{ fontSize: 11, color: `${C.white}CC` }}>{yr.title}</div>
                      </div>
                    </div>
                    <div style={{ padding: "16px 18px", background: `${yr.color}06` }}>
                      {yr.items.map((it, ii) => (
                        <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 9, fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
                          <span style={{ color: yr.color, flexShrink: 0 }}>→</span>{it}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle num="◉" title="Ghost Town Prevention: Mandatory Requirements"
                subtitle="Previous projects failed because they were built far from jobs with no services. This Blueprint makes livability mandatory — not optional." />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { icon: "💼", title: "Jobs First Rule", desc: "No township gets approved unless 1,000+ jobs exist within 30 minutes of the site. Employment before housing.", color: C.navy },
                  { icon: "🚊", title: "Transport Connection Required", desc: "Every township must connect to existing or planned rail/bus routes. Priority: within 2km of train stations.", color: C.teal },
                  { icon: "🏫", title: "School Mandatory", desc: "Elementary school required for any township over 1,000 units. High school for 3,000+ units. No exceptions.", color: C.blue },
                  { icon: "📊", title: "Occupancy Tracked", desc: "Projects must maintain 95% occupancy. Tracked every 6 months. If below target, corrective plans required.", color: C.gold },
                  { icon: "🧪", title: "Pilot Before National Scale", desc: "10 pilot townships in 2026. Learn, adjust, then scale nationally in 2027–2028. No rush to repeat old mistakes.", color: C.green },
                  { icon: "👨‍👩‍👧", title: "Community Participation", desc: "Homeowners associations mandatory from Day 1. Residents manage common areas and community standards.", color: C.midBlue },
                ].map((r, i) => (
                  <div key={i} style={{ borderRadius: 10, padding: "14px 16px", background: `${r.color}08`, border: `1px solid ${r.color}25`, display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: r.color, marginBottom: 4 }}>{r.title}</div>
                      <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ═══ TAB 5: FAQs ══════════════════════════════════════════════════════ */}
        {tab === 5 && (
          <>
            <Card>
              <SectionTitle num="◉" title="Addressing the Hard Questions"
                subtitle="The five most common objections to this Blueprint — answered directly and honestly." />
              <FAQ />
            </Card>

            <Card>
              <SectionTitle num="◉" title="Why the Philippines, Why Now?" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {[
                  { title: "Singapore Proof", desc: "Singapore used 99-year leasehold (similar to usufruct) since the 1960s. Today: 89% homeownership, 80% in public housing, one of the world's most stable property markets.", icon: "🇸🇬", color: C.teal },
                  { title: "CALABARZON Success", desc: "When industries moved from Metro Manila to CALABARZON, the region grew to 16.4M people — bigger than Metro Manila. Regional growth IS possible and is already happening.", icon: "🌏", color: C.green },
                  { title: "Bahay Bonds Precedent", desc: "NHMFC already issued mortgage-backed 'Bahay Bonds' successfully before. This is not a new concept — this Blueprint scales what already works.", icon: "📋", color: C.blue },
                ].map((e, i) => (
                  <div key={i} style={{ borderRadius: 12, padding: "18px 16px", background: `${e.color}08`, border: `1px solid ${e.color}30` }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{e.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: e.color, marginBottom: 8 }}>{e.title}</div>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.65 }}>{e.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle num="◉" title="The Bottom Line" />
              <div style={{ background: `linear-gradient(135deg, ${C.navy}08 0%, ${C.teal}08 100%)`, borderRadius: 14, padding: "28px 30px", border: `1px solid ${C.navy}20`, textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.navy, fontWeight: 700, lineHeight: 1.5, marginBottom: 16 }}>
                  "This is not about building more units faster.<br />This is about creating a system that actually works for Filipino families."
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 24 }}>
                  {[
                    { label: "Monthly savings per family", v: "₱2,570", color: C.green },
                    { label: "Units by 2028", v: "25,000+/yr", color: C.blue },
                    { label: "Gov't subsidy needed", v: "₱0", color: C.gold },
                  ].map((s, i) => (
                    <div key={i} style={{ background: C.white, borderRadius: 12, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 800, color: s.color }}>{s.v}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ background: C.navy, color: "#7AABBF", textAlign: "center", padding: "20px 24px", fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: C.white, marginBottom: 4 }}>DHSUD Blueprint 2026–2028 · Holistic Proposal</div>
        <div>Breaking the Cycle: A New Housing Framework for the Philippines · Prepared March 2026</div>
        <div style={{ marginTop: 6, fontSize: 11, color: "#5A8FAA" }}>
          Data sources: PSA 2024 Census · BSP RPPI Q3 2025 · DHSUD FY 2026 Budget Briefer · UP CIDS August 2025 · Provident Fund 2025 Annual Report · DBM · Colliers PH · InvestAsian
        </div>
      </div>
    </div>
  );
}
