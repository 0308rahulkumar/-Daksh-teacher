// Prescribed CBSE Class 10 Science Practical Experiments
// Directly aligned with NCERT Laboratory Manual and Board Exam marking guidelines.

import type { SimId } from "@/components/InteractiveSimLab";

export interface ScienceExperiment {
  id: string;
  chapterId: string;
  subjectId: "science";
  ncertExpNo: string;
  title: string;
  aim: string;
  apparatus: string[];
  chemicals?: string[];
  equationOrFormula?: string;
  procedure: string[];
  observations: string;
  inference: string;
  precautions: string[];
  vivaQuestions: { q: string; a: string }[];
  simId?: SimId;
  badge: string;
  icon: string;
}

export const SCIENCE_EXPERIMENTS: ScienceExperiment[] = [
  // --- Chapter 1: Chemical Reactions & Equations (ch-chem1) ---
  {
    id: "exp-chem1-1",
    chapterId: "ch-chem1",
    subjectId: "science",
    ncertExpNo: "Experiment 1.1",
    title: "Combustion of Magnesium Ribbon in Air",
    aim: "To observe the combination reaction of burning magnesium ribbon in air and test the nature of the ash formed.",
    apparatus: ["Pair of tongs", "Sandpaper", "Watch glass", "Bunsen burner"],
    chemicals: ["Magnesium ribbon (3-4 cm)", "Red and blue litmus papers", "Water"],
    equationOrFormula: "2Mg(s) + O₂(g) → 2MgO(s) + Heat + Dazzling White Light",
    procedure: [
      "1. Clean a 3-4 cm piece of magnesium ribbon using sandpaper to remove the protective layer of basic magnesium carbonate.",
      "2. Hold the ribbon with a pair of tongs and ignite it over a Bunsen burner.",
      "3. Collect the white ash in a watch glass. Do not look directly at the dazzling white flame.",
      "4. Dissolve the white ash in a small amount of water to form magnesium hydroxide [Mg(OH)₂] and test with red litmus paper.",
    ],
    observations: "Magnesium ribbon burns with a dazzling white flame leaving behind a white powdery ash (MgO). The aqueous solution of ash turns red litmus blue.",
    inference: "Combustion of magnesium is an exothermic combination reaction. Magnesium oxide is basic in nature.",
    precautions: [
      "Always clean the ribbon with sandpaper before burning.",
      "Wear safety goggles and do not stare directly at the bright burning flame.",
    ],
    vivaQuestions: [
      { q: "Why is magnesium ribbon cleaned before burning in air?", a: "To remove the inert basic magnesium oxide/carbonate film that prevents smooth ignition." },
      { q: "What is the chemical nature of magnesium oxide?", a: "It is a basic oxide because it reacts with water to form Mg(OH)₂, turning red litmus blue." },
    ],
    simId: "build-an-atom",
    badge: "Chemistry Practical",
    icon: "🔥",
  },
  {
    id: "exp-chem1-2",
    chapterId: "ch-chem1",
    subjectId: "science",
    ncertExpNo: "Experiment 1.2",
    title: "Thermal Decomposition of Ferrous Sulphate Crystals",
    aim: "To observe the thermal decomposition of green ferrous sulphate crystals and note the smell of burning sulphur.",
    apparatus: ["Boiling tube", "Test tube holder", "Bunsen burner"],
    chemicals: ["Ferrous sulphate crystals (FeSO₄·7H₂O)"],
    equationOrFormula: "2FeSO₄(s) ──Δ──→ Fe₂O₃(s) [reddish-brown] + SO₂(g) + SO₃(g)",
    procedure: [
      "1. Take about 2 g of green ferrous sulphate crystals in a dry boiling tube.",
      "2. Note the initial pale green color of the crystals.",
      "3. Heat the boiling tube over a burner flame using a test tube holder.",
      "4. Observe the color change of the residue and gently waft the gas towards your nose.",
    ],
    observations: "The green crystals lose water of crystallisation and turn white, then decompose to a reddish-brown solid (Fe₂O₃). Pungent, suffocating gas smelling like burning sulphur (SO₂ & SO₃) is evolved.",
    inference: "A single reactant decomposes into three products on heating (Thermal Decomposition Reaction).",
    precautions: [
      "Do not point the mouth of the boiling tube towards yourself or neighbors.",
      "Waft the evolved gases gently; do not inhale deeply.",
    ],
    vivaQuestions: [
      { q: "What is the formula of green vitriol?", a: "FeSO₄·7H₂O (hydrated ferrous sulphate)." },
      { q: "Name the gases produced during decomposition of ferrous sulphate.", a: "Sulphur dioxide (SO₂) and sulphur trioxide (SO₃)." },
    ],
    simId: "ph-scale",
    badge: "Chemistry Practical",
    icon: "🧪",
  },
  {
    id: "exp-chem1-3",
    chapterId: "ch-chem1",
    subjectId: "science",
    ncertExpNo: "Experiment 1.3",
    title: "Thermal Decomposition of Lead Nitrate",
    aim: "To observe the thermal decomposition of lead nitrate and emission of brown nitrogen dioxide fumes.",
    apparatus: ["Boiling tube", "Pair of tongs", "Burner"],
    chemicals: ["Lead nitrate powder Pb(NO₃)₂"],
    equationOrFormula: "2Pb(NO₃)₂(s) ──Δ──→ 2PbO(s) [yellow] + 4NO₂(g) [brown fumes] + O₂(g)",
    procedure: [
      "1. Take about 2 g of white lead nitrate powder in a boiling tube.",
      "2. Hold the boiling tube with a test tube holder over the burner flame.",
      "3. Observe the crackling sound and color of the fumes emitted.",
      "4. Note the color of the residue left behind in the tube.",
    ],
    observations: "Decapitation with a crackling noise occurs. Pungent brown fumes of nitrogen dioxide (NO₂) are evolved, leaving a yellow residue of lead monoxide (PbO).",
    inference: "Lead nitrate undergoes thermal decomposition yielding yellow lead oxide, brown nitrogen dioxide gas, and oxygen.",
    precautions: [
      "Keep the boiling tube dry to prevent cracking.",
      "NO₂ gas is toxic; perform in a well-ventilated laboratory.",
    ],
    vivaQuestions: [
      { q: "What causes the brown fumes when lead nitrate is heated?", a: "Nitrogen dioxide gas (NO₂)." },
      { q: "What is the color of the cold residue?", a: "Yellow lead monoxide (PbO)." },
    ],
    simId: "ph-scale",
    badge: "Chemistry Practical",
    icon: "💨",
  },

  // --- Chapter 2: Acids, Bases and Salts (ch-chem2) ---
  {
    id: "exp-chem2-1",
    chapterId: "ch-chem2",
    subjectId: "science",
    ncertExpNo: "Experiment 2.1",
    title: "Determination of pH of Given Solutions Using pH Paper",
    aim: "To find the pH of dilute HCl, dilute NaOH, dilute ethanoic acid, lemon juice, water, and sodium bicarbonate solution using pH paper.",
    apparatus: ["Test tubes", "Test tube stand", "Droppers", "Glazed tile", "pH paper strip chart"],
    chemicals: ["Dilute HCl", "Dilute NaOH", "Dilute CH₃COOH", "Lemon juice", "Water", "Dilute NaHCO₃"],
    equationOrFormula: "pH = -log₁₀[H⁺]  |  Acidic: pH < 7, Neutral: pH = 7, Basic: pH > 7",
    procedure: [
      "1. Place clean strips of pH paper on a white glazed tile.",
      "2. Using a clean dropper, place a drop of each sample solution on separate strips.",
      "3. Compare the color developed on the pH paper with the standard color chart provided.",
      "4. Record the pH values and classify each solution as strong acid, weak acid, neutral, or base.",
    ],
    observations: "HCl gives red (pH ~1-2); Lemon juice gives orange (pH ~2.5); Water gives green (pH ~7); NaHCO₃ gives blue (pH ~8.5); NaOH gives violet/purple (pH ~13-14).",
    inference: "Solutions with pH < 7 are acidic, pH = 7 are neutral, and pH > 7 are basic.",
    precautions: [
      "Rinse the dropper with distilled water before transferring different test solutions.",
      "Do not touch the pH paper with bare moist hands.",
    ],
    vivaQuestions: [
      { q: "What is universal indicator?", a: "A mixture of several indicators that exhibits different colors across the entire pH range of 1 to 14." },
      { q: "What is the pH of pure water at 25°C?", a: "7.0 (neutral, since [H⁺] = [OH⁻] = 10⁻⁷ M)." },
    ],
    simId: "ph-scale",
    badge: "Prescribed Board Practical",
    icon: "🧪",
  },
  {
    id: "exp-chem2-2",
    chapterId: "ch-chem2",
    subjectId: "science",
    ncertExpNo: "Experiment 2.2",
    title: "Reaction of Acids with Metal Carbonates & Lime Water Test",
    aim: "To study the reaction of dilute hydrochloric acid with sodium carbonate and test the gas produced with lime water.",
    apparatus: ["Test tube with delivery tube", "Stand", "Thistle funnel", "Lime water tube"],
    chemicals: ["Sodium carbonate (Na₂CO₃)", "Dilute hydrochloric acid (HCl)", "Freshly prepared lime water [Ca(OH)₂]"],
    equationOrFormula: "Na₂CO₃(s) + 2HCl(aq) → 2NaCl + H₂O + CO₂(g) ↑\nCa(OH)₂(aq) + CO₂(g) → CaCO₃(s) ↓ (milky) + H₂O",
    procedure: [
      "1. Take about 0.5 g of sodium carbonate in a dry test tube.",
      "2. Add about 2 mL of dilute HCl through the thistle funnel.",
      "3. Pass the briskly effervescing gas through freshly prepared lime water via the delivery tube.",
      "4. Pass excess CO₂ gas and note the change.",
    ],
    observations: "Brisk effervescence occurs. Lime water turns milky due to insoluble calcium carbonate. On passing excess CO₂, milkiness disappears due to soluble calcium bicarbonate.",
    inference: "Metal carbonates react with acids to produce carbon dioxide gas.",
    precautions: [
      "The end of the thistle funnel must dip below the acid level to prevent gas escape.",
      "Lime water must be freshly prepared.",
    ],
    vivaQuestions: [
      { q: "Why does lime water turn milky when CO₂ is passed?", a: "Formation of insoluble white precipitate of calcium carbonate (CaCO₃)." },
      { q: "Why does milkiness disappear on passing excess CO₂?", a: "Insoluble CaCO₃ converts into soluble calcium hydrogen carbonate [Ca(HCO₃)₂]." },
    ],
    simId: "ph-scale",
    badge: "Prescribed Board Practical",
    icon: "⚗️",
  },

  // --- Chapter 3: Metals and Non-metals (ch-chem3) ---
  {
    id: "exp-chem3-1",
    chapterId: "ch-chem3",
    subjectId: "science",
    ncertExpNo: "Experiment 3.1",
    title: "Reactivity Series & Displacement of Copper from CuSO₄ by Iron",
    aim: "To observe the displacement reaction between iron nails and copper sulphate solution, and compare reactivity.",
    apparatus: ["Two test tubes", "Test tube stand", "Iron nails (cleaned with sandpaper)", "Thread"],
    chemicals: ["Copper sulphate solution (CuSO₄·5H₂O, 5%)", "Distilled water"],
    equationOrFormula: "Fe(s) + CuSO₄(aq) [blue] → FeSO₄(aq) [pale green] + Cu(s) [reddish-brown coating]",
    procedure: [
      "1. Clean two iron nails with sandpaper to remove rust.",
      "2. Take about 10 mL of blue copper sulphate solution in two separate test tubes (A and B).",
      "3. Tie one iron nail with thread and immerse it into test tube A for 20 minutes; keep tube B as control.",
      "4. Compare the color of the solutions and inspect the iron nail after 20 minutes.",
    ],
    observations: "The blue copper sulphate solution fades to pale green (FeSO₄). The immersed iron nail acquires a reddish-brown deposit of metallic copper.",
    inference: "Iron is more reactive than copper in the activity series and displaces copper from its salt solution.",
    precautions: [
      "Sandpaper the iron nails properly so bare metallic iron is exposed.",
      "Do not disturb the test tube during the 20-minute reaction period.",
    ],
    vivaQuestions: [
      { q: "What is the position of iron relative to copper in the reactivity series?", a: "Iron is placed above copper, meaning it has greater electropositivity and oxidation tendency." },
      { q: "What causes the pale green color in the solution?", a: "Formation of ferrous ions (Fe²⁺) in ferrous sulphate solution." },
    ],
    simId: "build-an-atom",
    badge: "Prescribed Board Practical",
    icon: "🧲",
  },

  // --- Chapter 6: Life Processes (ch-bio1) ---
  {
    id: "exp-bio1-1",
    chapterId: "ch-bio1",
    subjectId: "science",
    ncertExpNo: "Experiment 6.1",
    title: "Preparation of Temporary Mount of Leaf Peel to Show Stomata",
    aim: "To prepare a temporary stained mount of a leaf peel (Tradescantia / Bryophyllum) to observe stomata under a compound microscope.",
    apparatus: ["Compound microscope", "Glass slides", "Cover slips", "Watch glass", "Needle", "Forceps", "Brush"],
    chemicals: ["Glycerine", "Safranin stain", "Distilled water"],
    procedure: [
      "1. Peel off a small piece from the lower epidermis of a succulent leaf (Tradescantia or lily).",
      "2. Put the peel into a watch glass containing water.",
      "3. Stain the peel with 1-2 drops of Safranin stain for 1 minute.",
      "4. Transfer the stained peel to the center of a glass slide, add a drop of glycerine, and gently lower a coverslip using a needle to avoid air bubbles.",
      "5. Focus under low power (10x) and then high power (40x) of the compound microscope.",
    ],
    observations: "Numerous stomatal pores bounded by two kidney-shaped guard cells containing chloroplasts and a prominent nucleus are observed in the epidermal layer.",
    inference: "Stomata are microscopic pores on leaf surfaces responsible for gaseous exchange (CO₂/O₂) and transpiration.",
    precautions: [
      "Always take the peel from the lower epidermis where stomata are abundant.",
      "Avoid air bubbles beneath the coverslip while mounting.",
      "Wipe off excess glycerine with filter paper.",
    ],
    vivaQuestions: [
      { q: "What is the shape of guard cells in dicot leaves vs monocot leaves?", a: "Kidney/bean-shaped in dicots, and dumbbell-shaped in monocots (grasses)." },
      { q: "What triggers the opening and closing of stomata?", a: "Turgidity changes in guard cells caused by endosmosis (opening) and exosmosis (closing) of water." },
    ],
    simId: "heart-circulation",
    badge: "Prescribed Board Practical",
    icon: "🍃",
  },
  {
    id: "exp-bio1-2",
    chapterId: "ch-bio1",
    subjectId: "science",
    ncertExpNo: "Experiment 6.2",
    title: "Carbon Dioxide is Released During Respiration",
    aim: "To experimentally demonstrate that carbon dioxide gas is released by germinating seeds during cellular respiration.",
    apparatus: ["Conical flask", "Bent glass tube", "Cork with hole", "Small test tube", "Beaker with colored water"],
    chemicals: ["Germinating gram seeds", "20% Potassium hydroxide (KOH) solution"],
    procedure: [
      "1. Place moist germinating gram seeds in a conical flask.",
      "2. Suspend a small test tube containing freshly prepared 20% KOH solution inside the flask using a thread.",
      "3. Close the flask tightly with a rubber cork fitted with a bent glass delivery tube.",
      "4. Dip the free end of the bent tube into a beaker filled with colored water.",
      "5. Make all connections airtight with petroleum jelly and leave for 2 hours.",
    ],
    observations: "After 2 hours, the water level in the bent delivery tube rises significantly above the beaker level.",
    inference: "Respirating seeds consume O₂ and release CO₂. KOH absorbs the CO₂, creating a partial vacuum in the flask that draws water up the delivery tube.",
    precautions: [
      "The entire apparatus setup must be completely airtight.",
      "Ensure the tip of the delivery tube dips well below the water level in the beaker.",
    ],
    vivaQuestions: [
      { q: "What is the purpose of placing KOH solution in the flask?", a: "KOH chemically absorbs the released carbon dioxide gas (2KOH + CO₂ → K₂CO₃ + H₂O)." },
      { q: "Why are germinating seeds chosen instead of dry dormant seeds?", a: "Germinating seeds have an actively high metabolic rate and respire vigorously." },
    ],
    simId: "heart-circulation",
    badge: "Prescribed Board Practical",
    icon: "🫁",
  },

  // --- Chapter 10: Light — Reflection and Refraction (ch-phy1) ---
  {
    id: "exp-phy1-1",
    chapterId: "ch-phy1",
    subjectId: "science",
    ncertExpNo: "Experiment 10.1",
    title: "Focal Length of Concave Mirror and Convex Lens",
    aim: "To determine the approximate focal length of a concave mirror and a convex lens by focusing on a distant object.",
    apparatus: ["Concave mirror", "Convex lens", "Mirror/lens holder", "White cardboard screen", "Metre scale"],
    equationOrFormula: "1/f = 1/v + 1/u (Mirror)  |  1/f = 1/v - 1/u (Lens)  |  When u → ∞, v ≈ f",
    procedure: [
      "1. Mount the concave mirror on a stand facing an open window with a distant tree or building.",
      "2. Place the white screen in front of the reflecting surface.",
      "3. Adjust the distance of the screen until a sharp, distinct, inverted image of the distant object is obtained.",
      "4. Measure the distance between the mirror surface and the screen with a metre scale. This gives focal length f.",
      "5. Repeat the procedure with a convex lens (screen placed behind the lens).",
    ],
    observations: "A sharp, inverted, diminished real image of the distant object forms on the screen at distance f. For concave mirror f = -15.0 cm; for convex lens f = +15.0 cm.",
    inference: "Parallel rays of light coming from infinity converge at the principal focus F. Distance from pole/optical center to focus equals focal length.",
    precautions: [
      "The distant object must be clearly visible and well-illuminated (at least 15-20 meters away).",
      "Keep the scale horizontal and parallel to the principal axis.",
    ],
    vivaQuestions: [
      { q: "Why is a distant object chosen to determine focal length?", a: "Rays arriving from a distant source (infinity) are essentially parallel to the principal axis and converge exactly at the focus." },
      { q: "What is the sign of focal length for concave mirror vs convex lens?", a: "Concave mirror focal length is negative (-f); convex lens focal length is positive (+f)." },
    ],
    simId: "geometric-optics",
    badge: "Prescribed Board Practical",
    icon: "🪞",
  },
  {
    id: "exp-phy1-2",
    chapterId: "ch-phy1",
    subjectId: "science",
    ncertExpNo: "Experiment 10.2",
    title: "Path of Light Ray Through a Rectangular Glass Slab",
    aim: "To trace the path of a ray of light passing through a rectangular glass slab for different angles of incidence and measure angle of incidence (i), refraction (r), and emergence (e).",
    apparatus: ["Rectangular glass slab", "Drawing board", "White paper sheet", "Drawing pins", "Fixing pins", "Protractor", "Scale"],
    equationOrFormula: "Snell's Law: n = sin(i) / sin(r)  |  Angle of emergence ∠e = Angle of incidence ∠i  |  Lateral Shift d",
    procedure: [
      "1. Fix a white paper sheet on the drawing board. Place the glass slab in the center and draw its boundary ABCD.",
      "2. Draw a normal N1-N2 on face AB and an incident ray at angle ∠i (e.g. 30°, 45°, 60°).",
      "3. Fix two pins P1 and P2 vertically on the incident ray.",
      "4. Looking through the opposite face CD, fix pins P3 and P4 such that their feet align with images of P1 and P2.",
      "5. Remove slab and pins, join lines, draw emergent ray and measure ∠i, ∠r, ∠e.",
    ],
    observations: "The ray bends towards the normal on entering glass and away from the normal on leaving. Within experimental limits, ∠i = ∠e. Emergent ray is laterally displaced parallel to incident ray.",
    inference: "Light slows down in an optically denser medium (glass) and speeds up in a rarer medium (air). When parallel refracting faces are present, emergent ray is parallel to incident ray.",
    precautions: [
      "Distance between pins P1-P2 and P3-P4 should be at least 4-5 cm for sharp alignment.",
      "Fix pins strictly perpendicular to the drawing board.",
    ],
    vivaQuestions: [
      { q: "What is lateral displacement?", a: "The perpendicular distance between the original incident ray and the emergent ray after passing through a refracting medium with parallel faces." },
      { q: "What factors does lateral displacement depend upon?", a: "Thickness of slab, refractive index of glass, and angle of incidence." },
    ],
    simId: "optics",
    badge: "Prescribed Board Practical",
    icon: "🔍",
  },

  // --- Chapter 12: Electricity (ch-phy2) ---
  {
    id: "exp-phy2-1",
    chapterId: "ch-phy2",
    subjectId: "science",
    ncertExpNo: "Experiment 12.1",
    title: "Verification of Ohm's Law and V-I Graph Plotting",
    aim: "To determine the resistance per unit length of a given wire by plotting a graph of potential difference (V) versus current (I).",
    apparatus: ["Ammeter (0-3 A)", "Voltmeter (0-3 V)", "Resistance wire", "Rheostat", "Battery eliminator (0-6 V)", "Plug key", "Connecting wires"],
    equationOrFormula: "V = I × R  =>  R = V / I  (Slope of V-I graph = ΔV / ΔI = R)",
    procedure: [
      "1. Connect the circuit components in series: battery, plug key, rheostat, ammeter, and resistance wire.",
      "2. Connect the voltmeter in parallel across the resistance wire.",
      "3. Insert key and adjust rheostat so minimal current flows. Note ammeter and voltmeter readings.",
      "4. Adjust rheostat to take 5 sets of current (I) and voltage (V) readings.",
      "5. Plot V along y-axis and I along x-axis. Calculate slope of the resulting straight line.",
    ],
    observations: "The ratio V/I remains constant within experimental error. The V-I graph is a straight line passing through the origin.",
    inference: "Current flowing through a metallic conductor is directly proportional to the potential difference applied across its ends, verifying Ohm's Law.",
    precautions: [
      "Always connect ammeter in series and voltmeter in parallel with proper polarities (+ to +).",
      "Remove the key when not taking readings to prevent heating of wire which alters resistance.",
    ],
    vivaQuestions: [
      { q: "State Ohm's Law.", a: "At constant temperature, current flowing through a conductor is directly proportional to potential difference across its terminals (V = IR)." },
      { q: "Why should the key be removed between readings?", a: "Continuous current causes Joule heating (H = I²Rt), which increases resistance and introduces experimental error." },
    ],
    simId: "circuits",
    badge: "Prescribed Board Practical",
    icon: "⚡",
  },
  {
    id: "exp-phy2-2",
    chapterId: "ch-phy2",
    subjectId: "science",
    ncertExpNo: "Experiment 12.2",
    title: "Equivalent Resistance of Resistors in Series & Parallel",
    aim: "To determine the equivalent resistance of two resistors when connected in series and in parallel.",
    apparatus: ["Two known resistors (R1, R2)", "Ammeter", "Voltmeter", "Rheostat", "Plug key", "Connecting wires"],
    equationOrFormula: "Series: Rs = R1 + R2  |  Parallel: 1/Rp = 1/R1 + 1/R2 (Rp = R1·R2 / (R1 + R2))",
    procedure: [
      "1. Connect resistors R1 and R2 end-to-end in series. Measure total current and voltage across the combination. Calculate Rs.",
      "2. Connect R1 and R2 across the same two points in parallel. Measure total current and voltage. Calculate Rp.",
      "3. Compare the experimentally obtained Rs and Rp with theoretical formula values.",
    ],
    observations: "In series, effective resistance increases (Rs > R1, R2). In parallel, effective resistance decreases and is smaller than the smallest individual resistor (Rp < R1, R2).",
    inference: "Resistors in series add linearly; resistors in parallel combine reciprocally.",
    precautions: [
      "Clean connecting wire ends with sandpaper to eliminate high contact resistance.",
      "Tighten all terminal screw connections firmly.",
    ],
    vivaQuestions: [
      { q: "In domestic circuits, why are appliances connected in parallel and not in series?", a: "Parallel connection provides full supply voltage (220V) to each appliance and allows independent switching without breaking the whole circuit." },
      { q: "If two 10 Ω resistors are in parallel, what is equivalent resistance?", a: "5 Ω (1/Rp = 1/10 + 1/10 = 2/10 => Rp = 5 Ω)." },
    ],
    simId: "circuits",
    badge: "Prescribed Board Practical",
    icon: "🔋",
  },

  // --- Chapter 13: Magnetic Effects of Electric Current (ch-phy3) ---
  {
    id: "exp-phy3-1",
    chapterId: "ch-phy3",
    subjectId: "science",
    ncertExpNo: "Experiment 13.1",
    title: "Mapping Magnetic Field Lines Around a Bar Magnet",
    aim: "To draw magnetic field lines around a bar magnet using a small magnetic plotting compass needle and iron filings.",
    apparatus: ["Bar magnet", "Small magnetic plotting compass", "White paper sheet", "Drawing board", "Iron filings sprinkler"],
    equationOrFormula: "B-field vectors emerge from North pole and enter South pole outside magnet; closed continuous loops.",
    procedure: [
      "1. Fix a white paper sheet on a drawing board and place a bar magnet in the center aligned with geographic North-South.",
      "2. Place compass needle near the North pole. Mark dots at the tip of the North and South pointers.",
      "3. Shift compass so its South pointer touches the dot made by North tip. Mark next position.",
      "4. Repeat until the line reaches the South pole of the magnet. Join dots with a smooth curve.",
      "5. Sprinkle iron filings uniformly on the board and tap gently to observe field lines.",
    ],
    observations: "Field lines emerge from North pole, curve around, and enter South pole. Crowding of lines near poles indicates high magnetic field strength. Lines never intersect.",
    inference: "Magnetic field is a vector quantity represented by continuous closed loops radiating from North to South externally.",
    precautions: [
      "Keep iron or magnetic objects far from the drawing board during the experiment.",
      "Tap the board gently without jarring the magnet.",
    ],
    vivaQuestions: [
      { q: "Why can two magnetic field lines never intersect?", a: "If they intersected, a compass placed at the intersection point would point in two different directions simultaneously, which is physically impossible." },
      { q: "What does the closeness or density of field lines represent?", a: "The relative strength of the magnetic field in that region (higher density = stronger field)." },
    ],
    simId: "circuits",
    badge: "Prescribed Board Practical",
    icon: "🧭",
  },
];

export function getExperimentsForChapter(chapterId: string): ScienceExperiment[] {
  return SCIENCE_EXPERIMENTS.filter((e) => e.chapterId === chapterId);
}

export function getExperimentById(id: string): ScienceExperiment | undefined {
  return SCIENCE_EXPERIMENTS.find((e) => e.id === id);
}

export function getAllScienceExperiments(): ScienceExperiment[] {
  return SCIENCE_EXPERIMENTS;
}
