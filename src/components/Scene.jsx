import { motion, useTransform } from "motion/react";
import { STAGE_FX } from "./sceneConfig";
import { useEyeTracking } from "./useEyeTracking";

// Set to false if the zoom feels choppy: it turns the soft glow blurs off
const SOFT = true;
const soft = (id) => (SOFT ? `url(#${id})` : undefined);

const FLOOR_X_BACK = [240, 340, 440, 540, 640, 740, 840, 940, 1040];
const FLOOR_X_FRONT = [0, 160, 320, 480, 640, 800, 960, 1120, 1280];
const FLOOR_ROWS = [0.1, 0.23, 0.4, 0.62, 0.9];

// dust floating in the light: [x, y, size]
const MOTES = [
  [572, 160, 1.4], [618, 232, 1], [706, 180, 1.5], [758, 266, 1.1],
  [664, 308, 0.9], [724, 424, 1], [540, 304, 0.9], [802, 360, 1.1],
];

// slightly squared jaw, centered at x=640
const HEAD =
  "M596,318 C596,296 612,282 640,282 C668,282 684,296 684,318 L684,346 C684,372 666,386 640,386 C614,386 596,372 596,346 Z";

// flat-vector palette
const C = {
  skin: "#E8B48C",
  skinShade: "#C98D66",
  nose: "#E0967A",
  brow: "#4B2B1D",
  coat: "#A67B4A",
  coatShade: "#7E5A32",
  coatLight: "#C9A06A",
  hat: "#A97D4B",
  hatDark: "#7A5230",
  band: "#2E3550",
  tie: "#7A2430",
};

export default function Scene({ stage = 1 }) {
  const i = Math.min(Math.max(stage, 1), 5) - 1;
  const eyeShadow = Math.min(1, STAGE_FX.eyeShadow[i] * 1.6);

  // pupils follow the pointer (values are in SVG units)
  const { x: gx, y: gy } = useEyeTracking();
  const lookX = useTransform(gx, [-1, 1], [-3, 3]);
  const lookY = useTransform(gy, [-1, 1], [-1.4, 1.4]);

  return (
    <svg
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      role="img"
      aria-label="An interrogation room. A detective in a fedora and trench coat sits behind a table with a file case, scowling at a suspect seen from behind, under a hanging tube light."
    >
      <style>{`
        @keyframes sceneMoteDrift {
          0%   { transform: translate(0px, 0px); opacity: 0.15; }
          50%  { transform: translate(6px, -10px); opacity: 0.55; }
          100% { transform: translate(0px, 0px); opacity: 0.15; }
        }
        .mote { animation: sceneMoteDrift 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .mote { animation: none; opacity: 0.3; } }
      `}</style>

      <defs>
        <filter id="b3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="b6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="b12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" /></filter>

        {/* room */}
        <linearGradient id="wallBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38403D" />
          <stop offset="1" stopColor="#242927" />
        </linearGradient>
        <linearGradient id="wallLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0E100F" />
          <stop offset="1" stopColor="#272C2A" />
        </linearGradient>
        <linearGradient id="wallRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#272C2A" />
          <stop offset="1" stopColor="#0E100F" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26282D" />
          <stop offset="1" stopColor="#111214" />
        </linearGradient>
        <radialGradient id="wallGlow">
          <stop offset="0" stopColor="#FFF3D6" stopOpacity="0.2" />
          <stop offset="1" stopColor="#FFF3D6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="floorGlow">
          <stop offset="0" stopColor="#FFF3D6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FFF3D6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tableGlow">
          <stop offset="0" stopColor="#FFF3D6" stopOpacity="0.26" />
          <stop offset="1" stopColor="#FFF3D6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lightCone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF3D6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFF3D6" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="cornerShade" cx="50%" cy="46%" r="75%">
          <stop offset="0.5" stopColor="#0A0A0C" stopOpacity="0" />
          <stop offset="1" stopColor="#0A0A0C" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="tableTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C4238" />
          <stop offset="1" stopColor="#362F28" />
        </linearGradient>
        <linearGradient id="tableApron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#332D27" />
          <stop offset="1" stopColor="#1C1916" />
        </linearGradient>
        <clipPath id="tableClip">
          <polygon points="430,470 850,470 910,524 370,524" />
        </clipPath>

        {/* the hat brim throws a shadow down the face */}
        <linearGradient id="brimShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A140A" stopOpacity="0.75" />
          <stop offset="1" stopColor="#2A140A" stopOpacity="0" />
        </linearGradient>
        <clipPath id="headClip">
          <path d={HEAD} />
        </clipPath>

        {/* keeps each pupil inside its eye white */}
        <clipPath id="eyeClipL"><ellipse cx="622" cy="336" rx="8" ry="5.5" /></clipPath>
        <clipPath id="eyeClipR"><ellipse cx="658" cy="336" rx="8" ry="5.5" /></clipPath>
      </defs>

      {/* ============ ROOM ============ */}
      <rect width="1280" height="720" fill="#0A0A0C" />
      <polygon points="0,0 1280,0 1040,60 240,60" fill="#0E0F11" />
      <rect x="240" y="60" width="800" height="380" fill="url(#wallBack)" />
      <polygon points="0,0 240,60 240,440 0,720" fill="url(#wallLeft)" />
      <polygon points="1280,0 1040,60 1040,440 1280,720" fill="url(#wallRight)" />

      <rect x="240" y="296" width="800" height="144" fill="#0A0A0C" fillOpacity="0.22" />
      <polygon points="0,446 240,296 240,440 0,720" fill="#0A0A0C" fillOpacity="0.22" />
      <polygon points="1280,446 1040,296 1040,440 1280,720" fill="#0A0A0C" fillOpacity="0.22" />
      <line x1="240" y1="296" x2="1040" y2="296" stroke="#434B47" strokeWidth="3" />
      <rect x="240" y="422" width="800" height="18" fill="#171A19" />
      <line x1="240" y1="60" x2="240" y2="440" stroke="#050506" strokeOpacity="0.5" strokeWidth="3" />
      <line x1="1040" y1="60" x2="1040" y2="440" stroke="#050506" strokeOpacity="0.5" strokeWidth="3" />

      <polygon points="240,440 1040,440 1280,720 0,720" fill="url(#floorGrad)" />
      {FLOOR_X_BACK.map((x, k) => (
        <line key={`v${k}`} x1={x} y1="440" x2={FLOOR_X_FRONT[k]} y2="720" stroke="#050506" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      {FLOOR_ROWS.map((f) => (
        <line key={`h${f}`} x1={240 - 240 * f} y1={440 + 280 * f} x2={1040 + 240 * f} y2={440 + 280 * f} stroke="#050506" strokeOpacity="0.35" strokeWidth="2" />
      ))}

      <ellipse cx="640" cy="250" rx="380" ry="190" fill="url(#wallGlow)" />
      <ellipse cx="640" cy="630" rx="420" ry="85" fill="url(#floorGlow)" />

      {/* two-way mirror */}
      <rect x="300" y="150" width="150" height="100" fill="#151B1A" stroke="#3A4240" strokeWidth="5" />
      <polygon points="320,246 352,246 398,154 366,154" fill="#FFF3D6" fillOpacity="0.05" />
      <polygon points="374,246 388,246 432,154 418,154" fill="#FFF3D6" fillOpacity="0.04" />

      {/* door with barred window */}
      <rect x="855" y="170" width="110" height="270" fill="#1B1F22" stroke="#0E1011" strokeWidth="4" />
      <rect x="885" y="198" width="50" height="52" fill="#0A0C0D" />
      <line x1="897" y1="198" x2="897" y2="250" stroke="#4A5058" strokeWidth="2" />
      <line x1="910" y1="198" x2="910" y2="250" stroke="#4A5058" strokeWidth="2" />
      <line x1="923" y1="198" x2="923" y2="250" stroke="#4A5058" strokeWidth="2" />
      <circle cx="952" cy="320" r="3.5" fill="#7A7872" />

      {/* wall clock at 11:47 */}
      <circle cx="790" cy="130" r="21" fill="#CFCABD" stroke="#111" strokeWidth="3" />
      <line x1="790" y1="130" x2="788.8" y2="120.1" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <line x1="790" y1="130" x2="775.3" y2="126.9" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <circle cx="790" cy="130" r="2" fill="#E5484D" />

      <ellipse cx="640" cy="700" rx="380" ry="30" fill="#000" fillOpacity="0.5" filter={soft("b12")} />

      {/* ============ DETECTIVE ============ */}
      {/* chair back */}
      <rect x="540" y="352" width="200" height="126" rx="12" fill="#26211D" />
      <rect x="550" y="362" width="180" height="110" rx="8" fill="#2F2924" />

      {/* ears and neck */}
      <ellipse cx="595" cy="340" rx="6.5" ry="11" fill={C.skin} />
      <ellipse cx="596" cy="341" rx="2.5" ry="6" fill={C.skinShade} />
      <ellipse cx="685" cy="340" rx="6.5" ry="11" fill={C.skin} />
      <ellipse cx="684" cy="341" rx="2.5" ry="6" fill={C.skinShade} />
      <path d="M622,376 L658,376 L662,414 L618,414 Z" fill={C.skinShade} />
      <ellipse cx="640" cy="392" rx="30" ry="9" fill="#7A4A32" fillOpacity="0.8" />

      {/* trench coat */}
      <path d="M530,436 Q640,392 750,436 L776,486 L504,486 Z" fill={C.coat} />
      <path d="M640,400 Q700,404 750,436 L776,486 L640,486 Z" fill={C.coatShade} fillOpacity="0.35" />
      <path d="M542,430 Q640,398 738,430" fill="none" stroke={C.coatLight} strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />

      {/* shirt and tie */}
      <polygon points="621,394 659,394 640,448" fill="#F2EEE6" />
      <polygon points="640,394 659,394 640,448" fill="#D8D2C6" />
      <polygon points="621,392 606,408 632,416" fill="#FFFFFF" />
      <polygon points="659,392 674,408 648,416" fill="#E6E0D4" />
      <polygon points="633,404 647,404 650,416 630,416" fill="#8A2B35" />
      <polygon points="630,416 650,416 656,472 640,484 624,472" fill={C.tie} />
      <polygon points="636,416 640,416 641,478 638,474" fill="#A8404B" fillOpacity="0.6" />

      {/* coat collar flaps */}
      <polygon points="618,390 556,416 578,462 634,424" fill="#BC8E5C" />
      <polygon points="556,416 578,462 596,452 572,420" fill="#94683A" />
      <polygon points="662,390 724,416 702,462 646,424" fill="#B08450" />
      <polygon points="724,416 702,462 684,452 708,420" fill="#8C6236" />

      {/* head */}
      <path d={HEAD} fill={C.skin} />
      <g clipPath="url(#headClip)">
        <ellipse cx="672" cy="352" rx="30" ry="52" fill={C.skinShade} fillOpacity="0.45" />
        <ellipse cx="640" cy="392" rx="42" ry="16" fill="#B57B56" fillOpacity="0.65" />
        <ellipse cx="614" cy="360" rx="9" ry="6" fill="#E88F7C" fillOpacity="0.28" />
        <ellipse cx="666" cy="360" rx="9" ry="6" fill="#E88F7C" fillOpacity="0.22" />
        {/* shadow from the hat brim, deeper by stage */}
        <rect
          x="590"
          y="298"
          width="100"
          height="50"
          fill="url(#brimShade)"
          style={{ opacity: 0.55 + 0.45 * eyeShadow, transition: "opacity 1.2s" }}
        />
      </g>

      {/* sideburns */}
      {/* <path d="M598,318 L605,318 L607,346 L601,351 Z" fill={C.brow} />
      <path d="M682,318 L675,318 L673,346 L679,351 Z" fill={C.brow} /> */}

      {/* eyes: whites stay put, the iris and pupil slide with the pointer */}
      <ellipse cx="622" cy="336" rx="8" ry="5.5" fill="#F6F0E6" />
      <g clipPath="url(#eyeClipL)">
        <motion.g style={{ x: lookX, y: lookY }}>
          <circle cx="623" cy="336" r="4.2" fill="#3A2015" />
          <circle cx="623" cy="336" r="2" fill="#140A06" />
          <circle cx="624.6" cy="334.4" r="1.4" fill="#fff" />
        </motion.g>
      </g>
      <path d="M613,333 Q622,326.5 631,333" fill="none" stroke="#2A1710" strokeWidth="3" strokeLinecap="round" />

      <ellipse cx="658" cy="336" rx="8" ry="5.5" fill="#F6F0E6" />
      <g clipPath="url(#eyeClipR)">
        <motion.g style={{ x: lookX, y: lookY }}>
          <circle cx="657" cy="336" r="4.2" fill="#3A2015" />
          <circle cx="657" cy="336" r="2" fill="#140A06" />
          <circle cx="658.6" cy="334.4" r="1.4" fill="#fff" />
        </motion.g>
      </g>
      <path d="M649,333 Q658,326.5 667,333" fill="none" stroke="#2A1710" strokeWidth="3" strokeLinecap="round" />

      {/* the eyes sink into shadow as the stages go on */}
      <ellipse cx="622" cy="335" rx="12" ry="8" fill="#1A0F0A" filter={soft("b3")} style={{ opacity: eyeShadow * 0.6, transition: "opacity 1.2s" }} />
      <ellipse cx="658" cy="335" rx="12" ry="8" fill="#1A0F0A" filter={soft("b3")} style={{ opacity: eyeShadow * 0.6, transition: "opacity 1.2s" }} />

      {/* furrowed brows, inner ends pulled down */}
      <path d="M603,313 Q622,308 640,322 L640,329 Q622,318 604,321 Z" fill={C.brow} />
      <path d="M677,313 Q658,308 640,322 L640,329 Q658,318 676,321 Z" fill={C.brow} />

      {/* nose */}
      <path d="M640,338 Q650,352 648,358 Q640,364 632,358 Q630,352 640,338 Z" fill={C.nose} />
      <ellipse cx="637" cy="347" rx="2" ry="4.5" fill="#F3B79E" fillOpacity="0.7" />

      {/* moustache and mouth */}
      <path d="M613,363 Q626,355 640,361 Q654,355 667,363 Q659,374 640,370 Q621,374 613,363 Z" fill={C.brow} />
      <path d="M622,361 Q630,358 638,362" fill="none" stroke="#7A4A33" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M633,378 Q640,380 647,378" fill="none" stroke="#A8604A" strokeWidth="2.4" strokeLinecap="round" />

      {/* fedora */}
      <path d="M543,292 Q640,324 737,292 Q640,308 543,292 Z" fill={C.hatDark} />
      <ellipse cx="640" cy="291" rx="98" ry="17" fill="#B8894F" />
      <path d="M548,288 Q640,268 732,288" fill="none" stroke="#D9AE74" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M590,290 C586,262 598,242 640,240 C682,242 694,262 690,290 Q640,302 590,290 Z" fill={C.hat} />
      <path d="M640,240 C682,242 694,262 690,290 Q665,296 640,296 Z" fill={C.hatDark} fillOpacity="0.45" />
      <path d="M604,257 C612,247 626,243 640,243" fill="none" stroke="#D9AE74" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />
      <path d="M612,247 Q640,259 668,247" fill="none" stroke={C.hatDark} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M589,274 L691,274 L690,288 Q640,298 590,288 Z" fill={C.band} />
      <path d="M591,277 L689,277" stroke="#4A5378" strokeOpacity="0.7" strokeWidth="1.5" />

      {/* ============ TABLE ============ */}
      <polygon points="430,470 850,470 910,524 370,524" fill="url(#tableTop)" />
      <g clipPath="url(#tableClip)">
        <ellipse cx="640" cy="494" rx="270" ry="34" fill="url(#tableGlow)" />
      </g>
      <line x1="430" y1="470" x2="850" y2="470" stroke="#FFF3D6" strokeOpacity="0.18" strokeWidth="1.5" />
      <line x1="370" y1="524" x2="910" y2="524" stroke="#FFF3D6" strokeOpacity="0.3" strokeWidth="1.5" />
      <rect x="370" y="524" width="540" height="34" fill="url(#tableApron)" />
      <rect x="388" y="558" width="20" height="130" fill="#1D1A17" />
      <rect x="872" y="558" width="20" height="130" fill="#1D1A17" />

      {/* papers and file case */}
      <polygon points="598,486 690,482 704,506 584,508" fill="#D6D0C0" />
      <line x1="606" y1="491" x2="682" y2="488" stroke="#8A8780" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="604" y1="497" x2="690" y2="495" stroke="#8A8780" strokeOpacity="0.5" strokeWidth="1.5" />
      <ellipse cx="642" cy="513" rx="74" ry="6" fill="#000" fillOpacity="0.5" filter={soft("b3")} />
      <g transform="rotate(6 642 498)">
        <polygon points="592,486 624,486 628,480 596,480" fill="#C4A262" />
        <polygon points="592,486 692,486 710,510 574,510" fill="#D9B97A" />
        <polygon points="592,486 692,486 695,490 589,490" fill="#FFF3D6" fillOpacity="0.3" />
        <rect x="620" y="494" width="46" height="5" fill="#8A6A3A" fillOpacity="0.5" />
      </g>

      {/* voice recorder */}
      <polygon points="744,488 790,488 796,506 738,506" fill="#1A1B1E" />
      <polygon points="744,488 790,488 791,491 743,491" fill="#FFF3D6" fillOpacity="0.2" />
      <circle cx="754" cy="497" r="2.4" fill="#E5484D" />
      <circle cx="754" cy="497" r="6" fill="#E5484D" fillOpacity="0.25" filter={soft("b3")} />
      <line x1="764" y1="494" x2="784" y2="494" stroke="#4A4C52" strokeWidth="1.5" />
      <line x1="764" y1="499" x2="784" y2="499" stroke="#4A4C52" strokeWidth="1.5" />

      {/* sleeves and hands on the table */}
      <path d="M552,418 Q526,470 556,506" fill="none" stroke={C.coat} strokeWidth="28" strokeLinecap="round" />
      <path d="M728,418 Q754,470 724,506" fill="none" stroke={C.coatShade} strokeWidth="28" strokeLinecap="round" />
      <path d="M544,424 Q520,470 546,500" fill="none" stroke={C.coatLight} strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="558" cy="500" rx="14" ry="5" fill="#F2EEE6" />
      <ellipse cx="722" cy="500" rx="14" ry="5" fill="#D8D2C6" />
      <ellipse cx="560" cy="512" rx="16" ry="9" fill={C.skin} />
      <ellipse cx="720" cy="512" rx="16" ry="9" fill={C.skinShade} />

      {/* ============ SUSPECT, SEEN FROM BEHIND ============ */}
      <rect x="405" y="572" width="130" height="20" rx="6" fill="#26211D" />
      <rect x="452" y="556" width="36" height="34" fill={C.skinShade} />
      <path d="M356,720 Q360,606 470,580 Q580,606 584,720 Z" fill="#6B6D78" />
      <path d="M470,582 Q580,606 584,720 L470,720 Z" fill="#4E505A" fillOpacity="0.55" />
      <path d="M434,586 Q470,614 506,586 Q506,574 470,574 Q434,574 434,586 Z" fill="#595B66" />
      <path d="M470,606 L470,720" fill="none" stroke="#4A4C56" strokeWidth="2" />
      <path d="M376,646 Q392,604 470,584" fill="none" stroke="#B4B6C2" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="423" cy="530" rx="5.5" ry="10" fill={C.skin} />
      <ellipse cx="517" cy="530" rx="5.5" ry="10" fill={C.skinShade} />
      <circle cx="470" cy="520" r="46" fill="#1E1E24" />
      <path d="M438,504 Q470,476 502,504 Q470,490 438,504 Z" fill="#3E3E48" />
      <path d="M450,548 Q470,556 490,548" fill="none" stroke="#0A0A0C" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />

      {/* ============ LIGHT ============ */}
      <polygon points="548,56 732,56 960,600 320,600" fill="url(#lightCone)" filter={soft("b12")} style={{ mixBlendMode: "screen" }} />

      {MOTES.map(([x, y, r], k) => (
        <circle
          key={k}
          className="mote"
          cx={x}
          cy={y}
          r={r}
          fill="#FFF3D6"
          style={{ animationDelay: `${k * 0.7}s`, animationDuration: `${7 + (k % 4)}s` }}
        />
      ))}

      {/* tube fixture and glow */}
      <line x1="566" y1="0" x2="566" y2="40" stroke="#33333A" strokeWidth="2.5" />
      <line x1="714" y1="0" x2="714" y2="40" stroke="#33333A" strokeWidth="2.5" />
      <ellipse cx="640" cy="50" rx="210" ry="30" fill="#FFF3D6" fillOpacity="0.3" filter={soft("b12")} />
      <ellipse cx="640" cy="50" rx="115" ry="14" fill="#FFF3D6" fillOpacity="0.55" filter={soft("b6")} />
      <rect x="536" y="40" width="208" height="20" rx="4" fill="#2A2A2E" />
      <rect x="548" y="46" width="184" height="9" rx="4.5" fill="#FFF3D6" />
      <rect x="548" y="46" width="184" height="3" rx="1.5" fill="#fff" fillOpacity="0.7" />

      <rect width="1280" height="720" fill="url(#cornerShade)" />
    </svg>
  );
}