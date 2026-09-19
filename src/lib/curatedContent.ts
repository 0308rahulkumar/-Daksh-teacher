import { getTopic } from "./syllabus";
import type { MindmapDoc, NoteDoc, Flashcard, GeneratedQuizQuestion } from "./types";
import { BSEB_MINDMAPS, BSEB_NOTES, BSEB_FLASHCARDS } from "./bsebCuratedData";
import { GRAMMAR_MINDMAPS, GRAMMAR_NOTES, GRAMMAR_FLASHCARDS } from "./grammarCuratedData";

/**
 * Handcrafted high-yield concept maps for key CBSE & BSEB Class 10 board topics.
 * Sourced from standard NCERT, Panorama Part 2, and English & Hindi Grammar.
 */
const SPECIFIC_MINDMAPS: Record<string, MindmapDoc> = {
  ...BSEB_MINDMAPS,
  ...GRAMMAR_MINDMAPS,
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
  "science:ch-phy1:mirrors": {
    root: "Reflection & Spherical Mirrors",
    nodes: [
      {
        label: "Laws of Reflection",
        detail: "Universal laws valid for all reflecting surfaces",
        children: [
          { label: "Angle of incidence (i) = Angle of reflection (r)" },
          { label: "Incident ray, normal at point of incidence, and reflected ray lie in same plane" },
        ],
      },
      {
        label: "Concave Mirror (Converging)",
        detail: "Reflecting surface curved inwards",
        children: [
          { label: "Real & inverted for object beyond Focus F" },
          { label: "Virtual & erect, enlarged when between Pole P and Focus F (shaving/dentist mirror)" },
          { label: "Solar furnaces, car headlights (bulb at focus produces parallel beam)" },
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
          { label: "Commercial unit: 1 kWh = 3.6 × 10⁶ Joules" },
          { label: "Applications: Electric heater, fuse wire (low melting point)" },
        ],
      },
    ],
  },
  "science:ch-bio1:nutrition": {
    root: "Nutrition in Plants & Humans",
    nodes: [
      {
        label: "Autotrophic Nutrition (Photosynthesis)",
        detail: "6CO₂ + 12H₂O + Sunlight + Chlorophyll → C₆H₁₂O₆ + 6O₂ + 6H₂O",
        children: [
          { label: "Step 1: Absorption of light energy by chlorophyll" },
          { label: "Step 2: Water splitting (photolysis) & conversion to chemical energy" },
          { label: "Step 3: Reduction of CO₂ to glucose/carbohydrates" },
          { label: "Stomatal Guard Cells: Turgid (swollen) opens pore, flaccid closes pore" },
        ],
      },
      {
        label: "Mouth & Stomach Digestion",
        detail: "Upper alimentary canal enzymatic breakdown",
        children: [
          { label: "Salivary Amylase: Starch → Maltose (pH ~6.8)" },
          { label: "Stomach HCl: pH 1.5-2.0; kills bacteria, activates pepsinogen to Pepsin" },
          { label: "Pepsin: Digests proteins into peptones in acidic medium" },
          { label: "Gastric Mucus: Protects stomach lining from corrosive HCl acid" },
        ],
      },
      {
        label: "Small Intestine (Site of Complete Digestion)",
        detail: "Bile, pancreatic juice & intestinal enzymes",
        children: [
          { label: "Liver Bile: Emulsifies large fat globules into small micelles; neutralises acid" },
          { label: "Pancreatic Trypsin: Proteins → Peptides; Lipase: Emulsified fats → Fatty acids" },
          { label: "Intestinal Enzymes: Final conversion to Amino acids, Glucose, Fatty acids + Glycerol" },
          { label: "Villi: Finger-like projections with microvilli & blood capillaries to maximize absorption" },
        ],
      },
      {
        label: "Large Intestine & Egestion",
        detail: "Water absorption and waste removal",
        children: [
          { label: "Absorbs excess water from unabsorbed food mass" },
          { label: "Anal sphincter regulates exit of solid waste (faeces)" },
        ],
      },
    ],
  },
  "science:ch-bio1:respiration": {
    root: "Respiration & Energy Release",
    nodes: [
      {
        label: "Glycolysis (Universal First Step)",
        detail: "Occurs in Cytoplasm of all living cells",
        children: [
          { label: "Glucose (6-Carbon) broken into 2 Pyruvate (3-Carbon) + 2 ATP" },
          { label: "Does not require oxygen" },
        ],
      },
      {
        label: "3 Pathways of Glucose Breakdown",
        detail: "CBSE High-Yield Master Flowchart",
        children: [
          { label: "1. Absence of O₂ (Yeast): Pyruvate → Ethanol + CO₂ + 2 ATP (Fermentation)" },
          { label: "2. Lack of O₂ (Human Muscle during sprint): Pyruvate → Lactic Acid + 2 ATP (Causes Cramps)" },
          { label: "3. Presence of O₂ (Mitochondria): Pyruvate + O₂ → 6CO₂ + 6H₂O + 36-38 ATP (Aerobic)" },
        ],
      },
      {
        label: "Human Respiratory System",
        detail: "Gas exchange pathway",
        children: [
          { label: "Nostrils (hair & mucus filter) → Pharynx → Larynx → Trachea (cartilage rings prevent collapse)" },
          { label: "Bronchi → Bronchioles → Alveoli (balloon-like sacs)" },
          { label: "Alveolar surface: Vast surface area (~80 m²) + thin walls + dense capillaries for rapid diffusion" },
          { label: "Hemoglobin: Respiratory pigment with high affinity for O₂ (deficiency causes anemia/fatigue)" },
        ],
      },
      {
        label: "Aquatic vs Terrestrial Breathing",
        detail: "Why fish breathe faster than land animals",
        children: [
          { label: "Dissolved oxygen in water is significantly lower than oxygen in air" },
          { label: "Aquatic animals must pump water over gills at a much faster rate to obtain sufficient O₂" },
        ],
      },
    ],
  },
  "science:ch-bio1:transportation": {
    root: "Transportation in Animals & Plants",
    nodes: [
      {
        label: "Human Heart Structure",
        detail: "4-chambered muscular double pump",
        children: [
          { label: "Right Atrium & Ventricle: Receive & pump deoxygenated blood" },
          { label: "Left Atrium & Ventricle: Receive & pump oxygen-rich blood" },
          { label: "Thick muscular walls in Ventricles (especially Left Ventricle) to pump blood to entire body" },
          { label: "Valves (cuspid/semilunar): Guarantee one-way blood flow and prevent backward regurgitation" },
        ],
      },
      {
        label: "Double Circulation Flow",
        detail: "Blood passes through the heart twice during one complete cycle",
        children: [
          { label: "Pulmonary: Right Ventricle → Pulmonary Artery → Lungs → Pulmonary Veins → Left Atrium" },
          { label: "Systemic: Left Ventricle → Aorta → Organs/Tissues → Vena Cava → Right Atrium" },
          { label: "Benefit: Complete separation of oxygenated and deoxygenated blood enables high energy efficiency in warm-blooded mammals" },
        ],
      },
      {
        label: "Blood & Lymph System",
        detail: "Circulatory fluids",
        children: [
          { label: "Arteries: Thick elastic walls, carry blood away from heart under high pressure, no valves" },
          { label: "Veins: Thin walls, carry blood back towards heart, have valves to prevent backflow" },
          { label: "Capillaries: Single-cell-thick walls for nutrient & gas exchange" },
          { label: "Platelets: Clot blood at injury sites using fibrin mesh" },
          { label: "Lymph: Colourless fluid carrying digested fats from intestine & excess tissue fluid" },
        ],
      },
      {
        label: "Plant Transport: Xylem vs Phloem",
        detail: "Water vs Food translocation",
        children: [
          { label: "Xylem: Vessels & tracheids carry water & minerals unidirectionally upwards via Transpiration Pull (passive)" },
          { label: "Phloem: Sieve tubes & companion cells translocate sucrose bidirectionally using ATP energy (active transport)" },
        ],
      },
    ],
  },
  "science:ch-bio1:excretion": {
    root: "Excretion & Nephron Filtration",
    nodes: [
      {
        label: "Human Excretory System",
        detail: "Organs involved in nitrogenous waste elimination",
        children: [
          { label: "Pair of Kidneys: Bean-shaped organs in abdomen on either side of backbone" },
          { label: "Pair of Ureters: Muscular tubes carrying urine from kidneys to bladder" },
          { label: "Urinary Bladder: Muscular reservoir under nervous control" },
          { label: "Urethra: Duct for urine exit" },
        ],
      },
      {
        label: "Nephron (Functional Unit of Kidney)",
        detail: "Around 1 million nephrons per kidney",
        children: [
          { label: "Bowman's Capsule: Cup-shaped sac enclosing the Glomerulus capillary cluster" },
          { label: "Henle's Loop & Convoluted Tubules: Tubular network surrounded by capillaries" },
          { label: "Collecting Duct: Gathers urine from multiple nephrons and drains into renal pelvis" },
        ],
      },
      {
        label: "3 Steps of Urine Formation",
        detail: "CBSE 3/5-marker core process",
        children: [
          { label: "1. Ultrafiltration: Glomerular blood pressure pushes water, urea, glucose, amino acids & salts into Bowman's capsule (blood cells & proteins remain)" },
          { label: "2. Selective Reabsorption: As filtrate moves along tubule, glucose, amino acids, essential ions and water are reabsorbed back into capillaries" },
          { label: "3. Tubular Secretion: Extra ions (H⁺, K⁺) secreted into tubular filtrate, forming final Urine" },
          { label: "Water reabsorption depends on body hydration level & amount of dissolved waste" },
        ],
      },
      {
        label: "Artificial Kidney (Hemodialysis) & Plant Excretion",
        detail: "Medical & botanical excretion",
        children: [
          { label: "Hemodialysis: Cellophane dialyzing tubes in fluid with same osmotic pressure as blood, except zero nitrogenous waste; no reabsorption occurs" },
          { label: "Plant Excretion: O₂ & CO₂ via stomata; excess water via transpiration; resins & gums in old xylem; shedding dead leaves" },
        ],
      },
    ],
  },
  "science:ch-bio2:nervous-system": {
    root: "Nervous System & Reflex Arc",
    nodes: [
      {
        label: "Neuron (Structural & Functional Unit)",
        detail: "Specialised cell for electrical communication",
        children: [
          { label: "Dendrites: Branching fibers that detect chemical stimuli and trigger electrical impulse" },
          { label: "Cyton / Cell Body: Houses nucleus and organelles" },
          { label: "Axon: Long insulated cable carrying electrical impulse away from cell body" },
          { label: "Nerve Endings: Terminal branches releasing neurotransmitters across synapse" },
        ],
      },
      {
        label: "Synaptic Transmission",
        detail: "Microscopic gap between adjacent neurons",
        children: [
          { label: "Electrical impulse arriving at axon tip releases neurotransmitter chemicals (acetylcholine)" },
          { label: "Chemical diffuses across synaptic cleft" },
          { label: "Binds to receptors on next dendrite, generating a new electrical impulse" },
          { label: "Crucial rule: Synaptic transmission is strictly unidirectional" },
        ],
      },
      {
        label: "Reflex Arc Pathway",
        detail: "Rapid, involuntary, automatic response to emergency stimuli",
        children: [
          { label: "Receptor: Sensory organ detects stimulus (e.g., heat pain sensors in skin)" },
          { label: "Sensory Neuron: Transmits impulse from receptor to spinal cord" },
          { label: "Relay Neuron: Present in spinal cord; integrates and routes impulse directly to motor neuron" },
          { label: "Motor Neuron: Transmits command signal from spinal cord to effector" },
          { label: "Effector: Muscle or gland acts immediately (e.g., arm muscle pulls hand back in milliseconds)" },
          { label: "Brain role: Spinal cord acts first for survival; message is sent to brain simultaneously for memory" },
        ],
      },
    ],
  },
  "science:ch-bio4:crosses": {
    root: "Mendel's Crosses & Genetics Ratios",
    nodes: [
      {
        label: "Monohybrid Cross (One Pair of Contrasting Traits)",
        detail: "Mendel crossed Pure Tall (TT) with Pure Dwarf (tt) pea plants",
        children: [
          { label: "F1 Generation: All heterozygous Tall (Tt) — proves Law of Dominance" },
          { label: "Self-pollination of F1 (Tt × Tt): Gametes T and t" },
          { label: "F2 Phenotypic Ratio: 3 Tall : 1 Dwarf (3:1)" },
          { label: "F2 Genotypic Ratio: 1 TT : 2 Tt : 1 tt (1:2:1)" },
          { label: "Law of Segregation: Alleles separate during gamete formation so each gamete carries only one allele" },
        ],
      },
      {
        label: "Dihybrid Cross (Two Pairs of Contrasting Traits)",
        detail: "Round Yellow (RRYY) × Wrinkled Green (rryy) seeds",
        children: [
          { label: "F1 Generation: All Round Yellow (RrYy)" },
          { label: "F2 Phenotypic Ratio: 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green (9:3:3:1)" },
          { label: "Law of Independent Assortment: Inheritance of one pair of characters is completely independent of the other pair" },
        ],
      },
      {
        label: "Key Genetics Terminology",
        detail: "NCERT definitions tested in CBSE exams",
        children: [
          { label: "Gene: Segment of DNA that codes for a protein or trait" },
          { label: "Alleles: Alternative forms of a gene (e.g., T and t)" },
          { label: "Dominant trait: Expressed even in presence of single allele (TT or Tt)" },
          { label: "Recessive trait: Expressed only in homozygous condition (tt)" },
        ],
      },
    ],
  },
  "science:ch-bio4:sex-determination": {
    root: "Sex Determination in Humans",
    nodes: [
      {
        label: "Human Chromosome Complement",
        detail: "46 chromosomes arranged in 23 pairs",
        children: [
          { label: "22 pairs of Autosomes: Identical in both males and females; control body traits" },
          { label: "1 pair of Allosomes / Sex Chromosomes: Determine biological sex" },
          { label: "Female sex chromosomes: Perfect pair XX (homogametic)" },
          { label: "Male sex chromosomes: Mismatched pair XY (heterogametic - Y is smaller)" },
        ],
      },
      {
        label: "Genetic Cross & Mechanism",
        detail: "Father's sperm decides the sex of the child",
        children: [
          { label: "Mother (XX) produces only one type of egg: All carry X chromosome" },
          { label: "Father (XY) produces two types of sperm in equal 50:50 proportions: 50% X and 50% Y" },
          { label: "If sperm with X fertilises egg (X + X) → XX zygote → Female / Girl child" },
          { label: "If sperm with Y fertilises egg (Y + X) → XY zygote → Male / Boy child" },
          { label: "Strict 50% (1:1) statistical probability for every conception" },
        ],
      },
      {
        label: "CBSE Social & Scientific High-Yield Question",
        detail: "Defeating social misconceptions through science",
        children: [
          { label: "Question: 'Why is it scientifically incorrect to hold a mother responsible for the sex of her child?'" },
          { label: "Answer: Because the mother produces only X chromosomes; the biological sex is determined strictly by whether an X-bearing or Y-bearing sperm from the father fertilises the egg" },
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
 * Handcrafted high-yield CBSE revision notes (from BioNotes and NCERT).
 */
const SPECIFIC_NOTES: Record<string, NoteDoc> = {
  ...BSEB_NOTES,
  ...GRAMMAR_NOTES,
  "science:ch-bio1:nutrition": {
    topic: "Nutrition in Plants & Animals",
    chapter: "Life Processes",
    subject: "Science (Biology)",
    definition: "Nutrition is the biological process of obtaining food and converting it into energy and body building blocks. It is divided into Autotrophic (producers synthesizing organic food from CO₂ & H₂O) and Heterotrophic (consumers ingesting pre-formed organic matter).",
    keyPoints: [
      "Photosynthesis Equation: 6CO₂ + 12H₂O + Sunlight + Chlorophyll → C₆H₁₂O₆ + 6O₂ + 6H₂O.",
      "The 3 essential photosynthetic events: Light absorption by chlorophyll → Photolysis of water & energy conversion → Reduction of CO₂ into carbohydrates.",
      "Salivary Amylase in mouth converts complex starch into maltose disaccharide at neutral/mildly acidic pH.",
      "Stomach secretes Gastric Juice containing Hydrochloric Acid (pH 1.5-2 to activate pepsin and kill microbes), Pepsin (breaks proteins to peptones), and Mucus (shields gastric mucosa).",
      "Small Intestine is the ultimate site of complete digestion: Bile from liver emulsifies fats; Pancreatic Trypsin digests proteins and Lipase digests emulsified lipids.",
      "Villi and microvilli in the ileum drastically enhance absorptive surface area and are densely packed with blood capillaries and lacteals.",
    ],
    formulas: [
      "6CO₂ + 12H₂O + Chlorophyll + Light → C₆H₁₂O₆ + 6O₂ + 6H₂O",
      "Starch + Salivary Amylase → Maltose",
      "Proteins + Pepsin/Trypsin → Peptides → Amino Acids",
      "Fats + Bile Salts → Emulsified Fats + Lipase → Fatty Acids + Glycerol",
    ],
    differences: [
      {
        label: "Autotrophic vs Heterotrophic Nutrition",
        a: "Autotrophic: Organisms (green plants, cyanobacteria) manufacture their own organic food from simple inorganic raw materials (CO₂, H₂O) using sunlight.",
        b: "Heterotrophic: Organisms (animals, fungi, bacteria) cannot synthesize food; they ingest organic matter prepared by autotrophs.",
      },
      {
        label: "Pepsin vs Trypsin",
        a: "Pepsin: Secreted by gastric glands in stomach; functions strictly in highly acidic pH (HCl, pH ~1.5-2.0).",
        b: "Trypsin: Secreted by pancreas into small intestine; functions strictly in alkaline pH (bile salts, pH ~7.8-8.4).",
      },
    ],
    examples: [
      "Variegated Leaf Experiment: Money plant or croton tested with iodine demonstrates chlorophyll is indispensable for starch synthesis.",
      "KOH Bell-jar Experiment: Potassium hydroxide absorbs carbon dioxide, proving CO₂ is essential for photosynthesis.",
      "Villi in small intestine: Maximise nutrient diffusion into mesenteric bloodstream.",
    ],
    commonMistakes: [
      "Saying bile contains digestive enzymes — Bile contains NO enzymes! It contains bile salts for physical fat emulsification and sodium bicarbonate for alkalization.",
      "Forgetting to mention the protective role of gastric mucus against self-digestion by stomach HCl.",
      "Writing that stomatal pores open due to gas pressure — Guard cells swell and open the pore because water flows into them by osmosis (turgidity).",
    ],
    examKeywords: [
      "Photolysis of water",
      "Emulsification of fats",
      "Salivary amylase",
      "Pepsin & Trypsin",
      "Villi surface area",
      "Stomatal guard cells turgidity",
    ],
    quickRevision: [
      "✅ Master the balanced 6CO₂ photosynthesis equation with chlorophyll and sunlight written over the arrow.",
      "✅ Memorize the enzyme sequence: Salivary Amylase (Mouth) → Pepsin (Stomach) → Trypsin/Lipase (Small Intestine).",
      "✅ Know why small intestine in herbivores is longer than carnivores (cellulose digestion takes longer).",
    ],
  },
  "science:ch-bio1:respiration": {
    topic: "Respiration & Energy Breakdown",
    chapter: "Life Processes",
    subject: "Science (Biology)",
    definition: "Respiration is the cellular catabolic biochemical pathway where glucose is oxidised step-wise to release chemical energy in the form of ATP (Adenosine Triphosphate), the universal energy currency of cells.",
    keyPoints: [
      "Step 1 is Glycolysis in Cytoplasm: 1 molecule of 6-carbon Glucose breaks into 2 molecules of 3-carbon Pyruvate, yielding a net 2 ATP without oxygen.",
      "Pathway 1 (Yeast Anaerobic / Fermentation): Pyruvate converted to Ethanol (2C) + CO₂ + 2 ATP in absence of oxygen.",
      "Pathway 2 (Human Muscle Cells during heavy sprinting): Pyruvate converted to Lactic Acid (3C) + 2 ATP due to oxygen debt; accumulation of lactic acid causes muscle fatigue and cramps.",
      "Pathway 3 (Aerobic Respiration in Mitochondria): Pyruvate completely oxidised in presence of O₂ to 6CO₂ + 6H₂O + 36-38 ATP.",
      "Alveoli provide an immense respiratory surface area (~80 m²) with ultrathin walls and dense capillary beds for O₂/CO₂ exchange.",
      "Hemoglobin in RBCs transports oxygen because the solubility of oxygen in blood plasma is too low for human body demands.",
    ],
    differences: [
      {
        label: "Aerobic vs Anaerobic Respiration",
        a: "Aerobic: Occurs in mitochondria in presence of O₂; produces 36-38 ATP per glucose; end products are CO₂ and H₂O.",
        b: "Anaerobic: Occurs in cytoplasm in absence/deficiency of O₂; produces only 2 ATP per glucose; end products are ethanol + CO₂ (yeast) or lactic acid (muscles).",
      },
      {
        label: "Breathing vs Cellular Respiration",
        a: "Breathing: Physical mechanical process of inhaling air into lungs and exhaling air rich in CO₂; no enzymes or ATP produced.",
        b: "Respiration: Biochemical cellular breakdown of glucose inside cells to produce ATP through specific enzymes.",
      },
    ],
    examples: [
      "Muscle Cramps in 100m Sprinters: Sudden strenuous exercise outpaces blood oxygen supply, causing anaerobic fermentation in muscles yielding lactic acid.",
      "Brewing & Bread Baking: Yeast anaerobic respiration generates CO₂ (which rises the dough making it fluffy) and ethanol.",
      "Aquatic organisms: Goldfish open and close gills rapidly because dissolved O₂ concentration in water is far lower than atmospheric air.",
    ],
    commonMistakes: [
      "Confusing Pyruvate with Glucose: Glucose has 6 Carbons; Pyruvate has 3 Carbons.",
      "Writing that anaerobic respiration produces equal energy to aerobic — Aerobic yields ~18 times more ATP per glucose molecule.",
      "Forgetting the role of cartilage rings in trachea: They prevent the tracheal airway from collapsing when air pressure drops during inhalation.",
    ],
    examKeywords: [
      "Glycolysis in cytoplasm",
      "Mitochondrial oxidation",
      "Lactic acid accumulation & muscle cramps",
      "Alveolar surface area",
      "Respiratory pigment hemoglobin",
      "Tracheal rings of cartilage",
    ],
    quickRevision: [
      "✅ Memorize the 3-branch glucose breakdown flowchart from NCERT Page 102.",
      "✅ Remember: Yeast → Ethanol (2C) + CO₂; Muscles → Lactic Acid (3C); Mitochondria → CO₂ + H₂O + high ATP.",
      "✅ Be ready to explain why diffusion alone is inadequate to deliver oxygen in large multi-cellular animals (requires hemoglobin).",
    ],
  },
  "science:ch-bio1:transportation": {
    topic: "Transportation & Double Circulation",
    chapter: "Life Processes",
    subject: "Science (Biology)",
    definition: "Transportation is the continuous internal physiological movement of water, nutrients, respiratory gases, and metabolic wastes across an organism's body via vascular tissues (Xylem/Phloem in plants, Blood/Lymph in animals).",
    keyPoints: [
      "Human heart has 4 distinct chambers to prevent the mixing of oxygen-rich blood and carbon dioxide-rich blood.",
      "Double Circulation: Blood circulates through the human heart twice during each complete bodily cycle — Pulmonary Circulation (heart to lungs and back) and Systemic Circulation (heart to tissues and back).",
      "Arteries carry oxygenated blood away from heart under high hydrostatic pressure (thick elastic muscular walls, no valves), except Pulmonary Artery which carries deoxygenated blood.",
      "Veins carry deoxygenated blood towards heart under low pressure (thinner walls, internal valves prevent reverse flow), except Pulmonary Vein which carries oxygenated blood.",
      "Xylem carries water and dissolved minerals from roots to leaves unidirectionally driven by root pressure (at night) and Transpiration Pull (during day).",
      "Phloem translocates photosynthetic sugars (sucrose) bidirectionally using metabolic energy (ATP) through sieve tubes and companion cells.",
    ],
    differences: [
      {
        label: "Arteries vs Veins",
        a: "Arteries: Thick muscular elastic walls, deep-seated, narrow lumen, high blood pressure, no valves, carry blood away from heart.",
        b: "Veins: Thin walls, superficial, wide lumen, low blood pressure, internal semilunar valves present, carry blood towards heart.",
      },
      {
        label: "Xylem vs Phloem",
        a: "Xylem: Composed mainly of dead cells (vessels, tracheids); conducts water and minerals unidirectionally; driven by physical transpiration pull without ATP.",
        b: "Phloem: Composed of living cells (sieve tubes, companion cells); translocates organic nutrients bidirectionally; requires metabolic ATP energy.",
      },
    ],
    examples: [
      "Sphygmomanometer: Device used to measure arterial blood pressure (Standard normal: 120/80 mm Hg systolic/diastolic).",
      "Wilting of potted plants on hot dry afternoons: Transpiration water loss temporarily exceeds xylem root absorption rate.",
      "Lacteal vessels in intestinal villi: Absorb digested fats and transport them via the lymphatic system into the venous circulation.",
    ],
    commonMistakes: [
      "Saying all arteries carry oxygenated blood — Pulmonary artery is the sole exception carrying deoxygenated blood to the lungs.",
      "Confusing systolic (120 mmHg, ventricular contraction) with diastolic (80 mmHg, ventricular relaxation).",
      "Forgetting why ventricles have thicker muscular walls than atria — Ventricles must generate sufficient pressure to pump blood to lungs and distant organs.",
    ],
    examKeywords: [
      "Double circulation",
      "Pulmonary vs Systemic circuit",
      "Atrioventricular & Semilunar valves",
      "Transpiration pull",
      "Phloem translocation & companion cells",
      "Blood platelets clotting mechanism",
    ],
    quickRevision: [
      "✅ Trace the blood path: Body → Vena Cava → RA → RV → Pulmonary Artery → Lungs → Pulmonary Vein → LA → LV → Aorta → Body.",
      "✅ Know that warm-blooded mammals/birds require 4 chambers to maintain constant elevated body temperature through high metabolic efficiency.",
      "✅ Distinguish blood (red, RBCs, high protein) from lymph (pale yellow/colourless, lacks RBCs, fewer proteins).",
    ],
  },
  "science:ch-bio1:excretion": {
    topic: "Excretion & Nephron Function",
    chapter: "Life Processes",
    subject: "Science (Biology)",
    definition: "Excretion is the biological process of removing toxic metabolic nitrogenous waste products (urea, uric acid, excess salts) from the internal environment to maintain physiological homeostasis.",
    keyPoints: [
      "Human excretory system comprises 2 Kidneys, 2 Ureters, 1 Urinary Bladder, and 1 Urethra.",
      "Nephron is the microscopic structural and functional filtration unit of the kidney, with roughly 1 million nephrons per kidney.",
      "Step 1: Glomerular Ultrafiltration — High blood pressure in the glomerulus forces water, glucose, amino acids, urea, and mineral salts through the filtration barrier into Bowman's capsule as primary filtrate (blood cells and large plasma proteins stay in the bloodstream).",
      "Step 2: Selective Reabsorption — As filtrate flows through the convoluted tubule and loop of Henle, essential nutrients (glucose, amino acids, ions) and majority of water are actively/passively reabsorbed back into the peritubular capillaries.",
      "Step 3: Tubular Secretion & Urine Collection — Excess potassium, hydrogen ions, and ammonia are secreted into the lumen, forming concentrated urine that drains into the collecting duct.",
      "Hemodialysis (Artificial Kidney) purifies blood using cellophane dialyzing fluid with identical osmotic pressure as blood, except it contains zero nitrogenous waste; note that artificial kidneys perform NO reabsorption.",
    ],
    differences: [
      {
        label: "Excretion vs Egestion",
        a: "Excretion: Removal of metabolic nitrogenous wastes (urea, uric acid) produced by cellular chemical reactions in the body.",
        b: "Egestion: Expulsion of undigested, unabsorbed food residue through the anus via the gastrointestinal tract.",
      },
      {
        label: "Natural Kidney vs Hemodialysis",
        a: "Natural Kidney: Performs ultrafiltration followed by vital selective tubular reabsorption of water, glucose, and salts.",
        b: "Hemodialysis: Performs diffusion/filtration across cellophane membranes to clear urea; selective tubular reabsorption cannot occur.",
      },
    ],
    examples: [
      "Daily filtrate volume: Kidneys filter ~180 Litres of initial filtrate per day, but only ~1.5 to 2 Litres is excreted as urine because 99% is selectively reabsorbed.",
      "Plant excretion: Resins and gums stored in non-functional old xylem wood, shedding aged leaves filled with accumulated cellular wastes.",
    ],
    commonMistakes: [
      "Writing that urine formation has only 1 step — Always include all 3: Ultrafiltration, Selective Reabsorption, and Tubular Secretion.",
      "Claiming glucose is normally present in urine — In a healthy individual, 100% of filtered glucose is completely reabsorbed back into blood capillaries.",
      "Forgetting that dialysis fluid must have the same osmotic pressure as blood to prevent RBCs from bursting or shrinking.",
    ],
    examKeywords: [
      "Bowman's capsule",
      "Glomerular ultrafiltration",
      "Selective tubular reabsorption",
      "Henle's loop & collecting duct",
      "Hemodialysis semipermeable tubes",
      "Plant resins and old xylem",
    ],
    quickRevision: [
      "✅ Label the nephron diagram accurately: Afferent arteriole, Glomerulus, Bowman's capsule, Tubule, Capillary network, Collecting duct.",
      "✅ Master the two factors regulating water reabsorption: Amount of excess water in the body, and quantity of dissolved waste to be excreted.",
      "✅ Understand that the urinary bladder is muscular and regulated by the nervous system, allowing voluntary urination control.",
    ],
  },
  "science:ch-bio2:nervous-system": {
    topic: "Nervous System & Reflex Arc",
    chapter: "Control and Coordination",
    subject: "Science (Biology)",
    definition: "The nervous system is an organ system coordinating rapid bodily actions and sensory perception using electrochemical impulses transmitted along specialised cells called neurons.",
    keyPoints: [
      "Neuron is the structural and functional unit of the nervous system consisting of Dendrites, Cell Body (Cyton), Axon, and Axon Terminals.",
      "Transmission mechanism: Dendrite tips acquire chemical stimulus → generate electrical impulse → travels along axon → triggers release of neurotransmitter chemicals at nerve ending → chemical diffuses across microscopic Synapse to initiate electrical impulse in next neuron.",
      "A Reflex Action is an instantaneous, involuntary, unconscious response to a stimulus protecting the body from physical damage (e.g., snatching hand away from a burning hot pan).",
      "Reflex Arc is the anatomical pathway tracing the reflex impulse: Receptor → Sensory Neuron → Spinal Cord Relay Neuron → Motor Neuron → Effector Muscle/Gland.",
      "The spinal cord directly executes the motor output before the signal reaches the brain, minimizing response latency to prevent tissue injury.",
    ],
    differences: [
      {
        label: "Sensory Neuron vs Motor Neuron",
        a: "Sensory Neuron: Carries sensory nerve impulses from receptors (sense organs) inwards to the Central Nervous System (spinal cord/brain).",
        b: "Motor Neuron: Carries motor instructions from the Central Nervous System outwards to effectors (muscles or glands).",
      },
      {
        label: "Reflex Action vs Voluntary Action",
        a: "Reflex Action: Rapid, involuntary, mediated primarily by spinal cord without conscious deliberation (e.g., knee jerk, blinking).",
        b: "Voluntary Action: Controlled consciously by the cerebral cortex of the brain (e.g., writing notes, speaking, kicking a soccer ball).",
      },
    ],
    examples: [
      "Touching a hot stove: Heat thermoreceptors trigger sensory neuron → spinal relay neuron immediately signals arm bicep effector to flex and pull away.",
      "Pupillary light reflex: Pupil constricts under intense light to protect the retina from photoreceptor damage.",
    ],
    commonMistakes: [
      "Saying reflex actions do not involve the brain at all — The brain IS informed via ascending spinal tracts, but the motor response is executed beforehand by the spinal cord.",
      "Thinking electrical impulses jump across the synapse — The impulse CANNOT jump electrically; it converts into chemical neurotransmitter molecules that diffuse across the cleft.",
      "Reversing the sequence of the reflex arc — Memorize: Receptor → Sensory → Relay (Spinal Cord) → Motor → Effector.",
    ],
    examKeywords: [
      "Neuron dendrite & axon",
      "Synaptic cleft neurotransmitter",
      "Unidirectional impulse transmission",
      "Reflex arc pathway",
      "Spinal cord relay neuron",
      "Effector muscle",
    ],
    quickRevision: [
      "✅ Sketch and label a Neuron: Dendrite, Cyton, Nucleus, Axon, Myelin sheath, Nerve ending.",
      "✅ Write the 5 components of the reflex arc in precise chronological order.",
      "✅ Remember why synaptic transmission is one-way: Chemical neurotransmitters are stored only in axonal vesicle terminals, and receptors exist only on dendrites.",
    ],
  },
  "science:ch-bio4:crosses": {
    topic: "Mendel's Laws & Genetic Crosses",
    chapter: "Heredity",
    subject: "Science (Biology)",
    definition: "Genetics is the study of heredity and variations. Gregor Johann Mendel discovered the fundamental laws of genetic inheritance through statistical breeding experiments with garden pea plants (Pisum sativum).",
    keyPoints: [
      "Mendel selected pea plants due to distinct contrasting traits, short annual life cycle, bisexual flowers, and ease of controlled self/cross pollination.",
      "Monohybrid Cross (One pair of traits — Tall TT × Dwarf tt): All F1 progeny are heterozygous Tall (Tt). Selfing F1 (Tt × Tt) produces F2 generation with Phenotypic ratio 3 Tall : 1 Dwarf (3:1) and Genotypic ratio 1 TT : 2 Tt : 1 tt (1:2:1).",
      "Law of Dominance: In a heterozygote (Tt), the dominant allele (T) masks the phenotypic expression of the recessive allele (t).",
      "Law of Segregation (Purity of Gametes): Allele pairs separate during gamete formation so that each gamete carries only one allele for each gene.",
      "Dihybrid Cross (Two pairs of traits — Round Yellow RRYY × Wrinkled Green rryy): F1 are all Round Yellow (RrYy). F2 phenotypic ratio is 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green (9:3:3:1).",
      "Law of Independent Assortment: When two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair.",
    ],
    differences: [
      {
        label: "Phenotype vs Genotype",
        a: "Phenotype: Physical observable morphological characteristics of an organism (e.g., Tall vs Dwarf, Round vs Wrinkled seeds).",
        b: "Genotype: Internal genetic makeup or allelic composition of an organism (e.g., TT, Tt, or tt).",
      },
      {
        label: "Dominant vs Recessive Trait",
        a: "Dominant: Trait that expresses itself phenotypically in both homozygous (TT) and heterozygous (Tt) conditions.",
        b: "Recessive: Trait that expresses itself only in homozygous condition (tt); suppressed in presence of dominant allele.",
      },
    ],
    examples: [
      "Punnett Square calculation: Visual grid used by geneticists to predict the mathematical probabilities of offspring genotypes and phenotypes.",
      "Test Cross: Crossing an individual with dominant phenotype (T?) with a homozygous recessive (tt) to determine its unknown genotype.",
    ],
    commonMistakes: [
      "Confusing Phenotypic ratio (3:1) with Genotypic ratio (1:2:1) in a monohybrid cross.",
      "Writing dihybrid cross ratio incorrectly — Memorize: 9 : 3 : 3 : 1 (Total 16 squares in Punnett square).",
      "Thinking recessive genes disappear in F1 — Recessive genes are merely masked and reappear intact in 25% of the F2 generation.",
    ],
    examKeywords: [
      "Garden pea (Pisum sativum)",
      "Monohybrid cross (3:1 / 1:2:1)",
      "Dihybrid cross (9:3:3:1)",
      "Law of Dominance & Segregation",
      "Law of Independent Assortment",
      "Homozygous vs Heterozygous",
    ],
    quickRevision: [
      "✅ Practice drawing the 4-box monohybrid Punnett square and 16-box dihybrid Punnett square.",
      "✅ Understand that traits may be inherited together in parent plants but segregate independently in offspring.",
      "✅ Be able to explain why F1 generation plants are tall even though they inherit the short (t) gene.",
    ],
  },
  "science:ch-bio4:sex-determination": {
    topic: "Sex Determination in Humans",
    chapter: "Heredity",
    subject: "Science (Biology)",
    definition: "Sex determination is the genetic mechanism by which the biological sex of an individual is established at the time of zygote fertilization through specific combinations of sex chromosomes.",
    keyPoints: [
      "Human somatic cells possess 46 chromosomes organized into 23 pairs.",
      "22 pairs are Autosomes (identical in males and females), governing general somatic and metabolic traits.",
      "1 pair (23rd pair) are Allosomes / Sex Chromosomes: Females possess two identical homomorphic X chromosomes (XX); males possess one standard X and one shorter heteromorphic Y chromosome (XY).",
      "Mother produces only one type of gamete (homogametic): All eggs carry 22 autosomes + 1 X chromosome.",
      "Father produces two distinct types of gametes in equal 50:50 proportions (heterogametic): 50% sperm carry 22 + X, and 50% sperm carry 22 + Y.",
      "If an X-bearing sperm fertilises the egg (X + X), the resulting zygote is female (XX). If a Y-bearing sperm fertilises the egg (Y + X), the resulting zygote is male (XY).",
      "Statistical outcome: There is always a strictly equal 50% (1:1) biological probability of conceiving a male or female child at every pregnancy.",
    ],
    differences: [
      {
        label: "Autosomes vs Sex Chromosomes",
        a: "Autosomes: 22 pairs in humans; govern somatic morphological traits; do not determine biological sex.",
        b: "Sex Chromosomes (Allosomes): 1 pair (23rd pair); XX in females and XY in males; directly determine the biological sex of the offspring.",
      },
      {
        label: "Female Gamete vs Male Gamete",
        a: "Female Gamete (Ovum): Homogametic — every normal mature ovum contains strictly 22 + X chromosomes.",
        b: "Male Gamete (Sperm): Heterogametic — 50% contain 22 + X chromosomes, and 50% contain 22 + Y chromosomes.",
      },
    ],
    examples: [
      "Environmental sex determination in reptiles: In certain lizards and turtles, the incubation temperature of fertilized eggs determines sex, unlike genetic sex determination in humans.",
      "Social CBSE High-Yield Question: Proving scientifically that holding women responsible for having girl children is baseless and contrary to biological facts.",
    ],
    commonMistakes: [
      "Thinking the mother's egg decides the sex of the baby — The mother can only donate an X chromosome; the father's sperm alone determines whether the baby will be XX or XY.",
      "Saying humans have 23 chromosomes — Humans have 23 PAIRS (46 total chromosomes).",
      "Assuming the chances of having a boy or girl shift if a family already has daughters — Each fertilization is an independent event with a persistent 50% probability.",
    ],
    examKeywords: [
      "23 pairs of chromosomes",
      "Autosomes (22 pairs)",
      "Sex chromosomes (XX vs XY)",
      "Homogametic female & Heterogametic male",
      "50:50 biological probability",
      "Genetic cross representation",
    ],
    quickRevision: [
      "✅ Draw the standard CBSE genetic cross flowchart: Female (XX) × Male (XY) → Gametes (X) and (X, Y) → Offspring (XX, XY).",
      "✅ Reiterate clearly in answer writing: Biological sex is determined at the instant of fertilisation.",
      "✅ Know that Y chromosome carries the male-determining SRY gene trigger.",
    ],
  },
};

/**
 * Handcrafted high-yield flashcard decks for core CBSE topics.
 */
const SPECIFIC_FLASHCARDS: Record<string, Flashcard[]> = {
  ...BSEB_FLASHCARDS,
  ...GRAMMAR_FLASHCARDS,
  "science:ch-bio1:nutrition": [
    {
      front: "What is the complete balanced equation of photosynthesis?",
      back: "6CO₂ + 12H₂O + Sunlight + Chlorophyll → C₆H₁₂O₆ + 6O₂ + 6H₂O",
    },
    {
      front: "What are the 3 essential events occurring during photosynthesis?",
      back: "1. Absorption of light energy by chlorophyll\n2. Conversion of light to chemical energy & photolysis of water\n3. Reduction of CO₂ to carbohydrates (glucose)",
    },
    {
      front: "What is the function of Salivary Amylase in the human digestive system?",
      back: "Salivary amylase (ptyalin) in saliva breaks down complex insoluble starch into simpler maltose sugar in the mouth at pH ~6.8.",
    },
    {
      front: "Why does the stomach secrete hydrochloric acid (HCl)?",
      back: "1. Creates an acidic pH (~1.5-2.0) required to activate inactive pepsinogen into active pepsin\n2. Destroys ingested bacteria and microbes",
    },
    {
      front: "Does bile contain any digestive enzymes? What is its role?",
      back: "NO enzymes! Bile contains bile salts that emulsify large fat globules into tiny droplets (increasing surface area for lipase) and sodium bicarbonate to make the acidic chyme alkaline.",
    },
    {
      front: "How do villi in the small intestine enhance nutrient absorption?",
      back: "Villi provide an enormous surface area, contain extremely thin single-layered epithelium, and are heavily supplied with blood capillaries and lymphatic lacteals.",
    },
  ],
  "science:ch-bio1:respiration": [
    {
      front: "What is the universal first step of glucose breakdown and where does it occur?",
      back: "Glycolysis: 1 molecule of 6-carbon Glucose is broken down into two 3-carbon Pyruvate molecules. It occurs in the CYTOPLASM and does not require oxygen.",
    },
    {
      front: "What are the end products of anaerobic respiration in yeast vs human muscle cells?",
      back: "Yeast (Fermentation): Ethanol (2C) + CO₂ + 2 ATP\nMuscle Cells (Strenuous exercise): Lactic Acid (3C) + 2 ATP",
    },
    {
      front: "Why do muscle cramps occur after vigorous sprinting?",
      back: "Due to lack of oxygen in muscle cells, pyruvate undergoes anaerobic breakdown into lactic acid. The accumulation of lactic acid crystals causes painful cramps.",
    },
    {
      front: "Where does aerobic respiration take place and how much energy is released?",
      back: "In the MITOCHONDRIA. Pyruvate is completely broken down in the presence of oxygen into 6CO₂ + 6H₂O, releasing 36-38 ATP molecules.",
    },
    {
      front: "Why is the rate of breathing much faster in aquatic animals than in terrestrial animals?",
      back: "Because the amount of dissolved oxygen present in water is fairly low compared to the concentration of oxygen in atmospheric air.",
    },
    {
      front: "What prevents the human trachea from collapsing when there is less air in it?",
      back: "C-shaped rings of cartilage support the tracheal walls and keep the respiratory passage permanently open.",
    },
  ],
  "science:ch-bio1:transportation": [
    {
      front: "What is meant by 'Double Circulation' in human beings?",
      back: "Blood flows through the heart TWICE during each complete circuit of the body: once through the Pulmonary circuit (Heart → Lungs → Heart) and once through the Systemic circuit (Heart → Body tissues → Heart).",
    },
    {
      front: "Why do ventricles have thicker muscular walls than atria?",
      back: "Because atria only pump blood into adjacent ventricles, whereas ventricles have to pump blood with high force to distant organs (lungs and whole body).",
    },
    {
      front: "Which blood vessel carries oxygenated blood from lungs to heart?",
      back: "The Pulmonary Vein (the only vein in the human body carrying oxygen-rich blood).",
    },
    {
      front: "State two major structural differences between arteries and veins.",
      back: "1. Arteries have thick elastic walls and no valves (high pressure blood away from heart).\n2. Veins have thinner walls and internal valves to prevent backward flow of low-pressure blood.",
    },
    {
      front: "What is the driving force for water movement in xylem during the day?",
      back: "Transpiration Pull: Evaporation of water molecules from stomata of leaves creates a continuous suction tension pulling water columns from roots up to leaves.",
    },
    {
      front: "How does translocation in phloem differ from transport in xylem?",
      back: "Xylem transport is unidirectional (upwards) and driven by physical forces without direct ATP use. Phloem translocation of sucrose is bidirectional and requires active cellular energy (ATP).",
    },
  ],
  "science:ch-bio1:excretion": [
    {
      front: "What is the basic structural and functional filtration unit of the kidney?",
      back: "The Nephron.",
    },
    {
      front: "What happens during Glomerular Ultrafiltration in Bowman's capsule?",
      back: "High hydrostatic pressure in glomerulus capillaries forces water, glucose, amino acids, urea, and salts across into Bowman's capsule as initial filtrate. Blood cells and large proteins stay back in blood.",
    },
    {
      front: "Why is daily urine volume (~1.5L) much less than initial nephron filtrate (~180L)?",
      back: "Because nearly 99% of the initial filtrate (water, all glucose, amino acids, essential salts) is selectively reabsorbed by tubular capillaries along Henle's loop.",
    },
    {
      front: "What two factors determine the amount of water reabsorbed by nephron tubules?",
      back: "1. The amount of excess water present in the body\n2. The amount of dissolved nitrogenous waste needing excretion",
    },
    {
      front: "How does an artificial kidney (hemodialysis) work?",
      back: "Patient's blood passes through cellophane tubes immersed in dialyzing fluid having the same osmotic pressure as blood but zero nitrogenous waste. Urea diffuses out. (Note: No reabsorption occurs).",
    },
  ],
  "science:ch-bio2:nervous-system": [
    {
      front: "Trace the exact pathway of a Reflex Arc.",
      back: "Stimulus → Receptor (Sense organ) → Sensory Neuron → Relay Neuron (Spinal Cord) → Motor Neuron → Effector (Muscle/Gland) → Response",
    },
    {
      front: "How does information travel across a Synapse between two neurons?",
      back: "Electrical impulses reaching the axon ending cause the release of chemical neurotransmitters (acetylcholine). These diffuse across the microscopic synaptic cleft and trigger a new electrical impulse at the next neuron's dendrite.",
    },
    {
      front: "Why is synaptic transmission strictly unidirectional?",
      back: "Because neurotransmitter chemicals are present and released only from axon terminals, and chemical receptor proteins are located only on the dendrite membranes.",
    },
    {
      front: "Why does the spinal cord mediate reflex actions rather than waiting for the brain?",
      back: "To save critical time and prevent severe bodily damage. The reflex arc short-circuits the long pathway to the brain so action is taken in fractions of a second.",
    },
  ],
  "science:ch-bio4:crosses": [
    {
      front: "What are the Phenotypic and Genotypic ratios of a Mendel Monohybrid cross in F2?",
      back: "Phenotypic Ratio = 3 Tall : 1 Dwarf (3:1)\nGenotypic Ratio = 1 TT : 2 Tt : 1 tt (1:2:1)",
    },
    {
      front: "What is Mendel's Law of Segregation?",
      back: "Alleles of a gene separate during gamete formation so that each gamete carries only one allele for each trait. When gametes fuse at fertilisation, the double state is restored.",
    },
    {
      front: "What is the F2 phenotypic ratio of a dihybrid cross (Round Yellow × Wrinkled Green)?",
      back: "9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green (9:3:3:1)",
    },
    {
      front: "Why did all F1 plants appear tall when Mendel crossed pure tall (TT) and pure dwarf (tt)?",
      back: "Because the allele for tallness (T) is dominant over the allele for shortness (t). In heterozygous (Tt) condition, only the dominant trait expresses itself.",
    },
  ],
  "science:ch-bio4:sex-determination": [
    {
      front: "How many pairs of chromosomes do human cells contain?",
      back: "23 pairs (46 chromosomes total): 22 pairs of Autosomes and 1 pair of Sex Chromosomes (Allosomes).",
    },
    {
      front: "What are the sex chromosome combinations in human females and males?",
      back: "Human Female: XX (homomorphic / homogametic)\nHuman Male: XY (heteromorphic / heterogametic)",
    },
    {
      front: "Who determines the biological sex of the child in humans: Mother or Father?",
      back: "The FATHER. Mother provides only X chromosomes. The father produces 50% X-sperm and 50% Y-sperm. If an X-sperm fertilises the egg → Girl (XX); if a Y-sperm fertilises → Boy (XY).",
    },
    {
      front: "What is the statistical probability of having a male or female child in any human birth?",
      back: "Exactly 50% (1:1 ratio) because equal numbers of X and Y bearing sperm are produced by the male.",
    },
  ],
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
  const focus = found?.topic.focus ?? "Core concepts, themes, and board exam principles";
  const chapterTitle = found?.chapter.name ?? "Chapter Overview";
  const branch = found?.chapter.branch ?? found?.subject.name ?? "Class 10";
  const isBseb = subjectId === "bseb-english";

  if (isBseb) {
    return {
      root: title,
      nodes: [
        {
          label: "Theme & Context",
          detail: `Panorama Part 2: ${chapterTitle}`,
          children: [
            { label: focus },
            { label: `Genre & Branch: ${branch} · Class 10 Bihar Board` },
            { label: "Author/Poet intent, social message, and historical background" },
          ],
        },
        {
          label: "Key Characters & Plot Progression",
          detail: "Core narrative developments and character interactions",
          children: [
            { label: "Protagonist actions, conflicts, and pivotal decisions" },
            { label: "Crucial quotes, dialogues, and literary devices" },
            { label: "Climax, resolution, and moral takeaway" },
          ],
        },
        {
          label: "Bihar Board Exam High-Yield Points",
          detail: "50% Objective MCQs and Subjective answer tips",
          children: [
            { label: "Objective facts: Author/poet names, nationalities, dates, and locations" },
            { label: "Short answer (2-mark): Explanation of character motivations and quotes" },
            { label: "Long answer (5-mark): Comprehensive summary, theme, or character sketch" },
          ],
        },
        {
          label: "Quick Memory Recall",
          detail: "Last-minute board revision pointers",
          children: [
            { label: `Core message: ${focus}` },
            { label: "Accurate spelling of characters and authors to avoid deduction" },
            { label: "BSEB top tip: Support answers with direct textual references" },
          ],
        },
      ],
    };
  }

  if (subjectId === "english-grammar") {
    return {
      root: title,
      nodes: [
        {
          label: "Core Rules & Syntax",
          detail: `Grammar rules for ${title} (${chapterTitle})`,
          children: [
            { label: focus },
            { label: "Standard sentence structures and formula patterns" },
            { label: "Auxiliary verbs and inflection rules" },
          ],
        },
        {
          label: "Transformations & Contextual Usage",
          detail: "Application in sentence conversions",
          children: [
            { label: "Step-by-step conversion steps (affirmative, negative, interrogative)" },
            { label: "Key conjunctions, markers, and syntactic clues" },
            { label: "Model illustrative examples" },
          ],
        },
        {
          label: "Board Exam High-Yield Traps",
          detail: "Frequent mistakes tested in Class 10 Editing & Gap-filling",
          children: [
            { label: "Subject-verb disagreement and wrong auxiliary usage" },
            { label: "Exceptions to standard grammatical rules" },
            { label: "Commonly confused pairs and irregular forms" },
          ],
        },
        {
          label: "Quick Revision Formula",
          detail: "Rapid-fire exam recall",
          children: [
            { label: `Core rule: ${focus}` },
            { label: "Always check the subject's number and sentence tense first" },
            { label: "Apply elimination strategy in 4-option board MCQs" },
          ],
        },
      ],
    };
  }

  if (subjectId === "hindi-grammar") {
    return {
      root: title,
      nodes: [
        {
          label: "परिभाषा एवं मुख्य नियम",
          detail: `${chapterTitle}: ${title} का व्याकरणिक स्वरूप`,
          children: [
            { label: focus },
            { label: "मानक हिंदी व्याकरण नियम एवं पहचान चिह्न" },
            { label: "पदों का पारस्परिक संबंध एवं संरचना" },
          ],
        },
        {
          label: "भेद व रूपांतरण प्रक्रिया",
          detail: "उदाहरण एवं रूपांतरण विधि",
          children: [
            { label: "विभिन्न भेदों की तुलनात्मक पहचान" },
            { label: "वाक्य/पद परिवर्तन के चरणबद्ध नियम" },
            { label: "योजक शब्दों एवं कारक चिह्नों की भूमिका" },
          ],
        },
        {
          label: "बोर्ड परीक्षा के लिए महत्त्वपूर्ण बिंदु",
          detail: "CBSE एवं राज्य बोर्ड के 4-अंकीय प्रश्न",
          children: [
            { label: "सामान्य त्रुटियाँ और उनका शुद्ध रूप" },
            { label: "अपवाद और मिलते-जुलते भेदों का अंतर" },
            { label: "विगत वर्षों में बार-बार पूछे गए उदाहरण" },
          ],
        },
        {
          label: "अचूक पहचान सूत्र (स्मरण ट्रिक्स)",
          detail: "त्वरित स्मरण सूत्र",
          children: [
            { label: `मुख्य सिद्धांत: ${focus}` },
            { label: "रेखांकित अंश या योजक शब्द से भेद तुरंत पहचानें" },
            { label: "रूपांतरण करते समय वाक्य का मूल अर्थ और काल न बदलें" },
          ],
        },
      ],
    };
  }

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
 * Returns high-yield revision notes for any CBSE or BSEB topic
 */
export function getCuratedNotes(subjectId: string, chapterId: string, topicId: string): NoteDoc {
  const key = `${subjectId}:${chapterId}:${topicId}`;
  if (SPECIFIC_NOTES[key]) {
    return SPECIFIC_NOTES[key];
  }

  const found = getTopic(subjectId, chapterId, topicId);
  const topicName = found?.topic.name ?? topicId;
  const focus = found?.topic.focus ?? "Important board principles";
  const chapterName = found?.chapter.name ?? chapterId;
  const subjectName = found?.subject.name ?? subjectId;
  const isBseb = subjectId === "bseb-english";

  if (isBseb) {
    return {
      topic: topicName,
      chapter: chapterName,
      subject: "English (Bihar Board)",
      definition: `${topicName} is a high-yield study unit in ${chapterName} (Panorama Part 2) highlighting: ${focus}.`,
      keyPoints: [
        focus,
        "Master the author/poet's background, nationality, and thematic intent for BSEB board examination.",
        "Memorize exact names, dates, amounts, and character traits tested in the 50-mark objective MCQ section.",
        "Structure subjective answers (2-mark & 5-mark) clearly with an introduction, key plot evidence, and moral significance.",
        "Highlight literary devices used in the text (such as metaphor, irony, symbolism, and simile).",
      ],
      examples: [
        `Textual Illustration: How ${topicName} embodies the central conflict or moral dilemma in ${chapterName}.`,
        `Board Question Model: 'Discuss the significance of ${topicName} with close reference to ${chapterName}.' (5 Marks)`,
      ],
      commonMistakes: [
        "Misspelling character names or confusing minor characters in subjective answers.",
        "Writing vague summaries without citing specific incidents from Panorama Part 2.",
        "Ignoring the author or poet's biographical context in 1-mark objective questions.",
      ],
      examKeywords: [
        topicName,
        "Panorama Part 2",
        "Bihar Board (BSEB)",
        "Character Sketch",
        "Thematic Analysis",
        "Objective MCQs",
      ],
      quickRevision: [
        `✅ Master the central theme: ${focus}.`,
        `✅ Memorize the author/poet name and main characters of ${chapterName}.`,
        "✅ Practice writing a 100-word character sketch or summary for this chapter.",
      ],
    };
  }

  if (subjectId === "english-grammar") {
    return {
      topic: topicName,
      chapter: chapterName,
      subject: "English Grammar",
      definition: `${topicName} is an essential grammatical structure in ${chapterName} covering: ${focus}.`,
      keyPoints: [
        focus,
        "Master the structural formula and inflectional rules for accurate sentence formation.",
        "Pay special attention to subject-verb agreement and tense consistency in complex sentences.",
        "Learn the high-yield exceptions frequently targeted in Class 10 gap-filling and editing tasks.",
        "Practice identifying the grammatical function of each word in context before transforming sentences.",
      ],
      examples: [
        `Grammar Rule Example: Study the standard syntactic pattern of ${topicName.toLowerCase()} in affirmative, negative, and interrogative sentences.`,
        `Board Exam Application: How ${topicName.toLowerCase()} appears in 1-mark editing passages or dialogue completion.`,
      ],
      commonMistakes: [
        "Confusing singular and plural verb inflections.",
        "Shifting tenses inconsistently within the same sentence or paragraph.",
        "Overlooking irregular forms and exceptional cases.",
      ],
      examKeywords: [
        topicName,
        "Sentence Structure",
        "Syntax Rule",
        "Editing & Omission",
        "Board Marking Scheme",
      ],
      quickRevision: [
        `✅ Master the core rule: ${focus}.`,
        "✅ Practice 5 transformation exercises (affirmative -> negative/interrogative/passive).",
        "✅ Review common pitfalls before attempting board editing passages.",
      ],
    };
  }

  if (subjectId === "hindi-grammar") {
    return {
      topic: topicName,
      chapter: chapterName,
      subject: "Hindi Grammar (हिंदी व्याकरण)",
      definition: `${topicName}, हिंदी व्याकरण के अध्याय '${chapterName}' का एक महत्त्वपूर्ण अंग है, जिसका मुख्य नियम है: ${focus}।`,
      keyPoints: [
        focus,
        "मानक हिंदी वर्तनी और व्याकरणिक नियमों का ध्यानपूर्वक अध्ययन करें।",
        "भेदों की पहचान के लिए योजक शब्दों, कारक चिह्नों और शीर्ष पदों के नियमों का अभ्यास करें।",
        "रूपांतरण करते समय वाक्य के मूल अर्थ और काल को अपरिवर्तित रखें।",
        "बोर्ड परीक्षा में पूछे जाने वाले 4 अंकों के वस्तुनिष्ठ एवं अति-लघूत्तरात्मक प्रश्नों का अभ्यास करें।",
      ],
      examples: [
        `व्याकरणिक उदाहरण: वाक्य में ${topicName} के प्रयोग और उसकी सही पहचान का विश्लेषण।`,
        `बोर्ड मॉडल प्रश्न: '${topicName}' पर आधारित विगत वर्षों के प्रश्न और उनका सटीक उत्तर।`,
      ],
      commonMistakes: [
        "मिलते-जुलते भेदों (जैसे कर्मधारय vs बहुव्रीहि या संयुक्त vs मिश्र वाक्य) के बीच भ्रमित होना।",
        "वाक्य रूपांतरण करते समय क्रिया का काल बदल देना।",
        "वर्तनी की अशुद्धियों के कारण अंक कटना।",
      ],
      examKeywords: [
        topicName,
        "हिंदी व्याकरण",
        "वाक्य संरचना",
        "बोर्ड परीक्षा 4-अंक",
        "सटीक विग्रह/रूपांतरण",
      ],
      quickRevision: [
        `✅ मुख्य नियम याद रखें: ${focus}।`,
        "✅ 5 वाक्यों में भेद पहचान और रूपांतरण का तुरंत अभ्यास करें।",
        "✅ शुद्ध वर्तनी का विशेष ध्यान रखें।",
      ],
    };
  }

  return {
    topic: topicName,
    chapter: chapterName,
    subject: subjectName,
    definition: `${topicName} is a fundamental concept in ${chapterName} focusing on ${focus}.`,
    keyPoints: [
      focus,
      "Always adhere strictly to the NCERT textbook terminology for maximum CBSE board marks.",
      "Be prepared for both direct theoretical questions and practical/application-based numericals or case studies.",
      "Highlight key SI units, chemical states, or mathematical conditions in every final answer.",
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
      "✅ Practice drawing and labelling any associated diagrams or graphs.",
      "✅ Solve at least 3 previous years' CBSE board questions on this topic.",
    ],
  };
}

/**
 * Returns high-yield flashcards for any CBSE or BSEB topic
 */
export function getCuratedFlashcards(subjectId: string, chapterId: string, topicId: string): Flashcard[] {
  const key = `${subjectId}:${chapterId}:${topicId}`;
  if (SPECIFIC_FLASHCARDS[key]) {
    return SPECIFIC_FLASHCARDS[key];
  }

  const found = getTopic(subjectId, chapterId, topicId);
  const topicName = found?.topic.name ?? topicId;
  const focus = found?.topic.focus ?? "Core principles";
  const chapterName = found?.chapter.name ?? chapterId;
  const branch = found?.chapter.branch ?? "English";
  const isBseb = subjectId === "bseb-english";

  if (isBseb) {
    return [
      {
        front: `What is the central focus of '${topicName}' in '${chapterName}'?`,
        back: focus,
      },
      {
        front: `Which prescribed textbook and branch does '${chapterName}' belong to in the Bihar Board curriculum?`,
        back: `Prescribed Textbook: Panorama Part 2 (Class 10 Bihar Board / BSEB). Branch: ${branch}.`,
      },
      {
        front: `What key factual details are frequently tested in 1-mark objective questions for '${topicName}'?`,
        back: "Author/poet's name and nationality, setting of the story/poem, names of characters, and exact quotes.",
      },
      {
        front: `How should a 5-mark answer for '${topicName}' be formatted for the BSEB Board exam?`,
        back: "1. Introduce chapter title and author; 2. Describe central events and character actions; 3. Conclude with thematic significance and moral message.",
      },
    ];
  }

  if (subjectId === "english-grammar") {
    return [
      {
        front: `What is the core rule behind '${topicName}' in ${chapterName}?`,
        back: focus,
      },
      {
        front: `What is a common pitfall students encounter in '${topicName}' in Class 10 board exams?`,
        back: "Applying rules without verifying subject number, irregular forms, or inconsistent tense shifts.",
      },
      {
        front: `How is '${topicName}' tested in board examination question papers?`,
        back: "Through gap-filling, error correction/editing passages, dialogue completion, and sentence transformation.",
      },
    ];
  }

  if (subjectId === "hindi-grammar") {
    return [
      {
        front: `'${chapterName}' के अंतर्गत '${topicName}' का मूल नियम क्या है?`,
        back: focus,
      },
      {
        front: `'${topicName}' की पहचान का सबसे सरल सूत्र क्या है?`,
        back: "योजक शब्दों, कारक-चिह्नों और रेखांकित अंश के शीर्ष पद को ध्यान से देखकर भेद का निर्धारण करें।",
      },
      {
        front: `बोर्ड परीक्षा में '${topicName}' से संबंधित प्रश्नों में पूरे अंक कैसे प्राप्त करें?`,
        back: "सटीक परिभाषा/नियम लिखें, विग्रह अथवा रूपांतरण करते समय काल न बदलें, और वर्तनी की शुद्धता बनाए रखें।",
      },
    ];
  }

  return [
    {
      front: `What is the primary concept behind ${topicName}?`,
      back: focus,
    },
    {
      front: `Which law or governing principle applies to ${topicName}?`,
      back: "It is governed by fundamental NCERT CBSE Class 10 rules. Ensure your explanation specifies all boundary conditions and units.",
    },
    {
      front: `What is a common mistake students make in ${topicName} in board exams?`,
      back: "Forgetting state symbols, omitting SI units, or skipping intermediate formula steps in numericals.",
    },
    {
      front: `How can you easily remember the key takeaways of ${topicName}?`,
      back: "Break down the concept into Definition, Formula/Reaction, and 1 Real-Life Example.",
    },
  ];
}

/**
 * High-yield curated CBSE Board Exam quiz questions for core Class 10 topics.
 * Acts as an offline / fallback question bank if Gemini API is unavailable or rate-limited.
 */
export function getCuratedQuiz(subjectId: string, chapterId: string, topicId: string): GeneratedQuizQuestion[] {
  const found = getTopic(subjectId, chapterId, topicId);
  const topicName = found?.topic.name ?? topicId;
  const focus = found?.topic.focus ?? "NCERT Class 10 Board syllabus concepts";

  // Specific high-yield Physics Electricity
  if (topicId.includes("ohm") || topicId.includes("circuit") || chapterId.includes("phy2")) {
    return [
      {
        id: "curated-ohm-1",
        topicId,
        prompt: "Which of the following mathematical equations represents Ohm's Law correctly under constant temperature?",
        type: "mcq",
        options: ["V = I × R", "V = I / R", "I = V × R", "R = V × I"],
        answer: "A",
        explanation: "Ohm's Law states that electric current through a conductor is directly proportional to potential difference across its ends: V = IR.",
        difficulty: "Easy",
      },
      {
        id: "curated-ohm-2",
        topicId,
        prompt: "If a 12 V battery is connected across a circuit and a current of 2.5 A flows, calculate the resistance of the circuit in ohms.",
        type: "numerical",
        answer: "4.8",
        explanation: "Using Ohm's law: R = V / I = 12 V / 2.5 A = 4.8 Ω.",
        difficulty: "Medium",
      },
      {
        id: "curated-ohm-3",
        topicId,
        prompt: "The slope of a Potential Difference (V) versus Current (I) graph for an ohmic conductor represents:",
        type: "mcq",
        options: ["Resistance (R)", "Resistivity (ρ)", "Electric Power (P)", "Electric Charge (Q)"],
        answer: "A",
        explanation: "Slope of the V-I characteristic graph is ΔV / ΔI, which gives the electrical Resistance R.",
        difficulty: "Medium",
      },
      {
        id: "curated-ohm-4",
        topicId,
        prompt: "Two resistors of 6 Ω and 3 Ω are connected in parallel. What is their effective equivalent resistance?",
        type: "mcq",
        options: ["2 Ω", "9 Ω", "18 Ω", "0.5 Ω"],
        answer: "A",
        explanation: "1/Rp = 1/R1 + 1/R2 = 1/6 + 1/3 = 3/6 = 1/2 => Rp = 2 Ω.",
        difficulty: "Board Level",
      },
      {
        id: "curated-ohm-5",
        topicId,
        prompt: "State the SI unit of electrical resistivity (ρ).",
        type: "short",
        answer: "Ohm-meter (Ω·m)",
        explanation: "Resistivity ρ = R × A / l. Units: Ω × m² / m = Ω·m.",
        difficulty: "Board Level",
      },
    ];
  }

  // Specific high-yield Physics Optics / Light
  if (topicId.includes("mirror") || topicId.includes("lens") || chapterId.includes("phy1")) {
    return [
      {
        id: "curated-optics-1",
        topicId,
        prompt: "Where must an object be placed in front of a concave mirror so that the image formed is real, inverted, and of the same size as the object?",
        type: "mcq",
        options: ["At Center of Curvature (C)", "At Focus (F)", "Between Focus and Center of Curvature", "Beyond C"],
        answer: "A",
        explanation: "When placed at C (2F), light rays reflect to intersect at C itself, forming an inverted image of magnification m = -1.",
        difficulty: "Easy",
      },
      {
        id: "curated-optics-2",
        topicId,
        prompt: "Which optical element is used as a rear-view mirror in automobiles, and what type of image does it always form?",
        type: "mcq",
        options: ["Convex mirror (always virtual, erect, and diminished)", "Concave mirror (real and inverted)", "Plane mirror (same size)", "Concave lens"],
        answer: "A",
        explanation: "Convex mirrors provide a much wider field of view and always produce an erect, diminished virtual image.",
        difficulty: "Board Level",
      },
      {
        id: "curated-optics-3",
        topicId,
        prompt: "Write the Mirror Formula relating object distance (u), image distance (v), and focal length (f).",
        type: "short",
        answer: "1/v + 1/u = 1/f",
        explanation: "The mirror formula is 1/v + 1/u = 1/f (whereas the lens formula uses a minus sign: 1/v - 1/u = 1/f).",
        difficulty: "Easy",
      },
      {
        id: "curated-optics-4",
        topicId,
        prompt: "An object is placed at 20 cm in front of a concave mirror of focal length 15 cm. Find the image distance (v) using the Cartesian sign convention.",
        type: "numerical",
        answer: "-60",
        explanation: "1/v = 1/f - 1/u = 1/(-15) - 1/(-20) = -1/15 + 1/20 = -1/60 => v = -60 cm.",
        difficulty: "Board Level",
      },
      {
        id: "curated-optics-5",
        topicId,
        prompt: "The power of a corrective lens is -2.0 Dioptres. What is its focal length in centimeters and what type of lens is it?",
        type: "short",
        answer: "-50 cm, Concave (diverging) lens",
        explanation: "P = 1/f(m) => f = 1 / (-2.0) = -0.5 m = -50 cm. Negative focal length indicates a concave lens.",
        difficulty: "Board Level",
      },
    ];
  }

  if (subjectId === "bseb-english") {
    const chapterTitle = found?.chapter.name ?? "Panorama Part 2";
    return [
      {
        id: `curated-bseb-${topicId}-1`,
        topicId,
        prompt: `Which of the following statements best captures the central idea of '${topicName}' in '${chapterTitle}'?`,
        type: "mcq",
        options: [
          `${focus}`,
          `It is solely an abstract mathematical theory with no literary or moral relevance.`,
          `It contradicts the core themes established in the Panorama Part 2 textbook.`,
          `None of the above.`,
        ],
        answer: "A",
        explanation: `'${topicName}' in Panorama Part 2 explores: ${focus}.`,
        difficulty: "Easy",
      },
      {
        id: `curated-bseb-${topicId}-2`,
        topicId,
        prompt: `In Bihar Board (BSEB) Class 10 English exams, which element is essential for scoring full marks in answers on '${chapterTitle}'?`,
        type: "mcq",
        options: [
          "Accurate author/poet attribution, correct character names, and textual citations from Panorama Part 2",
          "Only informal colloquial speech without character references",
          "One-word answers without textual justification",
          "Ignoring the literary devices and moral message",
        ],
        answer: "A",
        explanation: "BSEB marking schemes reward precise textual references, accurate spelling of character names, and clear thematic analysis.",
        difficulty: "Board Level",
      },
      {
        id: `curated-bseb-${topicId}-3`,
        topicId,
        prompt: `State the central takeaway or moral message of '${topicName}' in one sentence.`,
        type: "short",
        answer: `${focus}`,
        explanation: `This represents the primary thematic core of '${topicName}'.`,
        difficulty: "Medium",
      },
      {
        id: `curated-bseb-${topicId}-4`,
        topicId,
        prompt: `'${chapterTitle}' is prescribed in which official English textbook for Class 10 Bihar Board (BSEB)?`,
        type: "mcq",
        options: [
          "Panorama Part 2",
          "First Flight",
          "Footprints Without Feet",
          "Beehive",
        ],
        answer: "A",
        explanation: "Bihar Board Class 10 English curriculum is based on the official textbook 'Panorama Part 2'.",
        difficulty: "Easy",
      },
    ];
  }

  if (subjectId === "english-grammar") {
    const chapterTitle = found?.chapter.name ?? "English Grammar";
    return [
      {
        id: `curated-eg-${topicId}-1`,
        topicId,
        prompt: `Which of the following statements correctly expresses the rule for '${topicName}' in '${chapterTitle}'?`,
        type: "mcq",
        options: [
          `${focus}`,
          `Rules of concord and tense do not apply to this construction.`,
          `It is completely arbitrary with no standard grammatical convention.`,
          `None of the above.`,
        ],
        answer: "A",
        explanation: `'${topicName}' is governed by: ${focus}.`,
        difficulty: "Easy",
      },
      {
        id: `curated-eg-${topicId}-2`,
        topicId,
        prompt: `In Class 10 Board exam editing passages, what is the most frequent error related to '${topicName}'?`,
        type: "mcq",
        options: [
          "Incorrect auxiliary verb, mismatched tense aspect, or subject-verb disagreement",
          "Excessive punctuation at the end of paragraphs",
          "Using bold fonts incorrectly",
          "None of the above",
        ],
        answer: "A",
        explanation: "Board editing questions specifically test auxiliary selection, inflectional consistency, and concord.",
        difficulty: "Board Level",
      },
      {
        id: `curated-eg-${topicId}-3`,
        topicId,
        prompt: `State the standard grammatical rule of '${topicName}' in one sentence.`,
        type: "short",
        answer: `${focus}`,
        explanation: `This is the core grammatical principle of '${topicName}'.`,
        difficulty: "Medium",
      },
      {
        id: `curated-eg-${topicId}-4`,
        topicId,
        prompt: `Why is thorough practice of '${topicName}' essential for scoring full marks in Section B (Grammar)?`,
        type: "mcq",
        options: [
          "It directly determines accuracy in 10-mark grammar gap-filling, editing, and dialogue reporting",
          "It carries negative marks in the board exam",
          "It is optional and not tested in boards",
          "It only applies to British literature",
        ],
        answer: "A",
        explanation: "Class 10 Section B tests integrated grammar requiring mastery of these fundamental rules.",
        difficulty: "Easy",
      },
    ];
  }

  if (subjectId === "hindi-grammar") {
    const chapterTitle = found?.chapter.name ?? "हिंदी व्याकरण";
    return [
      {
        id: `curated-hg-${topicId}-1`,
        topicId,
        prompt: `'${chapterTitle}' के अंतर्गत '${topicName}' का सही नियम अथवा लक्षण कौन-सा है?`,
        type: "mcq",
        options: [
          `${focus}`,
          `यह किसी भी मानक व्याकरणिक नियम का पालन नहीं करता।`,
          `यह केवल संस्कृत में प्रयुक्त होता है, आधुनिक हिंदी में नहीं।`,
          `उपर्युक्त में से कोई नहीं।`,
        ],
        answer: "A",
        explanation: `'${topicName}' का आधारभूत नियम है: ${focus}।`,
        difficulty: "Easy",
      },
      {
        id: `curated-hg-${topicId}-2`,
        topicId,
        prompt: `बोर्ड परीक्षा में '${topicName}' पर आधारित 4-अंकीय प्रश्नों में पूरे अंक प्राप्त करने के लिए क्या आवश्यक है?`,
        type: "mcq",
        options: [
          "सटीक भेद की पहचान, शुद्ध वर्तनी, और रूपांतरण करते समय अर्थ व काल को यथावत रखना",
          "वाक्य का काल अपनी इच्छानुसार बदल देना",
          "केवल एक शब्द लिखकर छोड़ देना",
          "योजक शब्दों को अनदेखा करना",
        ],
        answer: "A",
        explanation: "CBSE एवं राज्य बोर्ड की अंक योजना में सटीक पहचान और शुद्ध रूपांतरण पर ही पूर्ण अंक दिए जाते हैं।",
        difficulty: "Board Level",
      },
      {
        id: `curated-hg-${topicId}-3`,
        topicId,
        prompt: `'${topicName}' का प्रमुख नियम अथवा सूत्र संक्षेप में लिखिए।`,
        type: "short",
        answer: `${focus}`,
        explanation: `यह '${topicName}' का मुख्य व्याकरणिक सिद्धांत है।`,
        difficulty: "Medium",
      },
      {
        id: `curated-hg-${topicId}-4`,
        topicId,
        prompt: `हिंदी व्याकरण में '${topicName}' का ज्ञान किसलिए सर्वाधिक महत्त्वपूर्ण है?`,
        type: "mcq",
        options: [
          "यह वाक्य रचना की शुद्धता और बोर्ड परीक्षा के व्यावहारिक व्याकरण खंड में 16 में से 16 अंक सुनिश्चित करता है",
          "यह केवल मौखिक परीक्षा का विषय है",
          "इसका लिखित भाषा से कोई संबंध नहीं है",
          "यह पाठ्यक्रम से हटा दिया गया है",
        ],
        answer: "A",
        explanation: "कक्षा 10 हिंदी 'व्याकरण खंड' में 16 अंक निर्धारित हैं, जहाँ पूर्ण अंक प्राप्त किए जा सकते हैं।",
        difficulty: "Easy",
      },
    ];
  }

  // Universal NCERT Board Practice Fallback for all other topics
  return [
    {
      id: `curated-${topicId}-1`,
      topicId,
      prompt: `Which of the following statements best describes the core principle of ${topicName}?`,
      type: "mcq",
      options: [
        `It operates independently of standard NCERT Class 10 rules.`,
        `${focus}`,
        `It is solely an abstract concept with zero real-world physical or grammatical applications.`,
        `None of the above.`,
      ],
      answer: "B",
      explanation: `${topicName} is fundamentally defined by: ${focus}.`,
      difficulty: "Easy",
    },
    {
      id: `curated-${topicId}-2`,
      topicId,
      prompt: `In Board exam answers for ${topicName}, what must a student always explicitly mention?`,
      type: "mcq",
      options: [
        "Core definitions, governing principles/rules, and standard terminology",
        "Only rough sketches without labels or annotations",
        "Only numerical values without intermediate formula steps",
        "Only colloquial descriptions",
      ],
      answer: "A",
      explanation: "Step-wise marking guidelines strictly award marks for correct definitions, standard formula/rule steps, and proper terminology.",
      difficulty: "Board Level",
    },
    {
      id: `curated-${topicId}-3`,
      topicId,
      prompt: `State the primary definition and significance of ${topicName} in one concise sentence.`,
      type: "short",
      answer: `${focus}`,
      explanation: `Mastering this definition ensures full marks in 1-mark and 2-mark board questions.`,
      difficulty: "Medium",
    },
    {
      id: `curated-${topicId}-4`,
      topicId,
      prompt: `Why is ${topicName} a high-priority topic in the Class 10 curriculum?`,
      type: "mcq",
      options: [
        "It carries negative marks in the board exam",
        "It only contains arbitrary definitions without conceptual reasoning",
        "It forms foundational concepts frequently tested in board case-based and application questions",
        "It has been completely omitted from the modern syllabus",
      ],
      answer: "C",
      explanation: "Class 10 board exams focus on competency-based understanding and practical applications of this topic.",
      difficulty: "Easy",
    },
  ];
}
