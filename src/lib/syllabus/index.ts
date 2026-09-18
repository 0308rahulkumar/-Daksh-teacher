// CBSE Class 10 syllabus knowledge map (NCERT-based).
//
// NOTE: Boards revise syllabi from time to time (and New Delhi's board trims
// chapters during exam-session changes). This is a faithful map of the
// long-running NCERT Class 10 content. The UI shows a "verify with your board's
// official syllabus" nudge, and the AI teacher is prompted to respect the
// current session's board.
//
// Chapter ids stay stable so learning progress keyed to them survives edits.

import type { Chapter, Subject, SubjectId } from "../types";

export const SUBJECTS: Subject[] = [
  {
    id: "science",
    name: "Science",
    icon: "🔬",
    tagline: "Physics · Chemistry · Biology",
    accent: "#0d9488", // teal
    chapters: [
      {
        id: "ch-chem1",
        name: "Chemical Reactions and Equations",
        branch: "Chemistry",
        topics: [
          { id: "balancing", name: "Balancing chemical equations", focus: "Law of conservation of mass in equations" },
          { id: "types-reactions", name: "Types of chemical reactions", focus: "Combination, decomposition, displacement, double displacement" },
          { id: "oxidation", name: "Oxidation and reduction", focus: "Gain/loss of oxygen and hydrogen; redox" },
          { id: "corrosion", name: "Corrosion and rancidity", focus: "Everyday redox processes" },
        ],
      },
      {
        id: "ch-chem2",
        name: "Acids, Bases and Salts",
        branch: "Chemistry",
        topics: [
          { id: "acid-base-props", name: "Properties of acids and bases", focus: "Taste, litmus, and reactions with metals/carbonates" },
          { id: "ph-scale", name: "pH scale and its importance", focus: "pH in everyday life: soil, teeth, stomach" },
          { id: "neutralisation", name: "Neutralisation reaction", focus: "Acid + base gives salt and water" },
          { id: "salts", name: "Important salts and their uses", focus: "Baking soda, washing soda, POP, bleaching powder" },
        ],
      },
      {
        id: "ch-chem3",
        name: "Metals and Non-metals",
        branch: "Chemistry",
        topics: [
          { id: "metal-props", name: "Properties of metals and non-metals", focus: "Physical and chemical differences" },
          { id: "reactivity", name: "Reactivity series", focus: "Predicting displacement reactions" },
          { id: "ionic-bond", name: "Ionic bonding", focus: "How metals and non-metals combine" },
          { id: "extraction", name: "Extraction of metals", focus: "Concentration, reduction, refining" },
          { id: "corrosion-prevention", name: "Corrosion and its prevention", focus: "Rusting, galvanisation, alloying" },
        ],
      },
      {
        id: "ch-chem4",
        name: "Carbon and its Compounds",
        branch: "Chemistry",
        topics: [
          { id: "covalent", name: "Covalent bonding in carbon", focus: "Why carbon forms chains and rings" },
          { id: "allotropes", name: "Allotropes of carbon", focus: "Diamond, graphite, C60" },
          { id: "hydrocarbons", name: "Saturated and unsaturated hydrocarbons", focus: "Alkanes, alkenes, alkynes, homologous series" },
          { id: "functional-groups", name: "Functional groups", focus: "Alcohols, carboxylic acids and their reactions" },
          { id: "soaps", name: "Soaps and detergents", focus: "Cleansing action — micelles" },
        ],
      },
      {
        id: "ch-bio1",
        name: "Life Processes",
        branch: "Biology",
        topics: [
          { id: "nutrition", name: "Nutrition — autotrophic and heterotrophic", focus: "Photosynthesis; nutrition in humans" },
          { id: "respiration", name: "Respiration — aerobic and anaerobic", focus: "ATP production; breathing vs respiration" },
          { id: "transportation", name: "Transportation in organisms", focus: "Blood, heart, xylem and phloem" },
          { id: "excretion", name: "Excretion in plants and animals", focus: "Kidney, nephron, excretion in plants" },
        ],
      },
      {
        id: "ch-bio2",
        name: "Control and Coordination",
        branch: "Biology",
        topics: [
          { id: "nervous-system", name: "Nervous system and reflex action", focus: "Neuron, synapse, reflex arc" },
          { id: "brain", name: "Human brain", focus: "Major parts and functions" },
          { id: "hormones", name: "Hormones in animals", focus: "Endocrine glands and their effects" },
          { id: "plant-movement", name: "Plant movements and hormones", focus: "Tropisms; auxin, gibberellin, cytokinin" },
        ],
      },
      {
        id: "ch-bio3",
        name: "How do Organisms Reproduce?",
        branch: "Biology",
        topics: [
          { id: "asexual", name: "Asexual reproduction", focus: "Fission, budding, fragmentation, vegetative propagation" },
          { id: "sexual-plants", name: "Sexual reproduction in plants", focus: "Flower parts, pollination, fertilisation" },
          { id: "human-repro", name: "Human reproductive system", focus: "Male and female systems; menstruation" },
          { id: "repro-health", name: "Reproductive health", focus: "Contraception and STIs" },
        ],
      },
      {
        id: "ch-bio4",
        name: "Heredity",
        branch: "Biology",
        topics: [
          { id: "mendel", name: "Mendel's experiments", focus: "Dominant and recessive traits" },
          { id: "crosses", name: "Monohybrid and dihybrid crosses", focus: "Genotype and phenotype ratios" },
          { id: "sex-determination", name: "Sex determination in humans", focus: "XX / XY chromosomes" },
          { id: "evolution", name: "Evolution basics", focus: "Variation, natural selection, fossils" },
        ],
      },
      {
        id: "ch-phy1",
        name: "Light — Reflection and Refraction",
        branch: "Physics",
        topics: [
          { id: "mirrors", name: "Reflection and curved mirrors", focus: "Laws; image formation by concave and convex mirrors" },
          { id: "mirror-formula", name: "Mirror formula and magnification", focus: "1/v + 1/u = 1/f and its use" },
          { id: "refraction", name: "Refraction and refractive index", focus: "Snell's law; glass slab" },
          { id: "lenses", name: "Lenses — image formation", focus: "Convex and concave; ray diagrams" },
          { id: "lens-formula", name: "Lens formula and power", focus: "1/f = 1/v − 1/u; P = 1/f (in dioptres)" },
        ],
      },
      {
        id: "ch-phy2",
        name: "Human Eye and Colourful World",
        branch: "Physics",
        topics: [
          { id: "eye-structure", name: "Structure and working of the human eye", focus: "Pupil, lens, retina; accommodation" },
          { id: "eye-defects", name: "Defects of vision and correction", focus: "Myopia, hypermetropia, presbyopia; lenses used" },
          { id: "dispersion", name: "Dispersion and scattering of light", focus: "Prism rainbow; why the sky is blue" },
          { id: "atmospheric", name: "Atmospheric refraction", focus: "Twinkling, advanced sunrise, apparent position" },
        ],
      },
      {
        id: "ch-phy3",
        name: "Electricity",
        branch: "Physics",
        topics: [
          { id: "circuits", name: "Electric current and circuits", focus: "Charge, current, potential difference" },
          { id: "ohms-law", name: "Ohm's law and resistance", focus: "V = IR; resistivity; factors affecting resistance" },
          { id: "series-parallel", name: "Series and parallel circuits", focus: "Equivalent resistance; daily-life wiring" },
          { id: "heating", name: "Heating effect of electric current", focus: "Joule's law of heating" },
          { id: "power", name: "Electric power and energy", focus: "P = VI; kWh and electricity bill" },
        ],
      },
      {
        id: "ch-phy4",
        name: "Magnetic Effects of Electric Current",
        branch: "Physics",
        topics: [
          { id: "magnetic-field", name: "Magnetic field around a conductor", focus: "Field lines; right-hand thumb rule" },
          { id: "motor", name: "Force on a conductor; electric motor", focus: "Fleming's left-hand rule" },
          { id: "induction", name: "Electromagnetic induction", focus: "Faraday's experiment; generator" },
          { id: "domestic", name: "Domestic electric circuits", focus: "Live/neutral/earth, fuse, earthing, short circuit" },
        ],
      },
      {
        id: "ch-bio5",
        name: "Our Environment",
        branch: "Biology",
        topics: [
          { id: "ecosystem", name: "Ecosystem and its components", focus: "Biotic and abiotic; food chains and webs" },
          { id: "waste", name: "Waste management", focus: "Biodegradable vs non-biodegradable" },
          { id: "ozone", name: "Ozone layer depletion", focus: "CFCs and the ozone hole" },
        ],
      },
    ],
  },
  {
    id: "maths",
    name: "Mathematics",
    icon: "📐",
    tagline: "Numbers to probability",
    accent: "#4f46e5", // indigo
    chapters: [
      {
        id: "ch-real",
        name: "Real Numbers",
        topics: [
          { id: "euclid", name: "Euclid's division lemma and algorithm", focus: "gcd via repeated division" },
          { id: "fundamental", name: "Fundamental Theorem of Arithmetic", focus: "Prime factorisation; HCF × LCM" },
          { id: "irrationals", name: "Proving irrationality", focus: "√2, √3 method of contradiction" },
        ],
      },
      {
        id: "ch-polynomials",
        name: "Polynomials",
        topics: [
          { id: "zeroes", name: "Zeroes of a polynomial", focus: "Relationship between zeroes and coefficients" },
          { id: "division", name: "Division algorithm", focus: "p(x) = g(x)·q(x) + r(x)" },
        ],
      },
      {
        id: "ch-pair-linear",
        name: "Pair of Linear Equations in Two Variables",
        topics: [
          { id: "methods", name: "Substitution, elimination, cross-multiplication", focus: "Solving pairs of equations" },
          { id: "graphical", name: "Graphical representation", focus: "Consistent / inconsistent / dependent" },
          { id: "word-problems", name: "Word problems", focus: "Setting up equations from situations" },
        ],
      },
      {
        id: "ch-quadratic",
        name: "Quadratic Equations",
        topics: [
          { id: "factorisation", name: "Solving by factorisation", focus: "Splitting the middle term" },
          { id: "formula", name: "Quadratic formula and discriminant", focus: "x = (−b ± √(b²−4ac))/2a; nature of roots" },
          { id: "apps", name: "Applications of quadratic equations", focus: "Area / time / distance problems" },
        ],
      },
      {
        id: "ch-ap",
        name: "Arithmetic Progressions",
        topics: [
          { id: "nth-term", name: "nth term of an AP", focus: "a + (n−1)d" },
          { id: "sum", name: "Sum of first n terms", focus: "Sₙ = n/2 [2a + (n−1)d] and applications" },
        ],
      },
      {
        id: "ch-triangles",
        name: "Triangles",
        topics: [
          { id: "similarity", name: "Criteria for similarity", focus: "AA, SAS, SSS" },
          { id: "bpt", name: "Basic Proportionality Theorem", focus: "Thales' theorem and its converse" },
          { id: "pythagoras", name: "Pythagoras theorem", focus: "Proof and applications" },
        ],
      },
      {
        id: "ch-coord",
        name: "Coordinate Geometry",
        topics: [
          { id: "distance", name: "Distance formula", focus: "√((x₂−x₁)² + (y₂−y₁)²)" },
          { id: "section", name: "Section formula and midpoint", focus: "Finding points dividing a segment" },
          { id: "area", name: "Area of a triangle from coordinates", focus: "Determinant formula" },
        ],
      },
      {
        id: "ch-trig",
        name: "Introduction to Trigonometry",
        topics: [
          { id: "ratios", name: "Trigonometric ratios", focus: "sin, cos, tan, cosec, sec, cot" },
          { id: "identities", name: "Trigonometric identities", focus: "sin²θ + cos²θ = 1 and related" },
          { id: "standard-angles", name: "Values for standard angles", focus: "0°, 30°, 45°, 60°, 90°" },
        ],
      },
      {
        id: "ch-trig-apps",
        name: "Some Applications of Trigonometry",
        topics: [
          { id: "elevation", name: "Angle of elevation and depression", focus: "Setting right triangles from word problems" },
        ],
      },
      {
        id: "ch-circles",
        name: "Circles",
        topics: [
          { id: "tangents", name: "Tangents to a circle", focus: "Tangent ⊥ radius; lengths from an external point" },
        ],
      },
      {
        id: "ch-areas-circles",
        name: "Areas Related to Circles",
        topics: [
          { id: "sector-segment", name: "Sector and segment", focus: "Area of sector Θ/360 × πr²; segment area" },
        ],
      },
      {
        id: "ch-surface-vol",
        name: "Surface Areas and Volumes",
        topics: [
          { id: "solids", name: "Combination of solids", focus: "Cuboid, cylinder, cone, sphere, hemisphere" },
          { id: "conversion", name: "Conversion and frustum", focus: "Melting/recasting; frustum of a cone" },
        ],
      },
      {
        id: "ch-statistics",
        name: "Statistics",
        topics: [
          { id: "mean", name: "Mean of grouped data", focus: "Direct, assumed-mean, step-deviation" },
          { id: "median-mode", name: "Median and mode", focus: "Formulae; graphical (ogive) determination" },
        ],
      },
      {
        id: "ch-probability",
        name: "Probability",
        topics: [
          { id: "classical", name: "Classical probability", focus: "favourable outcomes / total outcomes" },
          { id: "experiments", name: "Dice, coins, cards problems", focus: "Sample spaces and counting" },
        ],
      },
    ],
  },
  {
    id: "social-science",
    name: "Social Science",
    icon: "🌏",
    tagline: "History · Geography · Civics · Economics",
    accent: "#b45309", // amber-brown
    chapters: [
      {
        id: "ch-nationalism-europe",
        name: "The Rise of Nationalism in Europe",
        branch: "History",
        topics: [
          { id: "french-impact", name: "Nationalism before and after the French Revolution", focus: "Ideas of the nation-state" },
          { id: "germany-italy", name: "Unification of Germany and Italy", focus: "Bismarck and Cavour" },
          { id: "visualising", name: "Visualising the nation", focus: "Allegory and symbols" },
        ],
      },
      {
        id: "ch-nationalism-india",
        name: "Nationalism in India",
        branch: "History",
        topics: [
          { id: "non-cooperation", name: "Non-Cooperation and Civil Disobedience", focus: "Gandhian methods of protest" },
          { id: "salt-march", name: "The Salt March", focus: "Dandi March, 1930" },
          { id: "dalit-movts", name: "Limits and participation", focus: "Dalit and peasant involvement" },
        ],
      },
      {
        id: "ch-global-world",
        name: "The Making of a Global World",
        branch: "History",
        topics: [
          { id: "premodern", name: "Pre-modern world and silk routes", focus: "Early global connections" },
          { id: "great-depression", name: "Nineteenth century and the Great Depression", focus: "Trade, migration, crisis" },
        ],
      },
      {
        id: "ch-industrialisation",
        name: "The Age of Industrialisation",
        branch: "History",
        topics: [
          { id: "factory", name: "Before and onset of factories", focus: "Handicrafts vs machine industry" },
          { id: "indian-industry", name: "Industrialisation in the colonies", focus: "Indian textiles in the world market" },
        ],
      },
      {
        id: "ch-print-culture",
        name: "Print Culture and the Modern World",
        branch: "History",
        topics: [
          { id: "print-genesis", name: "The first printed books", focus: "China, Japan, Europe (Gutenberg)" },
          { id: "print-india", name: "Print and the growth of a reading public in India", focus: "Press and reform" },
        ],
      },
      {
        id: "ch-resources",
        name: "Resources and Development",
        branch: "Geography",
        topics: [
          { id: "resource-types", name: "Types of resources", focus: "Renewable / non-renewable; ownership" },
          { id: "soil", name: "Soil as a resource", focus: "Soil types and erosion; conservation" },
          { id: "land-use", name: "Land use and land degradation", focus: "Patterns and remedies" },
        ],
      },
      {
        id: "ch-forests",
        name: "Forest and Wildlife Resources",
        branch: "Geography",
        topics: [
          { id: "biodiversity", name: "Biodiversity in India", focus: "Threatened species and conservation" },
        ],
      },
      {
        id: "ch-water",
        name: "Water Resources",
        branch: "Geography",
        topics: [
          { id: "water-scarce", name: "Water scarcity and conservation", focus: "Rainwater harvesting" },
          { id: "dams", name: "Multipurpose river projects", focus: "Benefits and drawbacks; Narmada examples" },
        ],
      },
      {
        id: "ch-agriculture",
        name: "Agriculture",
        branch: "Geography",
        topics: [
          { id: "crops", name: "Major food and cash crops", focus: "Rice, wheat, sugarcane, jute, cotton" },
          { id: "reform", name: "Agricultural reforms", focus: "Institutional and technological changes" },
        ],
      },
      {
        id: "ch-minerals",
        name: "Minerals and Energy Resources",
        branch: "Geography",
        topics: [
          { id: "minerals", name: "Minerals and mining", focus: "Ferrous, non-ferrous; distribution" },
          { id: "energy", name: "Conventional and non-conventional energy", focus: "Coal, petroleum vs solar, wind, biogas" },
        ],
      },
      {
        id: "ch-manufacturing",
        name: "Manufacturing Industries",
        branch: "Geography",
        topics: [
          { id: "location", name: "Factors for industrial location", focus: "Agro, mineral, textile and IT industries" },
        ],
      },
      {
        id: "ch-lifelines",
        name: "Lifelines of National Economy",
        branch: "Geography",
        topics: [
          { id: "transport", name: "Transport — land, water, air", focus: "Road vs rail; trade routes" },
          { id: "trade", name: "International trade", focus: "Imports and exports of India" },
        ],
      },
      {
        id: "ch-power-sharing",
        name: "Power-sharing",
        branch: "Civics",
        topics: [
          { id: "belgium-sri", name: "Belgium and Sri Lanka", focus: "Majoritarianism and accommodation" },
          { id: "forms", name: "Forms of power-sharing", focus: "Horizontal, vertical, community, federated" },
        ],
      },
      {
        id: "ch-federalism",
        name: "Federalism",
        branch: "Civics",
        topics: [
          { id: "federal-union", name: "What makes India a federation", focus: "Union, state, concurrent lists" },
          { id: "decentralisation", name: "Decentralisation and Panchayati Raj", focus: "Local self-government" },
        ],
      },
      {
        id: "ch-gender-caste",
        name: "Gender, Religion and Caste",
        branch: "Civics",
        topics: [
          { id: "gender", name: "Gender and politics", focus: "Women's political representation" },
          { id: "caste", name: "Caste and politics", focus: "Caste in election and reservation" },
        ],
      },
      {
        id: "ch-parties",
        name: "Political Parties",
        branch: "Civics",
        topics: [
          { id: "party-system", name: "Parties and party system in India", focus: "National and state parties; coalitions" },
          { id: "reforms", name: "Challenges and reforms", focus: "Money and muscle power; internal democracy" },
        ],
      },
      {
        id: "ch-democracy-outcomes",
        name: "Outcomes of Democracy",
        branch: "Civics",
        topics: [
          { id: "accountability", name: "Accountable and responsive government", focus: "How democracy fares on outcomes" },
          { id: "inequality", name: "Economic growth and inequality", focus: "Evidence-based comparison" },
        ],
      },
      {
        id: "ch-development",
        name: "Development",
        branch: "Economics",
        topics: [
          { id: "development-ideas", name: "What development means", focus: "Goals and conflicting notions" },
          { id: "indicators", name: "Income and other criteria", focus: "GDP, HDI, literacy" },
          { id: "sustainability", name: "Sustainability of development", focus: "Non-renewable resources and future" },
        ],
      },
      {
        id: "ch-sectors",
        name: "Sectors of the Indian Economy",
        branch: "Economics",
        topics: [
          { id: "three-sectors", name: "Primary, secondary and tertiary sectors", focus: "GDP and employment shares" },
          { id: "unorganised", name: "Organised vs unorganised sectors", focus: "Employment terms and protection" },
        ],
      },
      {
        id: "ch-money",
        name: "Money and Credit",
        branch: "Economics",
        topics: [
          { id: "money-forms", name: "Money and modern forms", focus: "Barter to currency; digital money" },
          { id: "credit", name: "Credit and the role of banks", focus: "Terms of credit; formal vs informal lenders" },
        ],
      },
      {
        id: "ch-globalisation",
        name: "Globalisation and the Indian Economy",
        branch: "Economics",
        topics: [
          { id: "multinationals", name: "Production across countries", focus: "MNCs and global chains" },
          { id: "trade-barriers", name: "Trade barriers and liberalisation", focus: "WTO and its impact" },
        ],
      },
      {
        id: "ch-consumer-rights",
        name: "Consumer Rights",
        branch: "Economics",
        topics: [
          { id: "consumer", name: "Consumer rights and COPRA", focus: "Rights, responsibilities, redressal" },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: "📖",
    tagline: "First Flight · Footprints Without Feet",
    accent: "#be185d", // rose
    chapters: [
      {
        id: "ch-letter-god",
        name: "A Letter to God",
        branch: "First Flight (Prose)",
        topics: [
          { id: "faith", name: "Faith and irony — Lencho's faith", focus: "Comprehension and values" },
        ],
      },
      {
        id: "ch-nelson",
        name: "Nelson Mandela: Long Walk to Freedom",
        branch: "First Flight (Prose)",
        topics: [
          { id: "freedom", name: "Freedom and courage", focus: "Apartheid; inaugural address" },
        ],
      },
      {
        id: "ch-two-stories",
        name: "Two Stories about Flying",
        branch: "First Flight (Prose)",
        topics: [
          { id: "courage", name: "'His First Flight' and 'The Black Aeroplane'", focus: "Fear, courage, trust" },
        ],
      },
      {
        id: "ch-anne-frank",
        name: "From the Diary of Anne Frank",
        branch: "First Flight (Prose)",
        topics: [
          { id: "diary", name: "Anne's diary and loneliness", focus: "Diary-entry writing; character study" },
        ],
      },
      {
        id: "ch-glimpses",
        name: "Glimpses of India",
        branch: "First Flight (Prose)",
        topics: [
          { id: "culture", name: "A Baker from Goa · Coorg · Tea from Assam", focus: "Cultural notes and connectives" },
        ],
      },
      {
        id: "ch-mijbil",
        name: "Mijbil the Otter",
        branch: "First Flight (Prose)",
        topics: [
          { id: "otter", name: "Gavin Maxwell and Mijbil", focus: "Bond with an animal" },
        ],
      },
      {
        id: "ch-madam-bus",
        name: "Madam Rides the Bus",
        branch: "First Flight (Prose)",
        topics: [
          { id: "valli", name: "Valli's journey and innocence", focus: "Character; 'tight-lipped' maturity" },
        ],
      },
      {
        id: "ch-sermon",
        name: "The Sermon at Benares",
        branch: "First Flight (Prose)",
        topics: [
          { id: "buddha", name: "Buddha's sermon on grief", focus: "Kisa Gotami's lamp story" },
        ],
      },
      {
        id: "ch-proposal",
        name: "The Proposal",
        branch: "First Flight (Prose)",
        topics: [
          { id: "farce", name: "A one-act farce by Chekhov", focus: "Drama, humour, characters" },
        ],
      },
      {
        id: "ch-poetry",
        name: "First Flight Poetry",
        branch: "First Flight (Poetry)",
        topics: [
          { id: "poems", name: "Key poems — Dust of Snow, Fire and Ice, Tiger in the Zoo, Amanda", focus: "Themes and poetic devices" },
        ],
      },
      {
        id: "ch-triumph-surgery",
        name: "A Triumph of Surgery",
        branch: "Footprints Without Feet",
        topics: [
          { id: "tricki", name: "Mr Herriot and Tricki", focus: "Oversized love vs discipline" },
        ],
      },
      {
        id: "ch-thief-story",
        name: "The Thief's Story",
        branch: "Footprints Without Feet",
        topics: [
          { id: "hari", name: "Anil and Hari Singh", focus: "Redemption and trust" },
        ],
      },
      {
        id: "ch-midnight-visitor",
        name: "The Midnight Visitor",
        branch: "Footprints Without Feet",
        topics: [
          { id: "ausable", name: "Ausable and Max", focus: "Quick thinking, irony" },
        ],
      },
      {
        id: "ch-question-trust",
        name: "A Question of Trust",
        branch: "Footprints Without Feet",
        topics: [
          { id: "horace", name: "Horace Danby", focus: "Crime and its cost" },
        ],
      },
      {
        id: "ch-footprints",
        name: "Footprints Without Feet",
        branch: "Footprints Without Feet",
        topics: [
          { id: "griffin", name: "Griffin the invisible scientist", focus: "Science fiction; homelessness of genius" },
        ],
      },
      {
        id: "ch-making-scientist",
        name: "The Making of a Scientist",
        branch: "Footprints Without Feet",
        topics: [
          { id: "richard", name: "Richard Ebright", focus: "Curiosity, dedication, research" },
        ],
      },
      {
        id: "ch-necklace",
        name: "The Necklace",
        branch: "Footprints Without Feet",
        topics: [
          { id: "mathilde", name: "Mathilde Loisel", focus: "Pride and the price of vanity" },
        ],
      },
      {
        id: "ch-bholi",
        name: "Bholi",
        branch: "Footprints Without Feet",
        topics: [
          { id: "bholi-char", name: "Bholi's transformation", focus: "Education, self-respect, speech" },
        ],
      },
      {
        id: "ch-book-earth",
        name: "The Book that Saved the Earth",
        branch: "Footprints Without Feet",
        topics: [
          { id: "play", name: "Fantasy play and the power of books", focus: "Drama; imagination" },
        ],
      },
    ],
  },
  {
    id: "bseb-english",
    name: "English (Bihar Board)",
    icon: "📖",
    tagline: "Panorama Part 2 · Prose, Poetry & Reader",
    accent: "#2563EB",
    chapters: [
      // PROSE (8 Chapters)
      {
        id: "ch-bseb-p1",
        name: "The Pace for Living",
        branch: "Prose",
        topics: [
          { id: "pace-agony-merchant", name: "The Agony of the Corn Merchant", focus: "Fast-paced modern life vs slow thinkers, Irish corn merchant's anxiety" },
          { id: "pace-slow-thinkers", name: "Slow Thinkers in Modern Civilization", focus: "Disadvantage of slow thinking in practical livelihood vs contemplative peace" },
        ],
      },
      {
        id: "ch-bseb-p2",
        name: "Me and the Ecology Bit",
        branch: "Prose",
        topics: [
          { id: "eco-jim-mission", name: "Jim's Ecological Campaign", focus: "Preaching environmental preservation vs personal convenience (Mr. Williams, Ms. Greene)" },
          { id: "eco-compost-recycling", name: "Composting, Pollution & Household Waste", focus: "Practical challenges in recycling and pollution prevention" },
        ],
      },
      {
        id: "ch-bseb-p3",
        name: "Gillu",
        branch: "Prose",
        topics: [
          { id: "gillu-rescue-nurturing", name: "Rescue & Nurturing of Gillu", focus: "Mahadevi Varma healing the wounded baby squirrel attacked by crows" },
          { id: "gillu-bond-farewell", name: "Affectionate Bond & Sonjuhi Farewell", focus: "Gillu's antics, intelligence, tragic short lifespan, and burial under Sonjuhi creeper" },
        ],
      },
      {
        id: "ch-bseb-p4",
        name: "What is Wrong with Indian Films?",
        branch: "Prose",
        topics: [
          { id: "films-critique-hollywood", name: "Critique of Hollywood Imitation", focus: "Satyajit Ray's critique of superficial gloss, lack of authentic Indian reality" },
          { id: "films-visual-authenticity", name: "Visual Purity & Authentic Storytelling", focus: "Maturity, simplicity, and cultural grounding needed in Indian cinema" },
        ],
      },
      {
        id: "ch-bseb-p5",
        name: "Acceptance Speech",
        branch: "Prose",
        topics: [
          { id: "speech-suu-kyi-struggle", name: "Burmese Struggle for Democracy", focus: "Alexander Aris accepting 1991 Nobel Peace Prize on behalf of Aung San Suu Kyi" },
          { id: "speech-peace-freedom", name: "Peace, Non-Violence & Human Dignity", focus: "International solidarity and the triumph of freedom over oppression" },
        ],
      },
      {
        id: "ch-bseb-p6",
        name: "Once Upon a Time",
        branch: "Prose",
        topics: [
          { id: "once-parable-bird", name: "Parable of the Blind Old Woman & Bird", focus: "Toni Morrison's Nobel lecture: responsibility of the living bird in youth's hands" },
          { id: "once-language-power", name: "Language as an Instrument of Freedom", focus: "Oppressive vs life-giving language; duty of writers and the new generation" },
        ],
      },
      {
        id: "ch-bseb-p7",
        name: "The Unity of Indian Culture",
        branch: "Prose",
        topics: [
          { id: "unity-culture-vs-civilization", name: "Culture vs Civilization", focus: "Humayun Kabir on outer organizational structure vs inner spiritual culture" },
          { id: "unity-continuity-assimilation", name: "Continuous Vitality & Assimilation", focus: "India's unbroken cultural continuity through diversity and absorption of races" },
        ],
      },
      {
        id: "ch-bseb-p8",
        name: "Little Girls Wiser Than Men",
        branch: "Prose",
        topics: [
          { id: "girls-muddy-puddle", name: "The Muddy Puddle & Adult Feud", focus: "Leo Tolstoy on Akoulya and Malasha's Easter dresses, mothers quarreling" },
          { id: "girls-innocence-reconciliation", name: "Innocence, Forgiveness & True Wisdom", focus: "Little girls laughing and playing while adults brawl: wisdom of children" },
        ],
      },

      // POETRY (8 Poems)
      {
        id: "ch-bseb-po1",
        name: "God Made the Country",
        branch: "Poetry",
        topics: [
          { id: "cowper-country-vs-town", name: "Rural Serenity vs Urban Chaos", focus: "William Cowper on divine rustic calm, birdsong vs artificial city life" },
        ],
      },
      {
        id: "ch-bseb-po2",
        name: "Ode on Solitude",
        branch: "Poetry",
        topics: [
          { id: "pope-happy-solitude", name: "The Blessed Independent Life", focus: "Alexander Pope on self-sufficiency, peaceful hours, unlamented passing" },
        ],
      },
      {
        id: "ch-bseb-po3",
        name: "Polythene Bag",
        branch: "Poetry",
        topics: [
          { id: "poly-hazard-grief", name: "Non-Biodegradable Pollutant & Lingering Grief", focus: "Durga Prasad Panda on plastic pollution and emotional pain that never decays" },
        ],
      },
      {
        id: "ch-bseb-po4",
        name: "Thinner Than a Crescent",
        branch: "Poetry",
        topics: [
          { id: "vidya-radha-separation", name: "Radha's Agony of Separation", focus: "Vidyapati on Radha pining for Krishna, weeping tears, wasting like the crescent moon" },
        ],
      },
      {
        id: "ch-bseb-po5",
        name: "The Empty Heart",
        branch: "Poetry",
        topics: [
          { id: "heart-greed-kalpataru", name: "Kalpataru & The Curse of Greed", focus: "Periasamy Thooran on insatiable greed, seven gold pitchers, tragic demise" },
        ],
      },
      {
        id: "ch-bseb-po6",
        name: "Koel",
        branch: "Poetry",
        topics: [
          { id: "koel-fiery-song", name: "The Fiery Song of the Cuckoo", focus: "Puran Singh on the black Koel scorched by love's fire, yearning for beloved" },
        ],
      },
      {
        id: "ch-bseb-po7",
        name: "The Sleeping Porter",
        branch: "Poetry",
        topics: [
          { id: "porter-hardship-slumber", name: "Heroic Struggle & Royal Slumber", focus: "Laxmi Prasad Devkota on Himalayan porter carrying 57 lbs, dignity of labor, peaceful sleep" },
        ],
      },
      {
        id: "ch-bseb-po8",
        name: "Martha",
        branch: "Poetry",
        topics: [
          { id: "martha-magical-tales", name: "The Enchantment of Fairy Storytelling", focus: "Walter de la Mare on Martha's tranquil eyes, hazel glen, entranced childhood memories" },
        ],
      },

      // SUPPLEMENTARY READER (5 Stories)
      {
        id: "ch-bseb-sr1",
        name: "January Night (Poos Ki Raat)",
        branch: "Supplementary Reader",
        topics: [
          { id: "jan-halku-winter-debt", name: "Halku, Debt & Winter in the Fields", focus: "Premchand on peasant indebtedness, landlord Sahna, Halku and faithful dog Jabra" },
          { id: "jan-ruined-harvest", name: "Ruined Crop & Peasant Resignation", focus: "Fire of dried leaves, nilgais destroying the crop, Halku's bitter relief from winter vigilance" },
        ],
      },
      {
        id: "ch-bseb-sr2",
        name: "Quality",
        branch: "Supplementary Reader",
        topics: [
          { id: "quality-gessler-craft", name: "The Gessler Brothers' Craftsmanship", focus: "John Galsworthy on devotion to quality bootmaking, integrity against commercial mass-production" },
          { id: "quality-tragedy-starvation", name: "Slow Starvation of Traditional Artisans", focus: "The tragic demise of the younger Gessler brother who starved for his art" },
        ],
      },
      {
        id: "ch-bseb-sr3",
        name: "Sun and Moon",
        branch: "Supplementary Reader",
        topics: [
          { id: "sun-moon-party-wonder", name: "Childlike Wonder & The Lavish Party", focus: "Katherine Mansfield on little Sun and Moon observing adult preparations, ice pudding house" },
          { id: "sun-moon-disillusionment", name: "Morning Disillusionment & Adult Pretense", focus: "The ruined party remains, broken ice house, emotional sensitivity of the child" },
        ],
      },
      {
        id: "ch-bseb-sr4",
        name: "Two Horizons",
        branch: "Supplementary Reader",
        topics: [
          { id: "horizons-mother-daughter", name: "Epistolary Dialogue: Mother & Daughter", focus: "Binapani Mohanty on letters between mother and daughter, domestic confinement, longing for horizon" },
        ],
      },
      {
        id: "ch-bseb-sr5",
        name: "Love Defiled",
        branch: "Supplementary Reader",
        topics: [
          { id: "love-defiled-compromise", name: "Idealistic Love vs Social Compromise", focus: "Giridhar Jha on eight-year romance ending in betrayal for an arranged IAS status marriage" },
        ],
      },
    ],
  },
    {
    id: "english-grammar",
    name: "English Grammar",
    icon: "✍️",
    tagline: "Parts of Speech · Tenses · Concord · Reported Speech · Modals",
    accent: "#6366F1",
    chapters: [
      /* --- COMPLETE PARTS OF SPEECH (THE 8 BUILDING BLOCKS + DETERMINERS) --- */
      {
        id: "ch-eg-nouns",
        name: "Nouns & Nominal Forms",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-noun-classes", name: "Classification of Nouns", focus: "Proper, Common, Collective, Abstract & Material nouns with board error traps" },
          { id: "eg-noun-number-gender", name: "Noun Number, Gender & Cases", focus: "Countable vs uncountable nouns, irregular plurals, and possessive ('s) case rules" },
        ],
      },
      {
        id: "ch-eg-pronouns",
        name: "Pronouns & Antecedents",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-personal-relative-pronouns", name: "Personal, Demonstrative & Relative Pronouns", focus: "Subject vs object cases (I/me, who/whom), relative pronouns (who, which, that), and antecedent agreement" },
          { id: "eg-reflexive-indefinite", name: "Reflexive, Emphatic & Indefinite Pronouns", focus: "Reflexive vs emphatic (-self), indefinite pronouns (everyone, someone) verb agreement, and reciprocal pronouns" },
        ],
      },
      {
        id: "ch-eg-verbs",
        name: "Verbs & Non-Finite Forms",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-transitive-intransitive", name: "Transitive, Intransitive & Linking Verbs", focus: "Direct vs indirect objects, transitive vs intransitive verbs, and stative vs dynamic verbs" },
          { id: "eg-non-finites", name: "Non-Finite Verbs: Infinitives, Gerunds & Participles", focus: "To-infinitives, bare infinitives (let, make), gerunds as verbal nouns, and present/past participles" },
        ],
      },
      {
        id: "ch-eg-adjectives",
        name: "Adjectives & Comparison",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-adjective-types", name: "Types of Adjectives & Attributes", focus: "Qualitative, quantitative, numeral, demonstrative, interrogative, and proper adjectives" },
          { id: "eg-comparison-order", name: "Degrees of Comparison & Order of Adjectives", focus: "Positive, comparative, superlative rules, irregular degrees, and standard Royal Order (OSASCOMP)" },
        ],
      },
      {
        id: "ch-eg-adverbs",
        name: "Adverbs & Modifiers",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-adverb-types", name: "Classification & Formation of Adverbs", focus: "Adverbs of manner, place, time, frequency, degree, reason, and suffix -ly formation" },
          { id: "eg-adverb-position-inversion", name: "Placement of Adverbs & Inversion Rules", focus: "Positioning of adverbs, confusing pairs (hard/hardly, late/lately), and negative inversion (seldom, hardly)" },
        ],
      },
      {
        id: "ch-eg-prepositions",
        name: "Prepositions & Phrasal Collocations",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-prep-usage", name: "Prepositions of Time, Place & Direction", focus: "At, on, in, by, since, for, across, through, into, upon, and phrasal prepositions" },
          { id: "eg-phrasal-prepositions", name: "Complex Prepositions & Fixed Collocations", focus: "According to, in spite of, by virtue of, and fixed prepositional verbs (abide by, fond of, accuse of)" },
        ],
      },
      {
        id: "ch-eg-conjunctions",
        name: "Conjunctions & Connectors",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-coordinating-subordinating", name: "Coordinating & Subordinating Conjunctions", focus: "Coordinating FANBOYS, subordinating conjunctions of cause, time, condition (unless, although, because)" },
          { id: "eg-correlative-conjunctions", name: "Correlative Conjunction Pairs", focus: "Either...or, neither...nor, not only...but also, scarcely...when, no sooner...than parallelism" },
        ],
      },
      {
        id: "ch-eg-interjections",
        name: "Interjections & Emotional Markers",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-interjections-usage", name: "Interjections & Punctuation", focus: "Primary emotions: joy (Hurrah!), grief (Alas!), surprise (Wow!), approval (Bravo!), and exclamation rules" },
        ],
      },
      {
        id: "ch-eg-determiners",
        name: "Determiners & Articles",
        branch: "Parts of Speech",
        topics: [
          { id: "eg-articles-quantifiers", name: "Articles & Quantifiers", focus: "A, an, the, some, any, much, many, each, every, few, little" },
        ],
      },

      /* --- CORE SENTENCE GRAMMAR & SYNTAX --- */
      {
        id: "ch-eg-tenses",
        name: "Tenses & Time",
        branch: "Core Sentence Grammar",
        topics: [
          { id: "eg-present-past", name: "Present & Past Forms", focus: "Simple, continuous, perfect, and perfect continuous forms" },
          { id: "eg-future-time", name: "Future Time Reference & Aspect", focus: "Will/shall, going to, future continuous, and conditional time clauses" },
        ],
      },
      {
        id: "ch-eg-modals",
        name: "Modals & Auxiliaries",
        branch: "Core Sentence Grammar",
        topics: [
          { id: "eg-modal-functions", name: "Modal Auxiliaries & Functions", focus: "Can, could, may, might, will, would, shall, should, must, ought to" },
        ],
      },
      {
        id: "ch-eg-concord",
        name: "Subject-Verb Concord",
        branch: "Core Sentence Grammar",
        topics: [
          { id: "eg-agreement-rules", name: "Subject-Verb Agreement Rules", focus: "Singular/plural agreement, either/or, neither/nor, collective nouns, phrases" },
        ],
      },
      {
        id: "ch-eg-reported-speech",
        name: "Reported Speech",
        branch: "Core Sentence Grammar",
        topics: [
          { id: "eg-direct-indirect-statements", name: "Direct & Indirect Statements", focus: "Tense backshift, pronoun changes, time and place adverbial shifts" },
          { id: "eg-reported-questions-commands", name: "Reported Questions & Commands", focus: "Yes/no questions with if/whether, Wh- questions, imperatives and requests" },
        ],
      },
      {
        id: "ch-eg-voice",
        name: "Active & Passive Voice",
        branch: "Core Sentence Grammar",
        topics: [
          { id: "eg-voice-transformations", name: "Voice Transformation Rules", focus: "Subject-object inversion, auxiliary be + past participle, imperative passives" },
        ],
      },
      {
        id: "ch-eg-clauses",
        name: "Clauses & Complex Sentences",
        branch: "Core Sentence Grammar",
        topics: [
          { id: "eg-noun-relative-clauses", name: "Noun & Relative Clauses", focus: "Defining and non-defining relative clauses, noun clauses as subjects/objects" },
          { id: "eg-adverb-clauses", name: "Adverbial Clauses", focus: "Clauses of time, reason, condition (if/unless), concession (although/though)" },
        ],
      },

      /* --- APPLIED GRAMMAR & BOARD EDITING --- */
      {
        id: "ch-eg-editing",
        name: "Editing & Error Correction",
        branch: "Applied Grammar",
        topics: [
          { id: "eg-editing-omission", name: "Editing & Omission Passages", focus: "Board exam passage editing: locating errors and writing corrections" },
        ],
      },
    ],
  },
  {
    id: "hindi-grammar",
    name: "Hindi Grammar (हिंदी व्याकरण)",
    icon: "🕉️",
    tagline: "पदबंध · वाक्य रूपांतरण · समास · अलंकार · मुहावरे",
    accent: "#F97316",
    chapters: [
      {
        id: "ch-hg-padbandh",
        name: "पदबंध (Phrase Types)",
        branch: "व्याकरण संरचना",
        topics: [
          { id: "hg-padbandh-types", name: "पदबंध के भेद व पहचान", focus: "संज्ञा, सर्वनाम, विशेषण, क्रिया एवं क्रियाविशेषण (अव्यय) पदबंध की पहचान" },
        ],
      },
      {
        id: "ch-hg-vakya",
        name: "रचना के आधार पर वाक्य रूपांतरण",
        branch: "व्याकरण संरचना",
        topics: [
          { id: "hg-vakya-types-transform", name: "सरल, संयुक्त एवं मिश्र वाक्य", focus: "वाक्य के तीनों भेदों की पहचान, समानाधिकरण एवं व्यधिकरण योजक, वाक्य परिवर्तन" },
        ],
      },
      {
        id: "ch-hg-samas",
        name: "समास एवं समास-विग्रह",
        branch: "शब्द रचना",
        topics: [
          { id: "hg-samas-all-types", name: "समास के छह भेद व विग्रह", focus: "तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व, बहुव्रीहि तथा अव्ययीभाव समास" },
        ],
      },
      {
        id: "ch-hg-vachya",
        name: "वाच्य एवं वाच्य परिवर्तन",
        branch: "व्याकरण संरचना",
        topics: [
          { id: "hg-vachya-types-transform", name: "कर्तृवाच्य, कर्मवाच्य व भाववाच्य", focus: "कर्ता, कर्म और भाव की प्रधानता, से/के द्वारा का प्रयोग, वाच्य रूपांतरण" },
        ],
      },
      {
        id: "ch-hg-alankar",
        name: "अलंकार",
        branch: "काव्य सौंदर्य",
        topics: [
          { id: "hg-shabdalankar-arthalankar", name: "शब्दालंकार एवं अर्थालंकार", focus: "अनुप्रास, यमक, श्लेष, उपमा, रूपक, उत्प्रेक्षा, अतिशयोक्ति, मानवीकरण" },
        ],
      },
      {
        id: "ch-hg-muhavare",
        name: "मुहावरे एवं लोकोक्तियाँ",
        branch: "भाषा प्रयोग",
        topics: [
          { id: "hg-muhavare-usage", name: "महत्त्वपूर्ण मुहावरे और वाक्य प्रयोग", focus: "बोर्ड परीक्षा में बार-बार पूछे जाने वाले प्रमुख मुहावरे, अर्थ व सटीक वाक्य प्रयोग" },
        ],
      },
      {
        id: "ch-hg-sandhi",
        name: "संधि एवं संधि-विच्छेद",
        branch: "वर्ण विचार",
        topics: [
          { id: "hg-sandhi-rules", name: "स्वर, व्यंजन एवं विसर्ग संधि", focus: "दीर्घ, गुण, वृद्धि, यण, अयादि स्वर संधि, व्यंजन और विसर्ग संधि के प्रमुख नियम" },
        ],
      },
      {
        id: "ch-hg-shuddhi",
        name: "वर्तनी एवं वाक्य शुद्धि",
        branch: "भाषा प्रयोग",
        topics: [
          { id: "hg-vakya-shuddhi-rules", name: "अशुद्धि शोधन के नियम", focus: "लिंग, वचन, कारक, पदक्रम, पुनरुक्ति संबंधी अशुद्धियों को पहचानना व शुद्ध करना" },
        ],
      },
      {
        id: "ch-hg-upasarg-pratyay",
        name: "उपसर्ग एवं प्रत्यय",
        branch: "शब्द रचना",
        topics: [
          { id: "hg-upasarg-pratyay-rules", name: "उपसर्ग, प्रत्यय और मूल शब्द", focus: "तत्सम, तद्भव, विदेशी उपसर्ग तथा कृत् एवं तद्धित प्रत्यय का पृथक्करण" },
        ],
      },
    ],
  },
];

/* ---------------------------------- Lookups ---------------------------------- */

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getChapter(subjectId: string, chapterId: string): Chapter | undefined {
  return getSubject(subjectId)?.chapters.find((c) => c.id === chapterId);
}

export function getTopic(
  subjectId: string,
  chapterId: string,
  topicId: string
): { subject: Subject; chapter: Chapter; topic: NonNullable<Chapter["topics"][number]> } | null {
  const subject = getSubject(subjectId);
  const chapter = getChapter(subjectId, chapterId);
  const topic = chapter?.topics.find((t) => t.id === topicId);
  if (!subject || !chapter || !topic) return null;
  return { subject, chapter, topic };
}

export function chapterBranches(subjectId: string): { branch: string; chapters: Chapter[] }[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];
  const groups = new Map<string, Chapter[]>();
  for (const ch of subject.chapters) {
    const key = ch.branch ?? "Chapters";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(ch);
  }
  return [...groups.entries()].map(([branch, chapters]) => ({ branch, chapters }));
}

export function allTopics(): { subjectId: string; chapterId: string; topic: Chapter["topics"][number] }[] {
  const out: { subjectId: string; chapterId: string; topic: Chapter["topics"][number] }[] = [];
  for (const s of SUBJECTS) for (const c of s.chapters) for (const t of c.topics) out.push({ subjectId: s.id, chapterId: c.id, topic: t });
  return out;
}

export function subjectOptions(): { id: SubjectId; name: string; icon: string }[] {
  return SUBJECTS.map((s) => ({ id: s.id, name: s.name, icon: s.icon }));
}