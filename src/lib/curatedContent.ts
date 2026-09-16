import { getTopic } from "./syllabus";
import type { MindmapDoc, NoteDoc, Flashcard, MCQ } from "./types";

/**
 * Handcrafted high-yield concept maps for key CBSE Class 10 board topics.
 */
const SPECIFIC_MINDMAPS: Record<string, MindmapDoc> = {
  "science:ch-chem1:balancing": {
    root: "Balancing Chemical Equations",
    nodes: [
      {
        label: "Fundamental Law",
        detail: "Law of Conservation of Mass",
        children: [
          { label: "Total mass of reactants = Total mass of products" },
          { label: "Number of atoms of each element must remain conserved" },
          { label: "Never alter chemical formulas / subscripts while balancing" },
        ],
      },
      {
        label: "Hit & Trial Method",
        detail: "Standard NCERT balancing steps",
        children: [
          { label: "Step 1: Enclose formulas in boxes (do not alter inside)" },
          { label: "Step 2: List number of atoms on LHS and RHS" },
          { label: "Step 3: Balance element with maximum atoms first (usually O or metals)" },
          { label: "Step 4: Check and balance remaining atoms (H, C, etc.)" },
        ],
      },
      {
        label: "Physical States Notation",
        detail: "State symbols required in CBSE marking scheme",
        children: [
          { label: "(s) Solid, (l) Liquid, (g) Gas" },
          { label: "(aq) Aqueous (solution in water)" },
          { label: "Reaction conditions (heat Δ, catalyst, pressure) above/below arrow" },
        ],
      },
      {
        label: "Classic Board Examples",
        detail: "Frequently asked NCERT balancing equations",
        children: [
          { label: "Fe + 4H₂O → Fe₃O₄ + 4H₂" },
          { label: "CH₄ + 2O₂ → CO₂ + 2H₂O (Combustion)" },
          { label: "6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O (Photosynthesis)" },
        ],
      },
    ],
  },
  "science:ch-chem1:types-reactions": {
    root: "Types of Chemical Reactions",
    nodes: [
      {
        label: "1. Combination Reaction",
        detail: "Two or more reactants unite into a single product (A + B → AB)",
        children: [
          { label: "CaO(s) + H₂O(l) → Ca(OH)₂ (Slaked lime, highly exothermic)" },
          { label: "C(s) + O₂(g) → CO₂(g)" },
        ],
      },
      {
        label: "2. Decomposition Reaction",
        detail: "Single reactant breaks into two or more simpler products (AB → A + B)",
        children: [
          { label: "Thermal: 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃ (green to reddish brown)" },
          { label: "Thermal: CaCO₃ → CaO + CO₂" },
          { label: "Thermal: 2Pb(NO₃)₂ → 2PbO + 4NO₂ (brown fumes) + O₂" },
          { label: "Electrolytic: 2H₂O → 2H₂ + O₂ (Vol ratio 2:1)" },
          { label: "Photolytic: 2AgCl → 2Ag + Cl₂ (White to grey in sunlight)" },
        ],
      },
      {
        label: "3. Displacement Reaction",
        detail: "More reactive element displaces less reactive element (A + BC → AC + B)",
        children: [
          { label: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s) (Blue to pale green)" },
          { label: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)" },
        ],
      },
      {
        label: "4. Double Displacement & Precipitation",
        detail: "Mutual exchange of ions between compounds (AB + CD → AD + CB)",
        children: [
          { label: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq) (White ppt)" },
          { label: "Neutralisation: Acid + Base → Salt + Water" },
        ],
      },
    ],
  },
  "science:ch-phy1:reflection": {
    root: "Reflection of Light & Spherical Mirrors",
    nodes: [
      {
        label: "Laws of Reflection",
        detail: "Universal laws valid for all reflecting surfaces",
        children: [
          { label: "Angle of incidence (i) = Angle of reflection (r)" },
          { label: "Incident ray, normal at point of incidence, and reflected ray lie in the same plane" },
        ],
      },
      {
        label: "Concave Mirror (Converging)",
        detail: "Reflecting surface curved inwards",
        children: [
          { label: "Real & inverted for object beyond Focus F" },
          { label: "Virtual & erect, enlarged when between Pole P and Focus F (shaving mirror)" },
          { label: "Dentist mirrors, solar furnaces, vehicle headlights" },
        ],
      },
      {
        label: "Convex Mirror (Diverging)",
        detail: "Reflecting surface curved outwards",
        children: [
          { label: "Always forms virtual, erect and diminished image" },
          { label: "Wide field of view; used as rear-view mirrors in vehicles" },
        ],
      },
      {
        label: "Sign Convention & Mirror Formula",
        detail: "New Cartesian Sign Convention",
        children: [
          { label: "Mirror formula: 1/v + 1/u = 1/f" },
          { label: "Magnification: m = h'/h = -v/u" },
          { label: "f is negative for concave mirror, positive for convex mirror" },
        ],
      },
    ],
  },
  "science:ch-phy2:ohm-law": {
    root: "Ohm's Law & Electric Resistance",
    nodes: [
      {
        label: "Ohm's Law Statement",
        detail: "V ∝ I at constant temperature",
        children: [
          { label: "V = I × R (Potential difference = Current × Resistance)" },
          { label: "Linear V-I graph with slope = Resistance R" },
          { label: "SI unit of resistance = Ohm (Ω = Volt / Ampere)" },
        ],
      },
      {
        label: "Factors Affecting Resistance",
        detail: "R = ρ(L / A)",
        children: [
          { label: "Length (L): R is directly proportional to length" },
          { label: "Cross-sectional Area (A): R is inversely proportional to area" },
          { label: "Resistivity (ρ): Material property; independent of dimensions" },
          { label: "Temperature: R increases with temperature for metals" },
        ],
      },
      {
        label: "Combination of Resistors",
        detail: "Series vs Parallel connections",
        children: [
          { label: "Series: R_eq = R₁ + R₂ + R₃ (Current same, V divides)" },
          { label: "Parallel: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ (V same, Current divides)" },
          { label: "Domestic wiring is always parallel (individual control, no single point failure)" },
        ],
      },
      {
        label: "Joule's Heating & Electric Power",
        detail: "H = I²Rt",
        children: [
          { label: "Electric Power: P = VI = I²R = V²/R" },
          { label: "Commercial unit: 1 kWh = 3.6 × 10⁶ Joules (1 Board of Trade Unit)" },
          { label: "Applications: Electric heater, fuse wire (low melting point)" },
        ],
      },
    ],
  },
  "science:ch-bio1:photosynthesis": {
    root: "Photosynthesis & Nutrition in Plants",
    nodes: [
      {
        label: "Overall Equation",
        detail: "Autotrophic nutrition converting light energy to chemical energy",
        children: [
          { label: "6CO₂ + 12H₂O + Sunlight + Chlorophyll → C₆H₁₂O₆ + 6O₂ + 6H₂O" },
          { label: "Stored in plant tissue as Starch (internal energy reserve)" },
        ],
      },
      {
        label: "Three Essential Events",
        detail: "Core steps tested in CBSE board exams",
        children: [
          { label: "1. Absorption of light energy by chlorophyll" },
          { label: "2. Conversion of light energy to chemical energy & water splitting (photolysis: 2H₂O → 4H⁺ + O₂ + 4e⁻)" },
          { label: "3. Reduction of carbon dioxide to carbohydrates" },
        ],
      },
      {
        label: "Site & Stomatal Regulation",
        detail: "Chloroplasts and Stomata",
        children: [
          { label: "Chloroplasts contain chlorophyll in mesophyll cells" },
          { label: "Stomatal pores controlled by kidney-shaped Guard Cells" },
          { label: "Guard cells swell (turgid) when water flows into them → pore opens" },
          { label: "Guard cells shrink (flaccid) → pore closes" },
        ],
      },
      {
        label: "NCERT Lab Activities",
        detail: "Board practical/experiment based questions",
        children: [
          { label: "Chlorophyll is necessary: Variegated leaf (money plant / croton) + Iodine test" },
          { label: "CO₂ is necessary: Bell jar with Potassium Hydroxide (KOH absorbs CO₂)" },
          { label: "Sunlight is necessary: Black paper strip on destarched leaf" },
        ],
      },
    ],
  },
  "maths:ch-alg2:quadratic-formula": {
    root: "Quadratic Equations & Roots",
    nodes: [
      {
        label: "Standard Form",
        detail: "ax² + bx + c = 0 where a ≠ 0",
        children: [
          { label: "Degree 2 polynomial equation" },
          { label: "At most 2 real roots (solutions)" },
        ],
      },
      {
        label: "Quadratic Formula (Sridharacharya Rule)",
        detail: "x = (-b ± √(b² - 4ac)) / (2a)",
        children: [
          { label: "Discriminant: D = b² - 4ac" },
          { label: "Always write values of a, b, c with their signs first" },
        ],
      },
      {
        label: "Nature of Roots",
        detail: "Decided by Discriminant D",
        children: [
          { label: "D > 0: Two distinct real roots" },
          { label: "D = 0: Two equal (coincident) real roots: x = -b/(2a)" },
          { label: "D < 0: No real roots" },
        ],
      },
      {
        label: "Word Problems Strategies",
        detail: "High-yield CBSE 4/5-marker categories",
        children: [
          { label: "Speed-Distance-Time: Upstream/Downstream boat problems" },
          { label: "Geometry: Right triangle hypotenuse & sides, rectangle area" },
          { label: "Work & Pipes: Water taps filling a tank together" },
        ],
      },
    ],
  },
};

/**
 * Returns a high-yield concept map for ANY CBSE topic, either from the handcrafted
 * set or generated deterministically from syllabus metadata.
 */
export function getCuratedMindmap(subjectId: string, chapterId: string, topicId: string): MindmapDoc {
  const key = `${subjectId}:${chapterId}:${topicId}`;
  if (SPECIFIC_MINDMAPS[key]) {
    return SPECIFIC_MINDMAPS[key];
  }

  const found = getTopic(subjectId, chapterId, topicId);
  const title = found?.topic.name ?? topicId.replace(/-/g, " ");
  const focus = found?.topic.focus ?? "Core NCERT concepts, formulas, and board exam principles";
  const chapterTitle = found?.chapter.name ?? "Chapter Overview";
  const branch = found?.chapter.branch ?? found?.subject.name ?? "Class 10";

  return {
    root: title,
    nodes: [
      {
        label: "Core Principles & Definitions",
        detail: `Foundational NCERT concepts for ${title}`,
        children: [
          { label: focus },
          { label: `Chapter Context: ${chapterTitle} (${branch})` },
          { label: "Key terminology and precise NCERT scientific/mathematical definitions" },
        ],
      },
      {
        label: "Key Mechanism & Detailed Working",
        detail: "Step-by-step conceptual mechanism and standard derivations",
        children: [
          { label: "Primary governing rules, conditions, or formulas" },
          { label: "Step-by-step procedure or cause-and-effect relationship" },
          { label: "Key observations, diagrammatic representations, or graphical curves" },
        ],
      },
      {
        label: "CBSE Board Exam High-Yield Areas",
        detail: "Directly tested board question patterns and marking points",
        children: [
          { label: "Common 2-mark reasoning and 3-mark analytical board questions" },
          { label: "Frequent student pitfalls and step-marking keywords to include" },
          { label: "Worked example or textbook case-study scenario" },
        ],
      },
      {
        label: "Quick Revision & Memory Hooks",
        detail: "Rapid-fire summary bullets for last-minute recall",
        children: [
          { label: "Summary formula / law in one clear sentence" },
          { label: "Memory mnemonic or real-world comparison" },
          { label: "Key takeaway for 100% board mastery" },
        ],
      },
    ],
  };
}

/**
 * Fallback notes generator for any CBSE topic
 */
export function getCuratedNotes(subjectId: string, chapterId: string, topicId: string): NoteDoc {
  const found = getTopic(subjectId, chapterId, topicId);
  const topicName = found?.topic.name ?? topicId;
  const focus = found?.topic.focus ?? "Important NCERT board principles";
  const chapterName = found?.chapter.name ?? chapterId;
  const subjectName = found?.subject.name ?? subjectId;

  return {
    topic: topicName,
    chapter: chapterName,
    subject: subjectName,
    definition: `${topicName} is a fundamental concept in ${chapterName} focusing on ${focus}.`,
    keyPoints: [
      focus,
      `Always adhere strictly to the NCERT textbook terminology for maximum CBSE board marks.`,
      `Be prepared for both direct theoretical questions and practical/application-based numericals or case studies.`,
      `Highlight key SI units, chemical states, or mathematical conditions in every final answer.`,
    ],
    examples: [
      `Standard NCERT Textbook Example: Observe how ${topicName.toLowerCase()} operates under controlled experimental or problem conditions.`,
      `Real-World Application: How ${topicName.toLowerCase()} affects everyday phenomena or engineering applications.`,
    ],
    commonMistakes: [
      "Missing SI units or physical state symbols in final answers.",
      "Conflating theoretical definitions with real-world approximations.",
      "Skipping intermediate calculation or derivation steps where CBSE step-marking applies.",
    ],
    examKeywords: [
      topicName,
      "Conservation",
      "Proportionality",
      "Equilibrium",
      "CBSE Marking Scheme",
    ],
    quickRevision: [
      `✅ Master the core definition of ${topicName}.`,
      `✅ Practice drawing and labelling any associated diagrams or graphs.`,
      `✅ Solve at least 3 previous years' CBSE board questions on this topic.`,
    ],
  };
}

/**
 * Fallback flashcards generator for any CBSE topic
 */
export function getCuratedFlashcards(subjectId: string, chapterId: string, topicId: string): Flashcard[] {
  const found = getTopic(subjectId, chapterId, topicId);
  const topicName = found?.topic.name ?? topicId;
  const focus = found?.topic.focus ?? "Core NCERT principles";

  return [
    {
      front: `What is the primary concept behind ${topicName}?`,
      back: focus,
    },
    {
      front: `Which law or governing principle applies to ${topicName}?`,
      back: `It is governed by fundamental NCERT CBSE Class 10 rules. Ensure your explanation specifies all boundary conditions and units.`,
    },
    {
      front: `What is a common mistake students make in ${topicName} in board exams?`,
      back: `Forgetting state symbols, omitting SI units, or skipping intermediate formula steps in numericals.`,
    },
    {
      front: `How can you easily remember the key takeaways of ${topicName}?`,
      back: `Break down the concept into Definition, Formula/Reaction, and 1 Real-Life Example.`,
    },
  ];
}
