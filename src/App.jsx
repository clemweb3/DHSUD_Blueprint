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
  { label: "D1 ₱11.9K", affordable: 3582, required: 4824, income: 11940 },
  { label: "D2 ₱13.7K", affordable: 4097, required: 4824, income: 13655 },
  { label: "D3 ₱15.7K", affordable: 4705, required: 4824, income: 15684 },
  { label: "D4 ₱17.4K", affordable: 5211, required: 4824, income: 17369 },
  { label: "D5 ₱22.6K", affordable: 6780, required: 4824, income: 22600 },
  { label: "D6 ₱28.8K", affordable: 8630, required: 4824, income: 28765 },
  { label: "D7 ₱34.6K", affordable: 10380, required: 4824, income: 34600 },
  { label: "D8 ₱48.1K", affordable: 14436, required: 4824, income: 48120 },
  { label: "D9 ₱80K", affordable: 24000, required: 4824, income: 80000 },
  { label: "D10 ₱200K", affordable: 60000, required: 4824, income: 200000 },
];

const housingPrices = [
  { name: "Socialized Horiz. (₱950K)", price: 950000, fill: C.teal },
  { name: "Socialized Vert. (₱1.8M)", price: 1800000, fill: C.green },
  { name: "National Median House", price: 2950000, fill: C.midBlue },
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
  { year: "Current", units: 7500, fill: C.gray },
  { year: "2026", units: 10000, fill: C.lightBlue },
  { year: "2027", units: 22000, fill: C.midBlue },
  { year: "2028", units: 25000, fill: C.blue },
  { year: "2029–30 Goal", units: 45000, fill: C.gold },
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

// ─── TOWNSHIP ILLUSTRATION — Full City Plan Map ───────────────────────────────
const TownshipIllustration = () => {
  const [activeZone, setActiveZone] = useState(null);

  const zoneInfo = {
    residential: {
      color: C.navy, label: "Residential Zone", icon: "🏘️",
      desc: "Mid-rise housing (4–6 floors), 500–5,000 units total. Mix of unit sizes for all family types. Homeowners' association mandatory from Day 1. 50-year usufractuary agreements: families own the house structure, government permanently retains the land — anti-speculation rules prevent flipping.",
    },
    education: {
      color: C.teal, label: "Education Zone", icon: "🎓",
      desc: "Elementary school within 10-min walk (mandatory for 1,000+ unit townships). Senior High School with TVL tracks aligned to the specific industries in the Employment Zone (3,000+ units). TESDA-accredited centre in commercial/employment zone. ALS delivery point in the Community Centre for adult residents. TVL–industry alignment certified jointly by DTI and DepEd before township approval.",
    },
    employment: {
      color: "#2369A8", label: "Employment Zone", icon: "🏭",
      desc: "Light manufacturing, BPO, cooperatives. DTI Shared Service Facility (SSF) node pre-installed before certificate of occupancy. Mandatory: minimum 1,000 jobs within 30 minutes by public transport — a required approval condition, not a target. Industrial specialisation determined at planning stage with DTI and LGU: garment corridor, electronics, agro-processing, or BPO, depending on regional context.",
    },
    commercial: {
      color: "#B8860B", label: "Market & Commerce", icon: "🏪",
      desc: "Public market, grocery, banks, remittance centres — all within 5-minute walking radius. Negosyo Center (RA 10644) co-located in commercial area. DTI Sari-Sari Store Diversification Program upgrades neighbourhood retailers to include financial services and digital payments from Day 1. BMBE Act (RA 9178) tax exemptions encourage formalisation of micro-enterprises.",
    },
    health: {
      color: "#1A7A4A", label: "Health & Wellness", icon: "🏥",
      desc: "Barangay Health Station operational from Day 1 with min. 1 trained BHW per 20 households (RA 7883). Rural Health Unit with full clinical services for townships of 2,000+ units. PhilHealth enrollment assistance for all qualifying households at turnover. School-Based Feeding Program activated in the township elementary school from its first academic year. Mental health and psychosocial support referral pathway — critical for families transitioning from informal settlements.",
    },
    transport: {
      color: C.red, label: "Transport Hub", icon: "🚊",
      desc: "Priority location: within 2km of rail station (MRT, LRT, Metro Manila Subway, NSCR) or major highway with regular bus service. Internal bike lanes and community shuttles. Target: combined housing + transport costs below 45% of family income. Poor families currently spend 15–20% of income on transportation — proximity is affordability.",
    },
    park: {
      color: "#0D9060", label: "Green Spaces & Parks", icon: "🌳",
      desc: "Parks and playgrounds within 5-minute walk from every home. Permeable paving, stormwater management systems, rooftop gardens reduce urban heat island effect. Community gardens preserve cultural agricultural practices and provide food security. Green space is both a mandatory resilience feature and a condition of township approval.",
    },
    center: {
      color: C.midBlue, label: "Community Center", icon: "🏛️",
      desc: "Multi-use hub for: cultural activities (heritage dimension — preserving kinship networks and community identity), ALS delivery for adult residents lacking formal credentials, DOLE Kabuhayan Program and DSWD SLP pre-deployed before occupancy, barangay health functions, cooperative governance. The heritage dimension requires that communities are not merely housed — they are culturally sustained.",
    },
  };

  const toggle = (zone) => setActiveZone(activeZone === zone ? null : zone);
  const alpha = (zone, a) => {
    if (!activeZone) return a;
    return activeZone === zone ? "FF" : "44";
  };
  const zfill = (zone, baseAlpha = "EE") => `${zoneInfo[zone].color}${alpha(zone, baseAlpha)}`;

  // Small building footprints helper: fills a block with tiny building rects
  const bldgs = (x, y, w, h, cols, rows) => {
    const pw = (w - (cols + 1) * 3) / cols;
    const ph = (h - (rows + 1) * 3) / rows;
    return Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      return { x: x + 3 + c * (pw + 3), y: y + 3 + r * (ph + 3), w: pw, h: ph };
    });
  };

  const CX = 354, CY = 258; // map center

  return (
    <div>
      {/* Title bar */}
      <div style={{ background: C.navy, borderRadius: "10px 10px 0 0", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: C.white, fontSize: 13, fontWeight: 700 }}>🏙️ Integrated Heritage Community — 15-Minute Township Plan</div>
        <div style={{ fontSize: 11, color: "#7AABBF" }}>Click any zone for details</div>
      </div>

      {/* MAP SVG */}
      <svg width="100%" viewBox="0 0 800 520" style={{ display: "block", background: "#BFC8D8" }}>

        {/* ── ZONE BLOCKS ── */}

        {/* TRANSPORT HUB — top left */}
        <rect x={4} y={4} width={140} height={108} rx={5} fill={zfill("transport")} style={{ cursor: "pointer" }} onClick={() => toggle("transport")} />
        {/* Station platform */}
        <rect x={14} y={56} width={120} height={18} rx={3} fill="#FFFFFF" opacity={0.25} />
        <rect x={14} y={20} width={55} height={30} rx={3} fill="#FFFFFF" opacity={0.2} />
        <rect x={76} y={20} width={58} height={30} rx={3} fill="#FFFFFF" opacity={0.2} />
        {/* Track lines */}
        <line x1={14} y1={78} x2={134} y2={78} stroke="#FFFFFF" strokeWidth={2} opacity={0.4} strokeDasharray="8 4" />
        <line x1={14} y1={84} x2={134} y2={84} stroke="#FFFFFF" strokeWidth={2} opacity={0.4} strokeDasharray="8 4" />

        {/* EDUCATION — top center-left */}
        <rect x={148} y={4} width={216} height={108} rx={5} fill={zfill("education")} style={{ cursor: "pointer" }} onClick={() => toggle("education")} />
        {/* Main school building */}
        <rect x={158} y={12} width={196} height={52} rx={4} fill="#FFFFFF" opacity={0.22} />
        {/* Classroom windows */}
        {[0,1,2,3,4,5].map(i => <rect key={i} x={162 + i * 32} y={18} width={22} height={14} rx={2} fill="#FFFFFF" opacity={0.3} />)}
        {/* Second row: smaller buildings */}
        <rect x={158} y={70} width={90} height={34} rx={3} fill="#FFFFFF" opacity={0.18} />
        <rect x={256} y={70} width={98} height={34} rx={3} fill="#FFFFFF" opacity={0.18} />

        {/* EDUCATION — top center-right */}
        <rect x={368} y={4} width={184} height={108} rx={5} fill={zfill("education")} style={{ cursor: "pointer" }} onClick={() => toggle("education")} />
        <rect x={378} y={12} width={164} height={52} rx={4} fill="#FFFFFF" opacity={0.22} />
        {[0,1,2,3].map(i => <rect key={i} x={382 + i * 40} y={18} width={30} height={14} rx={2} fill="#FFFFFF" opacity={0.3} />)}
        <rect x={378} y={70} width={76} height={34} rx={3} fill="#FFFFFF" opacity={0.18} />
        <rect x={462} y={70} width={80} height={34} rx={3} fill="#FFFFFF" opacity={0.18} />

        {/* GREEN SPACE — top right */}
        <rect x={556} y={4} width={240} height={108} rx={5} fill={zfill("park")} style={{ cursor: "pointer" }} onClick={() => toggle("park")} />
        {[[572,16,20],[606,22,16],[638,14,18],[672,24,14],[706,16,18],[738,20,14],[762,14,16],[578,60,14],[614,54,18],[650,62,12],[686,54,16],[720,62,14]].map(([tx,ty,tr],i) => (
          <circle key={i} cx={tx} cy={ty} r={tr} fill="#FFFFFF" opacity={0.22} />
        ))}
        {/* Pond */}
        <ellipse cx={680} cy={85} rx={40} ry={16} fill="#FFFFFF" opacity={0.2} />

        {/* EMPLOYMENT — left column */}
        <rect x={4} y={116} width={140} height={156} rx={5} fill={zfill("employment")} style={{ cursor: "pointer" }} onClick={() => toggle("employment")} />
        {/* Factory buildings */}
        {[[10,122,62,44],[80,122,58,44],[10,174,130,24],[10,204,60,32],[78,204,58,32],[10,244,128,22]].map(([bx,by,bw,bh],i) => (
          <rect key={i} x={bx} y={by} width={bw} height={bh} rx={2} fill="#FFFFFF" opacity={0.18} />
        ))}
        {/* Smokestacks */}
        <rect x={22} y={108} width={8} height={18} rx={2} fill="#FFFFFF" opacity={0.3} />
        <rect x={36} y={112} width={6} height={14} rx={2} fill="#FFFFFF" opacity={0.3} />

        <rect x={4} y={276} width={140} height={120} rx={5} fill={zfill("employment")} style={{ cursor: "pointer" }} onClick={() => toggle("employment")} />
        {[[10,282,60,36],[78,282,58,36],[10,326,62,30],[80,326,58,30],[10,362,128,28]].map(([bx,by,bw,bh],i) => (
          <rect key={i} x={bx} y={by} width={bw} height={bh} rx={2} fill="#FFFFFF" opacity={0.18} />
        ))}

        {/* RESIDENTIAL BLOCKS — NW quadrant (with sub-streets) */}
        <rect x={148} y={116} width={216} height={156} rx={5} fill={zfill("residential")} style={{ cursor: "pointer" }} onClick={() => toggle("residential")} />
        {/* Sub-streets inside */}
        <rect x={148} y={194} width={216} height={6} fill="#BFC8D8" />
        <rect x={258} y={116} width={6} height={156} fill="#BFC8D8" />
        {/* 4 sub-blocks with apartment buildings */}
        {bldgs(152, 120, 100, 68, 3, 3).map((b,i) => <rect key={`rnw1-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(268, 120, 92, 68, 3, 3).map((b,i) => <rect key={`rnw2-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(152, 204, 100, 62, 3, 2).map((b,i) => <rect key={`rnw3-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(268, 204, 92, 62, 3, 2).map((b,i) => <rect key={`rnw4-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}

        {/* RESIDENTIAL + COMMUNITY CENTER — NE quadrant */}
        <rect x={368} y={116} width={184} height={156} rx={5} fill={zfill("residential")} style={{ cursor: "pointer" }} onClick={() => toggle("residential")} />
        <rect x={368} y={194} width={184} height={6} fill="#BFC8D8" />
        <rect x={460} y={116} width={6} height={156} fill="#BFC8D8" />
        {bldgs(372, 120, 82, 68, 2, 3).map((b,i) => <rect key={`rne1-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(470, 120, 78, 68, 2, 3).map((b,i) => <rect key={`rne2-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(372, 204, 82, 62, 2, 2).map((b,i) => <rect key={`rne3-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(470, 204, 78, 62, 2, 2).map((b,i) => <rect key={`rne4-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {/* Community Center overlay (over the sub-streets intersection) */}
        <rect x={400} y={144} width={108} height={76} rx={8}
          fill={activeZone === "center" ? zoneInfo.center.color : `${zoneInfo.center.color}F0`}
          stroke="#FFFFFF" strokeWidth={2.5} style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); toggle("center"); }} />
        <circle cx={454} cy={182} r={22} fill="#FFFFFF" opacity={0.12} />
        <circle cx={454} cy={182} r={12} fill="#FFFFFF" opacity={0.18} />
        <circle cx={454} cy={182} r={5} fill="#FFFFFF" opacity={0.35} />

        {/* COMMERCIAL — right column */}
        <rect x={556} y={116} width={240} height={156} rx={5} fill={zfill("commercial")} style={{ cursor: "pointer" }} onClick={() => toggle("commercial")} />
        {[0,1,2].map(row => [0,1,2,3].map(col => (
          <rect key={`ct-${row}-${col}`} x={562 + col*58} y={122 + row*48} width={50} height={38} rx={3} fill="#FFFFFF" opacity={0.2} />
        )))}
        {/* Market canopy */}
        <rect x={562} y={214} width={228} height={52} rx={3} fill="#FFFFFF" opacity={0.15} />
        {[0,1,2,3,4,5].map(i => <line key={i} x1={562 + i*40} y1={214} x2={562 + i*40} y2={266} stroke="#FFFFFF" strokeWidth={1.5} opacity={0.3} />)}

        <rect x={556} y={276} width={240} height={120} rx={5} fill={zfill("commercial")} style={{ cursor: "pointer" }} onClick={() => toggle("commercial")} />
        {[0,1,2].map(row => [0,1,2,3].map(col => (
          <rect key={`cb-${row}-${col}`} x={562 + col*58} y={282 + row*36} width={50} height={28} rx={3} fill="#FFFFFF" opacity={0.2} />
        )))}

        {/* RESIDENTIAL — SW quadrant */}
        <rect x={148} y={276} width={216} height={120} rx={5} fill={zfill("residential")} style={{ cursor: "pointer" }} onClick={() => toggle("residential")} />
        <rect x={258} y={276} width={6} height={120} fill="#BFC8D8" />
        <rect x={148} y={336} width={216} height={6} fill="#BFC8D8" />
        {bldgs(152, 280, 100, 50, 3, 2).map((b,i) => <rect key={`rsw1-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(268, 280, 92, 50, 3, 2).map((b,i) => <rect key={`rsw2-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(152, 346, 100, 44, 3, 2).map((b,i) => <rect key={`rsw3-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(268, 346, 92, 44, 3, 2).map((b,i) => <rect key={`rsw4-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}

        {/* RESIDENTIAL — SE quadrant */}
        <rect x={368} y={276} width={184} height={120} rx={5} fill={zfill("residential")} style={{ cursor: "pointer" }} onClick={() => toggle("residential")} />
        <rect x={460} y={276} width={6} height={120} fill="#BFC8D8" />
        <rect x={368} y={336} width={184} height={6} fill="#BFC8D8" />
        {bldgs(372, 280, 82, 50, 2, 2).map((b,i) => <rect key={`rse1-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(470, 280, 78, 50, 2, 2).map((b,i) => <rect key={`rse2-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(372, 346, 82, 44, 2, 2).map((b,i) => <rect key={`rse3-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}
        {bldgs(470, 346, 78, 44, 2, 2).map((b,i) => <rect key={`rse4-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#FFFFFF" opacity={0.2} />)}

        {/* GREEN SW */}
        <rect x={4} y={400} width={140} height={116} rx={5} fill={zfill("park")} style={{ cursor: "pointer" }} onClick={() => toggle("park")} />
        {[[16,414,16],[44,424,12],[72,410,18],[96,428,11],[118,416,14],[130,432,10]].map(([tx,ty,tr],i) => (
          <circle key={i} cx={tx} cy={ty} r={tr} fill="#FFFFFF" opacity={0.22} />
        ))}
        <ellipse cx={74} cy={476} rx={36} ry={14} fill="#FFFFFF" opacity={0.18} />

        {/* HEALTH ZONE — bottom center */}
        <rect x={148} y={400} width={404} height={116} rx={5} fill={zfill("health")} style={{ cursor: "pointer" }} onClick={() => toggle("health")} />
        {/* RHU main building */}
        <rect x={380} y={412} width={130} height={90} rx={5} fill="#FFFFFF" opacity={0.2} />
        {/* BHS small buildings */}
        <rect x={158} y={412} width={80} height={50} rx={4} fill="#FFFFFF" opacity={0.2} />
        <rect x={246} y={412} width={80} height={50} rx={4} fill="#FFFFFF" opacity={0.2} />
        <rect x={332} y={412} width={40} height={50} rx={4} fill="#FFFFFF" opacity={0.2} />
        {/* Health crosses */}
        {[200, 288].map(hx => (
          <g key={hx}>
            <rect x={hx-3} y={424} width={6} height={20} rx={1} fill="#FFFFFF" opacity={0.55} />
            <rect x={hx-10} y={431} width={20} height={6} rx={1} fill="#FFFFFF" opacity={0.55} />
          </g>
        ))}
        {/* RHU cross */}
        <rect x={441} y={428} width={8} height={26} rx={1} fill="#FFFFFF" opacity={0.5} />
        <rect x={429} y={437} width={32} height={8} rx={1} fill="#FFFFFF" opacity={0.5} />
        {/* Feeding area */}
        <rect x={158} y={468} width={212} height={40} rx={4} fill="#FFFFFF" opacity={0.15} />

        {/* GREEN SE */}
        <rect x={556} y={400} width={240} height={116} rx={5} fill={zfill("park")} style={{ cursor: "pointer" }} onClick={() => toggle("park")} />
        {[[568,414,14],[596,422,18],[628,412,16],[660,426,12],[690,414,18],[720,422,14],[752,412,16],[574,470,12],[612,464,16],[648,472,10],[684,466,14],[718,474,12],[750,464,16]].map(([tx,ty,tr],i) => (
          <circle key={i} cx={tx} cy={ty} r={tr} fill="#FFFFFF" opacity={0.22} />
        ))}

        {/* ── WALKING RADIUS RINGS (drawn OVER blocks, semi-transparent) ── */}
        <circle cx={CX} cy={CY} r={228} fill="none" stroke="#C0392B" strokeWidth={2} strokeDasharray="10 6" opacity={0.65} />
        <circle cx={CX} cy={CY} r={152} fill="none" stroke="#D4A017" strokeWidth={2} strokeDasharray="8 5" opacity={0.7} />
        <circle cx={CX} cy={CY} r={76}  fill="none" stroke="#0D7A8A" strokeWidth={2} strokeDasharray="6 4" opacity={0.8} />
        {/* Ring labels on right side */}
        <text x={CX + 228 - 3} y={CY - 8} fontSize={8.5} fill="#C0392B" textAnchor="end" fontWeight={700}>15-min (~1.25 km)</text>
        <text x={CX + 152 - 3} y={CY - 6} fontSize={8.5} fill="#D4A017" textAnchor="end" fontWeight={700}>10-min (~830 m)</text>
        <text x={CX + 76 - 3}  y={CY - 5} fontSize={8.5} fill="#0D7A8A" textAnchor="end" fontWeight={700}>5-min (~415 m)</text>

        {/* ── CENTER MARKER ── */}
        <circle cx={CX} cy={CY} r={9} fill={C.navy} />
        <circle cx={CX} cy={CY} r={4} fill="#FFFFFF" />

        {/* ── ZONE LABELS (drawn last, always on top) ── */}
        {[
          { x: 74,  y: 54,  lines: ["🚊 Transport", "Hub"], color: "#FFFFFF" },
          { x: 256, y: 50,  lines: ["🎓 Education Zone"], color: "#FFFFFF" },
          { x: 460, y: 50,  lines: ["🎓 Education Zone"], color: "#FFFFFF" },
          { x: 676, y: 52,  lines: ["🌳 Green Spaces"], color: "#FFFFFF" },
          { x: 74,  y: 196, lines: ["🏭 Employment", "Zone"], color: "#FFFFFF" },
          { x: 256, y: 196, lines: ["🏘️ Residential"], color: "#FFFFFF" },
          { x: 454, y: 182, lines: ["🏛️ Community", "Center"], color: "#FFFFFF" },
          { x: 676, y: 196, lines: ["🏪 Commercial", "& Market"], color: "#FFFFFF" },
          { x: 74,  y: 336, lines: ["🏭 Employment"], color: "#FFFFFF" },
          { x: 256, y: 336, lines: ["🏘️ Residential"], color: "#FFFFFF" },
          { x: 460, y: 336, lines: ["🏘️ Residential"], color: "#FFFFFF" },
          { x: 676, y: 336, lines: ["🏪 Commercial"], color: "#FFFFFF" },
          { x: 74,  y: 457, lines: ["🌳 Park"], color: "#FFFFFF" },
          { x: 350, y: 455, lines: ["🏥 Health & Wellness Zone"], color: "#FFFFFF" },
          { x: 676, y: 457, lines: ["🌳 Park"], color: "#FFFFFF" },
        ].map((lbl, i) => (
          <text key={i} x={lbl.x} y={lbl.y} fontSize={8.5} fill={lbl.color}
            textAnchor="middle" fontWeight={700} opacity={0.95} style={{ pointerEvents: "none" }}>
            {lbl.lines.map((line, li) => <tspan key={li} x={lbl.x} dy={li === 0 ? 0 : 11}>{line}</tspan>)}
          </text>
        ))}

        {/* ── COMPASS ── */}
        <g transform="translate(769, 32)">
          <circle cx={0} cy={0} r={18} fill="#FFFFFF" opacity={0.88} />
          <polygon points="0,-13 -4,-3 4,-3" fill={C.red} />
          <polygon points="0,13 -4,3 4,3" fill={C.muted} />
          <line x1={-13} y1={0} x2={13} y2={0} stroke={C.muted} strokeWidth={1.2} />
          <text x={0} y={-3} fontSize={8} textAnchor="middle" fontWeight={900} fill={C.red}>N</text>
          <text x={0} y={20} fontSize={7} textAnchor="middle" fill={C.muted}>S</text>
        </g>
      </svg>

      {/* LEGEND */}
      <div style={{ background: C.lightGray, borderRadius: "0 0 10px 10px", padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", borderTop: `2px solid ${C.navy}22` }}>
        {Object.entries(zoneInfo).map(([key, z]) => (
          <div key={key} onClick={() => toggle(key)} style={{
            display: "flex", alignItems: "center", gap: 5, padding: "4px 11px", borderRadius: 20,
            cursor: "pointer", background: activeZone === key ? `${z.color}22` : C.white,
            border: `1.5px solid ${activeZone === key ? z.color : "#D1D9E6"}`,
            fontSize: 11.5, color: activeZone === key ? z.color : C.text,
            fontWeight: activeZone === key ? 700 : 500, transition: "all 0.18s",
          }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: z.color, flexShrink: 0 }} />
            {z.icon} {z.label}
          </div>
        ))}
      </div>

      {/* ZONE DETAIL PANEL */}
      {activeZone && (
        <div style={{
          marginTop: 12, borderRadius: 10, padding: "16px 20px",
          background: `${zoneInfo[activeZone].color}0D`,
          border: `1.5px solid ${zoneInfo[activeZone].color}50`,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: zoneInfo[activeZone].color, marginBottom: 6 }}>
            {zoneInfo[activeZone].icon} {zoneInfo[activeZone].label}
          </div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.75 }}>{zoneInfo[activeZone].desc}</div>
        </div>
      )}
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
      targets: ["15,000 public rental units by 2028", "Rent: ₱1,500–₱3,500/month", "50,000 old units retrofitted", "Zero ghost towns / 100% occupancy"],
      desc: "Builds and manages public rental housing for the poorest families — no debt burden, no foreclosure risk. Adopts a construction-first approach modelled on Singapore HDB's Shorter Waiting Time (SWT) framework: construction commences on brownfield sites before beneficiary allocation is finalised, compressing the waiting period from 4–5 years to under 3 years."
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
      q: "\"Isn't renting just throwing money away?\"",
      a: "For families below the affordability threshold, the question is not homeownership versus renting — it is stable shelter versus no shelter. A domestic worker earning ₱12,000/month who enters a ₱1.5M mortgage at subsidised rates pays ₱4,800/month — 40% of income. Studies show this household will default within 2–3 years, lose everything, and return to an informal settlement. The same household paying ₱2,000/month in NHA rental — 17% of income — retains enough disposable income to keep children in school and accumulate savings. Rental is not a failure. It is a calibrated response to income realities that the current program ignores."
    },
    {
      q: "\"If the government keeps the land, are families just tenants forever?\"",
      a: "Under a 50-year usufructuary agreement, families own the house structure outright. They may renovate, improve, and pass the right to their children. The legal right to occupy is secure for 50 years, enforceable in court, and renewable. Singapore's HDB program runs on a 99-year leasehold and achieves a homeownership rate of 89%. Singaporean families have built substantial wealth in their HDB flats over decades. When half of government socialized housing is sold to middle-class buyers within 5 years of turnover, the question of whether full title actually serves the intended families answers itself."
    },
    {
      q: "\"Why build in the provinces? The jobs are in Metro Manila.\"",
      a: "Jobs are in Metro Manila because housing policy has, for decades, concentrated development — and therefore workers — there. CALABARZON has 16.39 million residents, more than Metro Manila's 14 million, because industries followed affordable land, and workers followed industries. The provincial township program builds opportunities where land is affordable, through mandatory employment zones, transport connectivity, and industrial park co-location. The combined housing-plus-transport cost target of below 45% of family income is achievable only outside Metro Manila, where land costs do not absorb 40–60% of total unit cost."
    },
    {
      q: "\"How do we prevent these from becoming ghost towns?\"",
      a: "Previous resettlement projects became ghost towns because they were built 80–100 kilometres from employment, with no transport, schools, or markets. This Blueprint prevents that outcome through structural conditions, not aspirations. No township is approved without confirmed employment access, transport connection, school provision, and health facility. The Integrated Heritage Community model adds a further layer: active livelihood, education, and health programs pre-deployed at the moment of occupancy, not two years later. Occupancy is tracked continuously. The global evidence is unambiguous: transit-oriented developments in Hong Kong, Japan, and Singapore sustain 95% or higher occupancy because they are built around the principle that families cannot live where they cannot earn."
    },
    {
      q: "\"Where does ₱250–300 billion actually come from?\"",
      a: "Sixty percent comes from the Provident Fund's own internal capital: member contributions (₱80–100B/yr), investment income (₱9.43B), and loan repayments (₱40–50B/yr) cycling continuously — the workers' own money, requiring no government budget appropriation. Thirty percent comes from institutional investors purchasing mortgage-backed securities issued by NHMFC — private capital financing public housing. Ten percent comes from the government budget, targeted exclusively to families who cannot access any credit and to township infrastructure. This is the only tranche requiring government subsidy approval. The remaining 90 percent is already there. It is simply not being used effectively."
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
          {/* Main title only */}
          <div style={{ borderLeft: `5px solid ${C.gold}`, paddingLeft: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#85B4D9", fontWeight: 600, marginBottom: 8 }}>
              Republic of the Philippines · Department of Human Settlements and Urban Development
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, color: C.white, fontWeight: 800, lineHeight: 1.15 }}>
              Housing Sector Blueprint<br />for 2026–2028
            </h1>
            <p style={{ margin: "10px 0 0", fontSize: 13, color: "#85B4D9", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              March 2026
            </p>
          </div>

          {/* Key numbers strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: `${C.white}15`, borderRadius: 12, overflow: "hidden", marginBottom: 0 }}>
            {[
              { v: "6.5M", l: "Families without\nadequate housing" },
              { v: "82.6%", l: "Cannot afford\nmarket housing" },
              { v: "₱250B+", l: "Capital mobilized\nwithout Congress" },
              { v: "57,000", l: "Total units targeted\n2026–2028 (3 yrs)" },
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
                  { n: "03", title: "Integrated Township Development Community", desc: "Every township is an Integrated Heritage Community — with jobs, schools, clinics, and markets within 15 minutes on foot. Livelihood, education, health, and cultural identity built in from Day 1 as binding conditions, not afterthoughts.", color: C.blue, icon: "🌆" },
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
              <SectionTitle num="9" title="Solution 3: The Integrated Township Development Community — A 15-Minute Township Model"
                subtitle="Build complete Integrated Heritage Communities — not isolated houses. Every facility a family needs daily is within 15 minutes on foot, with livelihood, health, education, and cultural programs built in as binding approval conditions." />
              <TownshipIllustration />
              <Insight color={C.teal}>
                <strong>Poor families spend 15–20% of income on transportation.</strong> Proximity is affordability. Every township must be within 2km of a train station (Metro Manila Subway, NSCR, LRT, MRT). Target: combined housing + transport costs below 45% of family income.
              </Insight>
            </Card>

            <Card>
              <SectionTitle num="9b" title="The Policy Framework: Livelihood, Health & Education in Every Township"
                subtitle="The Integrated Heritage Community model makes active deployment of these programs a binding condition of DHSUD financing access and approval — not a post-occupancy aspiration." />
              <div style={{ padding: "14px 18px", background: `${C.red}08`, borderLeft: `4px solid ${C.red}`, borderRadius: "0 10px 10px 0", marginBottom: 20, fontSize: 13, color: C.text, lineHeight: 1.65 }}>
                <strong>A Critical Observation:</strong> The programs below exist on paper. Some are well-funded and operational; others are under-resourced or politically inconsistent. The Integrated Heritage Community model does not simply reference these programs — it makes their active deployment within approved townships a <em>condition of financing access and DHSUD approval</em>. Without that enforcement mechanism, this section is aspirational. With it, it becomes binding.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  {
                    icon: "💼", color: C.navy, title: "Livelihood — DTI & DOLE Programs",
                    req: "Required Before Certificate of Occupancy:",
                    items: [
                      "DTI Shared Service Facility (SSF) node in the employment zone",
                      "Co-located Negosyo Center (RA 10644) within the commercial area",
                      "Pre-deployed DOLE Kabuhayan Program & DSWD SLP for all qualifying households",
                      "DTI Sari-Sari Store Diversification to build distributed retail from Day 1",
                      "At least one registered cooperative as anchor tenant of the commercial zone",
                    ],
                    note: "Policy basis: SSF Program; Negosyo Center Act (RA 10644); BMBE Act (RA 9178); DTI MSME Dev. Plan 2023–2028"
                  },
                  {
                    icon: "🎓", color: C.teal, title: "Education — DepEd & TESDA",
                    req: "Required Before Township Approval:",
                    items: [
                      "DepEd-accredited elementary school within 10 min walk (1,000+ unit townships)",
                      "Senior High School with TVL tracks aligned to township employment zone industries (3,000+ units)",
                      "TESDA-accredited skills training centre within commercial or employment zone",
                      "ALS delivery point in the community centre open to adult residents",
                      "TVL industry alignment certified jointly by DTI & DepEd",
                    ],
                    note: "Policy basis: Joint Delivery Voucher DO 006-2023; MATATAG EPP/TLE; ALS Program DO 021-2019"
                  },
                  {
                    icon: "🏥", color: C.green, title: "Health — DOH & Barangay Health System",
                    req: "Required from Day of Occupancy:",
                    items: [
                      "Functioning Barangay Health Station with min. 1 trained BHW per 20 households",
                      "Rural Health Unit with full clinical services for townships of 2,000+ units",
                      "PhilHealth enrollment assistance for all qualifying households upon turnover",
                      "School-Based Feeding Program activated from the first academic year",
                      "Mental health & psychosocial support referral pathway within the health station",
                    ],
                    note: "Policy basis: UHC Act (RA 11223); BHW Act (RA 7883); SBN-1682/580/68 BHW Reform Bills"
                  },
                  {
                    icon: "🏛️", color: C.gold, title: "Cultural & Industrial Identity — Heritage Dimension",
                    req: "Built into Every Township Design:",
                    items: [
                      "Community centre with cultural function, not merely administrative services",
                      "Livelihood programs that prioritise and formalise existing community skills (weaving, food, craft)",
                      "Public spaces reflecting local cultural identity — not erased in name of standardisation",
                      "Industrial specialisation determined at planning stage in coordination with DTI and LGU",
                      "Space for traditional agriculture, ceremonies, and indigenous governance where applicable",
                    ],
                    note: "Policy basis: RA 9509 (Livelihood & Skills); RA 7607 (Magna Carta of Small Farmers); NCIP if applicable"
                  },
                ].map((block, i) => (
                  <div key={i} style={{ borderRadius: 12, padding: "16px 18px", background: `${block.color}08`, border: `1px solid ${block.color}30` }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{block.icon}</span>
                      <div style={{ fontWeight: 800, fontSize: 13, color: block.color }}>{block.title}</div>
                    </div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: block.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{block.req}</div>
                    {block.items.map((item, ii) => (
                      <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, color: C.text, lineHeight: 1.5 }}>
                        <span style={{ color: block.color, flexShrink: 0, fontWeight: 700 }}>✓</span>{item}
                      </div>
                    ))}
                    <div style={{ marginTop: 10, fontSize: 10.5, color: C.muted, fontStyle: "italic", borderTop: `1px solid ${block.color}20`, paddingTop: 8 }}>{block.note}</div>
                  </div>
                ))}
              </div>
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
                  { agency: "NHA", targets: ["15,000 public rental units (Metro Manila, Cebu, Davao)", "Rent: ₱1,500–₱3,500/month; zero default burden", "50,000 deteriorating units structurally retrofitted", "Construction-first SWT model; zero ghost towns"], color: C.midBlue },
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
                <strong>Old system:</strong> ₱5.56B budget → 5,000–10,000 units/year · <strong>New system:</strong> ₱250–300B from existing sources → 57,000 total units 2026–2028, scaling to 40,000–50,000/year by 2029–2030. The difference isn't more money from Congress — it's a smarter system that doesn't depend on Congress.
              </Insight>
              <Source text="DHSUD internal projections; Provident Fund capacity analysis" />
            </Card>

            <Card>
              <SectionTitle num="◉" title="Implementation Roadmap by Year" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  {
                    year: "2026", color: C.teal, emoji: "🌱", title: "Build the Foundation",
                    items: [
                      "Mar–Apr: Nationwide stakeholder consultation — LGUs, DTI, DOH, DepEd, private sector, communities",
                      "May: Promulgate implementing rules — usufruct agreements, 15-min standard, IHC policy framework",
                      "June: Select first 10 pilot LGUs; site validation; DTI/DOH/DepEd co-planning for each site",
                      "Jul–Sep: Provident Fund 72-hour digital loan system launch; automated income verification",
                      "Q3: First NHMFC bond issuance — ₱10B target; investor roadshow",
                      "Q4: Groundbreaking — first 10 pilot townships; NHA rental construction begins; SSF and Negosyo Center sited"
                    ]
                  },
                  {
                    year: "2027", color: C.blue, emoji: "📈", title: "Scale What Works",
                    items: [
                      "Scale to 22,000 units/year based on pilot results",
                      "NHMFC issues ₱20B in bonds (second round)",
                      "Evaluate pilot township results; replicate proven models",
                      "BHW deployment nationwide across all approved townships",
                      "15 cities enabled to self-finance housing via PHILGUARANTEE",
                      "SHFC reaches 25,000 families with secure tenure",
                    ],
                  },
                  {
                    year: "2028", color: C.gold, emoji: "🏆", title: "Full System Operation",
                    items: [
                      "Full system at 25,000 units/year; national LGU rollout",
                      "NHMFC issues ₱20B bond round 3 — ₱50B total over 3 years",
                      "360,000 total Provident Fund loans delivered",
                      "15,000 NHA public rental units completed",
                      "50,000 families with secure tenure under SHFC",
                      "System ready for sustainable throughput of 40,000–50,000 units/year by 2029–2030; IHC model standardised"
                    ],
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
              <SectionTitle num="◉" title="Ghost Town Prevention: Mandatory Approval Requirements for Integrated Heritage Communities"
                subtitle="Previous projects failed because they violated basic rules — built far from jobs with no services. This Blueprint makes livability a binding structural condition, not an aspiration." />
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
                  { title: "Singapore HDB Proof", desc: "Singapore used 99-year leasehold (similar to usufruct) since the 1960s. Today: 89% homeownership, 80% in public housing. Its Shorter Waiting Time (SWT) framework — construction before beneficiary allocation — is the model for NHA's approach under this Blueprint.", icon: "🇸🇬", color: C.teal },
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
                  "This Blueprint is not about building more units faster. It is about creating a system that works permanently for Filipino families — one that remains affordable for the children and grandchildren of the families it first serves, and that does not depend on the goodwill of any single budget cycle to survive."
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 24 }}>
                  {[
                    { label: "Monthly savings per family (usufruct)", v: "₱2,570", color: C.green },
                    { label: "Units targeted by 2028 (cumulative)", v: "57,000", color: C.blue },
                    { label: "Capital from non-govt sources", v: "90%", color: C.gold },
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
        <div style={{ fontWeight: 700, color: C.white, marginBottom: 4 }}>Housing Sector Blueprint for 2026–2028 · Department of Human Settlements and Urban Development</div>
        <div>Republic of the Philippines · March 2026</div>
        <div style={{ marginTop: 6, fontSize: 11, color: "#5A8FAA" }}>
          Data sources: PSA 2024 Census · BSP RPPI Q3 2025 · DHSUD FY 2026 Budget Briefer · UP CIDS August 2025 · Provident Fund 2025 Annual Report · DBM · Colliers PH · InvestAsian
        </div>
      </div>
    </div>
  );
}
