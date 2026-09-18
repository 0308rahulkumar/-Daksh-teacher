import type { MindmapDoc, NoteDoc, Flashcard, GeneratedQuizQuestion } from "./types";

/**
 * Handcrafted Bihar Board (BSEB) Class 10 English curated study material
 * Prescribed Textbook: Panorama Part 2 (Prose, Poetry, Supplementary Reader)
 * Tailored for BSEB board examination format (50% Objective MCQs + 50% Subjective Analysis)
 */

export const BSEB_MINDMAPS: Record<string, MindmapDoc> = {
  // 1. The Pace for Living
  "bseb-english:ch-bseb-p1:pace-agony-merchant": {
    root: "The Pace for Living (R.C. Hutchinson)",
    nodes: [
      {
        label: "The Dublin Play & Protagonist",
        detail: "Elderly Irish corn merchant in a small Irish country town",
        children: [
          { label: "Anxious character with a tricky nephew cheating him" },
          { label: "Wife who spent £10 on a single holiday" },
          { label: "Merchant's heart-cry: 'Aeroplanes at 1,000 miles an hour... that's too fast!'" },
        ],
      },
      {
        label: "Speed of Modern Life",
        detail: "Sensory rush vs genuine mental engagement",
        children: [
          { label: "Rapid locomotion (driving at 90 mph) gives superficial excitement" },
          { label: "Fast pace deprives the mind of slow, organic contemplation" },
          { label: "Cinema experience: Fast cuts require rapid mental adaptation" },
        ],
      },
      {
        label: "Slow Thinkers Dilemma",
        detail: "Author's self-identification as a slow thinker",
        children: [
          { label: "Disadvantaged in modern economic rat-race" },
          { label: "Fails intelligence tests designed solely for mental speed" },
          { label: "Yet slow thinking retains depth, wisdom, and life-enjoyment" },
        ],
      },
      {
        label: "BSEB Board Exam Focus",
        detail: "Frequently tested 1-mark and 2-mark points",
        children: [
          { label: "Where did the author see the play? Dublin, Ireland" },
          { label: "How much did merchant's wife spend? £10 on a holiday" },
          { label: "Who is the protagonist? An elderly Irish corn merchant" },
        ],
      },
    ],
  },
  "bseb-english:ch-bseb-p1:pace-slow-thinkers": {
    root: "Slow Thinkers vs Fast Thinkers",
    nodes: [
      {
        label: "Classification of Thinkers",
        detail: "Mental agility vs contemplative depth",
        children: [
          { label: "Fast thinkers: Well-adapted to business, commerce, modern competition" },
          { label: "Slow thinkers: Ponderous, reflective, penalized in competitive tests" },
          { label: "Author belongs to the tribe of slow thinkers" },
        ],
      },
      {
        label: "Cinema Analogy",
        detail: "Author asking his wife to explain fast film scenes",
        children: [
          { label: "Three blonde actresses looking similar in cinema" },
          { label: "Author's mind takes 2-3 minutes to decode who is who" },
          { label: "Modern cinema mirrors the dizzying speed of today's world" },
        ],
      },
    ],
  },

  // 2. Me and the Ecology Bit
  "bseb-english:ch-bseb-p2:eco-jim-mission": {
    root: "Me and the Ecology Bit (Joan Lexau)",
    nodes: [
      {
        label: "Jim's Ecology Route",
        detail: "A young boy's weekend awareness drive",
        children: [
          { label: "Paper route combined with preaching ecology" },
          { label: "Motto: 'Everyone is in favour of ecology, but no one wants to do anything about it'" },
        ],
      },
      {
        label: "Encounter with Mr. Williams",
        detail: "Burning leaves vs Composting",
        children: [
          { label: "Williams burning leaves in backyard, producing smoke" },
          { label: "Jim urges making a compost pile with leaves, grass, and food scraps" },
          { label: "Williams counters: compost pile smells bad and Jim's dog digs up his lawn" },
        ],
      },
      {
        label: "Encounter with Ms. Greene",
        detail: "Recycling newspapers & aluminum cans",
        children: [
          { label: "Jim reminds Ms. Greene to save old newspapers for school pickup" },
          { label: "Ms. Greene calls him 'Jimmy' and chides him for chewing gum wrappers on her lawn" },
        ],
      },
      {
        label: "Irony at Home",
        detail: "Jim's mother and electric appliances",
        children: [
          { label: "Jim tells his mother not to use electric mixer (wasting electricity)" },
          { label: "Mother retorts: Jim leaves TV on 27 hours a day!" },
          { label: "Irony: Preaching ecology is exhausting when people love modern convenience" },
        ],
      },
    ],
  },

  // 3. Gillu
  "bseb-english:ch-bseb-p3:gillu-rescue-nurturing": {
    root: "Gillu the Squirrel (Mahadevi Varma)",
    nodes: [
      {
        label: "The Crow Attack & Discovery",
        detail: "Cruel beak injuries in the verandah",
        children: [
          { label: "Two crows playing 'Kakbhushundi' poking a tiny baby squirrel" },
          { label: "Fell from nest near flowerpots, bleeding from deep beak wounds" },
          { label: "Visitors said: 'He will not survive, leave him alone'" },
        ],
      },
      {
        label: "Gentle Medical Care",
        detail: "Mahadevi Varma's compassionate nursing",
        children: [
          { label: "Wounds cleaned with cotton and treated with Penicillin ointment" },
          { label: "Mouth clamped shut; milk dripped with cotton wick into tiny mouth" },
          { label: "After 3 days: Opened blue glass bead eyes and gripped author's finger" },
        ],
      },
      {
        label: "Gillu's Domestic Life",
        detail: "Swinging in his cotton-lined flower basket",
        children: [
          { label: "Name given: 'Gillu' (affectionate pet)" },
          { label: "Favorite food: Kaju (cashew nuts) and biscuits" },
          { label: "Playful habit: Hiding inside curtain folds, thermos, and slipper" },
        ],
      },
      {
        label: "Parting & Sonjuhi Creeper",
        detail: "Natural lifespan and eternal remembrance",
        children: [
          { label: "Squirrel lifespan is barely 2 years" },
          { label: "Cold paws during his final winter night; clung to author's warm hand" },
          { label: "Buried beneath the Sonjuhi creeper" },
          { label: "Author looks at blooming yellow Sonjuhi flowers as Gillu's rebirth" },
        ],
      },
    ],
  },

  // 4. What is Wrong with Indian Films?
  "bseb-english:ch-bseb-p4:films-critique-hollywood": {
    root: "What is Wrong with Indian Films? (Satyajit Ray)",
    nodes: [
      {
        label: "The Quantity vs Quality Paradox",
        detail: "India is among the largest film producers globally",
        children: [
          { label: "Tremendous technical resources and studios in Bombay and Calcutta" },
          { label: "Yet almost no films recognized internationally as masterpieces" },
        ],
      },
      {
        label: "Blind Imitation of Hollywood",
        detail: "Ray's core aesthetic critique",
        children: [
          { label: "Slavish copying of American jazz music, glamorous sets, and song-dance routines" },
          { label: "Failure to portray authentic Indian rustic and urban realities" },
          { label: "Superficial gloss without dramatic soul or psychological truth" },
        ],
      },
      {
        label: "Ray's Recipe for Authentic Cinema",
        detail: "Simplicity, maturity, and indigenous roots",
        children: [
          { label: "Look into Indian everyday life, literature, and social struggles" },
          { label: "Restraint in music and camera movements" },
          { label: "Cinema must express the unique rhythm and idiom of India" },
        ],
      },
    ],
  },

  // 5. Acceptance Speech
  "bseb-english:ch-bseb-p5:speech-suu-kyi-struggle": {
    root: "Nobel Acceptance Speech (Alexander Aris / Suu Kyi)",
    nodes: [
      {
        label: "Historical Context",
        detail: "Oslo, Norway - December 10, 1991",
        children: [
          { label: "Nobel Peace Prize awarded to Aung San Suu Kyi of Burma" },
          { label: "Suu Kyi under house arrest by military junta (SLORC)" },
          { label: "Speech delivered by her 18-year-old son, Alexander Aris" },
        ],
      },
      {
        label: "Core Thematic Tenets",
        detail: "Peace, human rights, and non-violent resistance",
        children: [
          { label: "Prize belongs not to Suu Kyi alone, but to all Burmese people" },
          { label: "Honors Buddhist monks, student protesters, and political prisoners" },
          { label: "Peace is indivisible from liberty, human rights, and democracy" },
        ],
      },
      {
        label: "BSEB Exam High-Yield Points",
        detail: "Objective facts for 1-mark questions",
        children: [
          { label: "Nobel Peace Prize year: 1991" },
          { label: "Delivered in: Oslo, Norway" },
          { label: "Delivered by: Alexander Aris (her son)" },
        ],
      },
    ],
  },

  // 6. Once Upon a Time
  "bseb-english:ch-bseb-p6:once-parable-bird": {
    root: "Once Upon a Time (Toni Morrison)",
    nodes: [
      {
        label: "The Folklore Parable",
        detail: "Nobel Lecture in Literature, 1993",
        children: [
          { label: "Blind, wise African-American old woman, daughter of slaves" },
          { label: "Visited by clever young visitors testing her wisdom" },
          { label: "Trick question: 'Is the bird in my hand living or dead?'" },
        ],
      },
      {
        label: "The Woman's Masterful Reply",
        detail: "'I do not know whether the bird you are holding is dead or alive, but what I do know is that it is in your hands.'",
        children: [
          { label: "Shifts moral accountability directly to the youth" },
          { label: "The bird symbolizes language and cultural vitality" },
        ],
      },
      {
        label: "Language as a Force",
        detail: "Oppressive vs Liberating Language",
        children: [
          { label: "Dead/oppressive language censors thought, fuels war, and dehumanizes" },
          { label: "Living language fosters empathy, bridges generations, and sustains humanity" },
        ],
      },
    ],
  },

  // 7. The Unity of Indian Culture
  "bseb-english:ch-bseb-p7:unity-culture-vs-civilization": {
    root: "The Unity of Indian Culture (Humayun Kabir)",
    nodes: [
      {
        label: "Culture vs Civilization",
        detail: "Distinction established by Humayun Kabir",
        children: [
          { label: "Civilization: External organization of society, material comforts, technology" },
          { label: "Culture: Inner refinement of feelings, art, philosophy, and moral ideals" },
          { label: "Civilization is the body; culture is the animating soul" },
        ],
      },
      {
        label: "Unbroken Continuity",
        detail: "India's unique historical resilience",
        children: [
          { label: "Ancient Greece, Egypt, and Rome decayed and vanished" },
          { label: "Indian culture has survived unbroken for over 5,000 years" },
          { label: "Secret of survival: Synthesis, toleration, and assimilation of invading cultures" },
        ],
      },
    ],
  },

  // 8. Little Girls Wiser Than Men
  "bseb-english:ch-bseb-p8:girls-muddy-puddle": {
    root: "Little Girls Wiser Than Men (Leo Tolstoy)",
    nodes: [
      {
        label: "Easter Sunday & New Frocks",
        detail: "Akoulya (older) and Malasha (younger)",
        children: [
          { label: "Two girls in village lane wearing brand new Easter dresses" },
          { label: "Gather around a large muddy puddle running through the farmyards" },
          { label: "Malasha accidentally splashes dirty water onto Akoulya's yellow frock" },
        ],
      },
      {
        label: "Adult Escalation into Violence",
        detail: "Akoulya's mother strikes Malasha",
        children: [
          { label: "Malasha's mother rushes out shouting abuses" },
          { label: "Fathers and grandmothers join in; a violent street brawl erupts" },
          { label: "Akoulya's grandmother tries in vain to plead for Easter peace" },
        ],
      },
      {
        label: "Children's Reconciliation",
        detail: "Innocence overcoming pride",
        children: [
          { label: "Akoulya wipes her dress and uses a wooden chip to dig a trench" },
          { label: "Malasha joins her with a twig; both float chips of wood down the stream" },
          { label: "Girls are laughing together while grown men are tearing each other's shirts" },
          { label: "Tolstoy's moral: Children forgive instantly; adults poison their souls with grudge" },
        ],
      },
    ],
  },

  // POETRY
  "bseb-english:ch-bseb-po1:cowper-country-vs-town": {
    root: "God Made the Country (William Cowper)",
    nodes: [
      {
        label: "God's Country vs Man's Town",
        detail: "'God made the country, and man made the town'",
        children: [
          { label: "Country: Health, virtue, rustic innocence, divine peace" },
          { label: "Town: Artificial splendour, sickness, anxiety, moral corruption" },
        ],
      },
      {
        label: "Nature vs Artificial Splendour",
        detail: "Sensory comparison in 18th-century England",
        children: [
          { label: "Country music: The sweet song of the nightingale and thrush in groves" },
          { label: "Town music: Harsh rattling carriage wheels and theatrical noise" },
          { label: "Country light: Radiant moon and stars; Town light: Blinding lamps eclipse celestial beauty" },
        ],
      },
    ],
  },
  "bseb-english:ch-bseb-po2:pope-happy-solitude": {
    root: "Ode on Solitude (Alexander Pope)",
    nodes: [
      {
        label: "The Contented Man",
        detail: "Written by Pope at age 12",
        children: [
          { label: "Wishes to live on a few inherited paternal acres" },
          { label: "Herds give milk, fields give bread, flocks yield warm wool" },
          { label: "Trees provide shade in summer and firewood in winter" },
        ],
      },
      {
        label: "Peaceful Mind & Unseen Death",
        detail: "Solitary bliss and tranquil passing",
        children: [
          { label: "Quiet days, sound sleep, study and ease combined with meditation" },
          { label: "Final wish: Die secretly, unlamented, without a tombstone revealing where he rests" },
        ],
      },
    ],
  },
  "bseb-english:ch-bseb-po3:poly-hazard-grief": {
    root: "Polythene Bag (Durga Prasad Panda)",
    nodes: [
      {
        label: "The Physical Hazard",
        detail: "Non-biodegradable pollution",
        children: [
          { label: "When touched, makes a squeaky noise" },
          { label: "When burnt, emits pungent, suffocating fumes" },
          { label: "When left in soil, never dissolves, killing fertility" },
        ],
      },
      {
        label: "Metaphor for Buried Grief",
        detail: "Emotional hurt buried deep within human hearts",
        children: [
          { label: "Grief buried in heart does not disintegrate with time" },
          { label: "Grows warmer and poisons the inner spirit like smoldering trash" },
        ],
      },
    ],
  },
  "bseb-english:ch-bseb-po4:vidya-radha-separation": {
    root: "Thinner Than a Crescent (Vidyapati)",
    nodes: [
      {
        label: "Radha's Viraha (Separation)",
        detail: "Agony of pining for Lord Krishna",
        children: [
          { label: "Radha weeps inconsolably; tears form an entire river" },
          { label: "Sits on the river bank brooding day and night" },
        ],
      },
      {
        label: "The Crescent Moon Simile",
        detail: "Day by day wasting away",
        children: [
          { label: "Her body withers from sorrow" },
          { label: "Radha has grown thinner than the crescent moon in the first quarter of the sky" },
        ],
      },
    ],
  },
  "bseb-english:ch-bseb-po5:heart-greed-kalpataru": {
    root: "The Empty Heart (Periasamy Thooran)",
    nodes: [
      {
        label: "The Wishing Tree (Kalpataru)",
        detail: "Gift of seven pots of gold",
        children: [
          { label: "A rich man prays for more wealth at the wish-yielding tree" },
          { label: "Kalpataru generously gives seven silver pitchers brimful of gold coins" },
        ],
      },
      {
        label: "The Cursed Eighth Pitcher",
        detail: "A half-filled pitcher creates madness",
        children: [
          { label: "Tree adds an eighth pitcher that is only half-full" },
          { label: "Man becomes possessed by the lust to fill the eighth vessel" },
          { label: "Starves family, sells possessions, hoards every copper and nickel" },
          { label: "Dies exhausted with the pitcher still half-empty; greed has no bottom" },
        ],
      },
    ],
  },

  // SUPPLEMENTARY READER
  "bseb-english:ch-bseb-sr1:jan-halku-winter-debt": {
    root: "January Night / Poos Ki Raat (Premchand)",
    nodes: [
      {
        label: "Halku's Peasant Struggle",
        detail: "Indebted tenant farmer in North India",
        children: [
          { label: "Halku saves three rupees to purchase a winter blanket (kamal)" },
          { label: "Landlord Sahna arrives demanding revenue; abuses and threatens" },
          { label: "Munni protests: 'Farming is slavery, we work, they loot our earnings'" },
          { label: "Halku yields the three rupees to preserve his honor" },
        ],
      },
      {
        label: "The Freezing Vigil with Jabra",
        detail: "Bitter winter night under bamboo thatch",
        children: [
          { label: "Biting wind in the cane field; cold penetrates bones" },
          { label: "Halku hugs his stray dog Jabra for warmth; feels no caste or species repulsion" },
          { label: "Gathers dry mango leaves in the orchard and ignites a warm fire" },
        ],
      },
      {
        label: "The Destruction & Ironic Relief",
        detail: "Nilgais devour the harvest",
        children: [
          { label: "Jabra barks wildly as wild cattle trample the crop" },
          { label: "Halku, wrapped in warmth of embers, cannot bring himself to move in the freezing dark" },
          { label: "Morning: Munni weeps seeing the ruined field" },
          { label: "Halku smiles: 'At least I won't have to sleep out in the freezing night again!'" },
        ],
      },
    ],
  },
  "bseb-english:ch-bseb-sr2:quality-gessler-craft": {
    root: "Quality (John Galsworthy)",
    nodes: [
      {
        label: "The Gessler Brothers' Shop",
        detail: "Two German brothers in London's West End",
        children: [
          { label: "Quiet shop with two pairs of Russian boots in the window" },
          { label: "Mr. Gessler views shoemaking not as trade, but as sublime art" },
          { label: "'Id is an ardt!' (It is an art!)" },
          { label: "Boots made to measure from finest leather, lasting for years" },
        ],
      },
      {
        label: "The Industrial Onslaught",
        detail: "Mass production vs Handcrafted integrity",
        children: [
          { label: "Large retail boot firms dominate through flashy advertising, not quality" },
          { label: "Gessler loses customers who want cheap, ready-made fashionable shoes" },
          { label: "Elder brother dies of grief after losing half the shop" },
        ],
      },
      {
        label: "Slow Starvation of an Artist",
        detail: "Younger Gessler's tragic demise",
        children: [
          { label: "Younger brother works day and night without eating" },
          { label: "Every penny spent on shop rent and finest leather" },
          { label: "Dies of slow starvation ('starved his soul into the boots')" },
          { label: "English narrator laments the death of true craftsmanship" },
        ],
      },
    ],
  },
};

export const BSEB_NOTES: Record<string, NoteDoc> = {
  // 1. The Pace for Living
  "bseb-english:ch-bseb-p1:pace-agony-merchant": {
    topic: "The Agony of the Corn Merchant & Modern Speed",
    chapter: "The Pace for Living",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "An insightful essay by British novelist R.C. Hutchinson examining the dizzying tempo of modern mechanized society and how the pressure for rapid thinking marginalizes reflective, slow-thinking individuals.",
    keyPoints: [
      "The author watched a play in Dublin where the chief character was an elderly, anxious Irish corn merchant.",
      "The corn merchant had many worries: a treacherous nephew who was bilking him, and a wife whose spendthrift nature led her to spend £10 on a single holiday.",
      "The merchant had a desperate heart-cry: that aeroplanes traveling at 1,000 miles an hour were moving far too fast for human sensibility.",
      "Hutchinson clarifies that fast physical speed (like driving a car at 90 miles an hour) provides a dramatic thrill, but only as a superficial sensory pleasure.",
      "Real agony begins when fast mechanical speed is imposed on the human mind, demanding instantaneous reflexes instead of thoughtful deliberation.",
      "The essay highlights that modern intelligence tests and corporate rat-races are biased toward rapid reflexes rather than wisdom.",
    ],
    examples: [
      "Dublin Play Experience: An elderly Irish corn merchant expressing deep anxiety over rapid technology.",
      "Cinema Confusion: The author struggles to differentiate between three leading actresses without whispered explanations from his wife.",
      "Fast Travel Paradox: Flying across the Atlantic to London in hours leaves no organic memory of the journey.",
    ],
    commonMistakes: [
      "Thinking the author hates modern conveniences entirely — Hutchinson enjoys driving fast cars; his objection is mental hurry and superficial thinking.",
      "Misidentifying the author's nationality: R.C. Hutchinson is a British writer; the play was set in Dublin, Ireland.",
      "Forgetting the amount spent by the merchant's wife (£10 on a holiday), which is a common BSEB 1-mark objective question.",
    ],
    examKeywords: [
      "R.C. Hutchinson",
      "Dublin play",
      "Irish corn merchant",
      "1,000 miles an hour",
      "Slow thinkers",
      "Superficial sensation",
      "BSEB Objective Marks",
    ],
    quickRevision: [
      "✅ Author: R.C. Hutchinson; Play venue: Dublin, Ireland.",
      "✅ Protagonist: Elderly Irish corn merchant with tricky nephew and £10-holiday wife.",
      "✅ Hutchinson belongs to the 'tribe of slow thinkers' who are economically disadvantaged in modern rat-races.",
    ],
  },

  // 2. Me and the Ecology Bit
  "bseb-english:ch-bseb-p2:eco-jim-mission": {
    topic: "Jim's Ecological Mission & Everyday Hypocrisy",
    chapter: "Me and the Ecology Bit",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A humorous yet thought-provoking story by Joan Lexau narrating young Jim's struggles to convince his neighbors to protect the environment while exposing human reluctance to sacrifice personal luxury.",
    keyPoints: [
      "Jim runs a newspaper delivery route and attempts to promote an 'ecology bit' on weekends.",
      "Jim's motto summarizes the irony of conservation: 'Nobody wants to do anything about ecology, only talk about it.'",
      "Mr. Williams is found burning autumn leaves in his yard; Jim urges him to create a compost pile to fertilize plants and prevent air pollution.",
      "Mr. Williams rebukes Jim, pointing out the foul odor of compost piles and reminding Jim that his pet dog dug up Williams's garden.",
      "Ms. Greene is urged to save newspapers and aluminum cans for school recycling, but she criticizes Jim for dropping candy wrappers on her lawn and calling her 'Mrs.' Greene instead of 'Ms.'",
      "At home, Jim lectures his mother against running the electric kitchen mixer, to which she sharply counters that Jim leaves the TV humming 27 hours a day.",
    ],
    examples: [
      "Leaf Burning vs Compost: Burning leaves creates hazardous smoke, but neighbors object to the smell of decomposing compost.",
      "Recycling Friction: People support recycling until it demands sorting trash and storing bulky newspapers.",
      "Domestic Irony: Preaching conservation to parents while wasting electricity on TV and video games.",
    ],
    commonMistakes: [
      "Confusing Ms. Greene's title: She specifically insists on being addressed as 'Ms. Greene', not 'Mrs. Greene'.",
      "Assuming Jim is a certified environmental scientist: Jim is merely a schoolboy running a weekend paper route.",
    ],
    examKeywords: [
      "Joan Lexau",
      "Jim",
      "Mr. Williams",
      "Ms. Greene",
      "Compost pile",
      "Ecology bit",
      "Electric mixer",
    ],
    quickRevision: [
      "✅ Author: Joan Lexau; Central protagonist: Jim (the schoolboy paper-deliverer).",
      "✅ Neighbors encountered: Mr. Williams (leaf burner) and Ms. Greene (paper & cans).",
      "✅ Core theme: The stark gap between preaching environmental care and actual individual sacrifice.",
    ],
  },

  // 3. Gillu
  "bseb-english:ch-bseb-p3:gillu-rescue-nurturing": {
    topic: "Gillu the Squirrel: Compassion & Nature's Bond",
    chapter: "Gillu",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A poignant, autobiographical sketch by Mahadevi Varma depicting the tender companionship between the great writer and an orphaned baby squirrel named Gillu.",
    keyPoints: [
      "Discovery: Mahadevi Varma finds a tiny baby squirrel fallen from its nest in the verandah, assaulted by two aggressive crows.",
      "First Aid: Ignoring advice that the injured creature would perish, she gently cleanses the wounds with cotton and applies Penicillin ointment.",
      "Nurturing: Because the baby's jaws were clamped shut, she feeds it drops of milk with a thin cotton wick until it regains vitality.",
      "Living Habitat: Gillu is housed in a light wicker basket lined with soft cotton wool, suspended next to the author's writing window.",
      "Diet & Delights: Gillu's favorite treat is cashew nuts (Kaju); when denied Kaju, he angrily tosses food from his swing.",
      "Compassionate Companion: When Mahadevi Varma is injured in a car accident, Gillu stays by her pillow, stroking her forehead with his tiny paws.",
      "Tragic Parting: A squirrel's natural lifespan rarely exceeds two years. On his final winter night, his paws turn icy cold as he clings to the author's warm finger before passing away.",
      "Burial & Symbolism: Buried under the roots of the Sonjuhi creeper; the author finds solace believing Gillu will be reincarnated as a cheerful yellow Sonjuhi flower in spring.",
    ],
    examples: [
      "Crow Attack: The twin crows engaged in a game of 'Kakbhushundi' pecking at the helpless baby squirrel.",
      "Playful Camouflage: Gillu hiding inside the folds of curtains, behind wall calendars, and inside Mahadevi Varma's slipper.",
      "Sonjuhi Blossom: The bright yellow spring flower symbolizing the soul and memory of Gillu.",
    ],
    commonMistakes: [
      "Writing that Gillu was a bird or mongoose — Gillu was a baby squirrel.",
      "Forgetting Gillu's favorite food: Kaju (cashew nuts).",
      "Forgetting the lifespan of squirrels: strictly 2 years according to Mahadevi Varma's text.",
    ],
    examKeywords: [
      "Mahadevi Varma",
      "Gillu",
      "Baby squirrel",
      "Sonjuhi creeper",
      "Kaju (cashew)",
      "2 years lifespan",
      "Penicillin ointment",
    ],
    quickRevision: [
      "✅ Author: Mahadevi Varma (celebrated Chhayavadi Hindi poetess/essayist).",
      "✅ Pet: Gillu (baby squirrel saved from crows). Lifespan: ~2 years.",
      "✅ Favorite food: Kaju. Final resting place: Under the Sonjuhi creeper.",
    ],
  },

  // 4. What is Wrong with Indian Films?
  "bseb-english:ch-bseb-p4:films-critique-hollywood": {
    topic: "Satyajit Ray's Critique of Indian Cinema",
    chapter: "What is Wrong with Indian Films?",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "An analytical essay by legendary Oscar-winning filmmaker Satyajit Ray examining why India's massive film production historically struggled to attain artistic international distinction.",
    keyPoints: [
      "India stands as one of the world's largest film producers in sheer output, yet Ray laments that quantity has failed to translate into quality.",
      "Core Flaw: Indian filmmakers fall victim to slavish, unthinking imitation of American Hollywood cinema, using flashy camera angles, gloss, and jazz rhythms alien to Indian ethos.",
      "Unreal Stereotypes: Stories tend to revolve around melodramatic coincidences, exaggerated heroism, and synthetic song-and-dance numbers rather than genuine social reality.",
      "Ray argues that India possesses immense dramatic folklore, classical music, literature, and living street life that could provide rich indigenous raw material.",
      "Visual Simplicity: Cinema's ultimate power lies not in elaborate sets and loud background orchestrations, but in visual truth, subtle camera movement, and emotional restraint.",
      "Call for Reform: Indian cinema must discover its own authentic idiom grounded in the daily rhythms, joys, and struggles of ordinary Indian people.",
    ],
    examples: [
      "Hollywood Imitation: Copying American western musical tropes in rural Indian village drama.",
      "Visual Purity: Ray's own cinematic style (e.g., Pather Panchali) prioritizing natural scenery, silence, and facial nuance over artificial studio bombast.",
    ],
    commonMistakes: [
      "Thinking Ray hates Hollywood: Ray admires Hollywood masters like John Ford; he criticizes bad Indian *copies* of Hollywood formulas.",
      "Forgetting Ray's background: Satyajit Ray was an internationally acclaimed director, composer, and illustrator.",
    ],
    examKeywords: [
      "Satyajit Ray",
      "Indian films",
      "Hollywood imitation",
      "Visual purity",
      "Quantity vs quality",
      "Melodrama",
      "Indigenous storytelling",
    ],
    quickRevision: [
      "✅ Author: Satyajit Ray (Oscar-winning director of Apu Trilogy).",
      "✅ Primary defect of Indian cinema: Superficial imitation of American Hollywood conventions.",
      "✅ Solution: Authentic storytelling rooted in Indian reality with visual simplicity and restraint.",
    ],
  },

  // 5. Acceptance Speech
  "bseb-english:ch-bseb-p5:speech-suu-kyi-struggle": {
    topic: "Nobel Acceptance Speech for Burmese Freedom",
    chapter: "Acceptance Speech",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "The Nobel Peace Prize acceptance speech delivered on December 10, 1991 in Oslo, Norway, by Alexander Aris on behalf of his incarcerated mother, Aung San Suu Kyi of Burma (Myanmar).",
    keyPoints: [
      "Aung San Suu Kyi was awarded the 1991 Nobel Peace Prize for her steadfast non-violent campaign for democracy and human rights against the military dictatorship in Burma.",
      "Because Suu Kyi was held under strict house arrest in Rangoon, her 18-year-old son Alexander Aris accepted the honor on her behalf in Oslo.",
      "Alexander declares that the prestigious prize belongs not to his mother individually, but to all the people of Burma who sacrificed their lives and liberties for freedom.",
      "The speech pays tribute to Buddhist monks who marched peacefully, university students tortured in prisons, and remote ethnic tribes suffering violence.",
      "Core Philosophical Message: Peace and freedom are indivisible; as long as oppression suffocates any segment of humanity, world peace remains incomplete.",
      "The award transformed Suu Kyi's solitary struggle into a recognized international crusade for human dignity.",
    ],
    examples: [
      "Oslo Ceremony: An 18-year-old son standing before world dignitaries reading his imprisoned mother's heartfelt dedication.",
      "Non-Violent Resistance: Drawing inspiration from Mahatma Gandhi and Martin Luther King Jr.",
    ],
    commonMistakes: [
      "Writing that Aung San Suu Kyi delivered the speech herself in Oslo — she was under house arrest; her son Alexander Aris delivered it.",
      "Confusing the year: 1991 is the official year of her Nobel Peace Prize.",
    ],
    examKeywords: [
      "Aung San Suu Kyi",
      "Alexander Aris",
      "Nobel Peace Prize 1991",
      "Oslo, Norway",
      "Burma (Myanmar)",
      "Non-violence",
      "Democracy",
    ],
    quickRevision: [
      "✅ Recipient: Aung San Suu Kyi (Burma); Delivered by: Her son Alexander Aris.",
      "✅ Date & Venue: December 10, 1991 in Oslo, Norway.",
      "✅ Purpose: Dedicating the prize to Burmese monks, students, and citizens fighting tyranny.",
    ],
  },

  // 6. Once Upon a Time
  "bseb-english:ch-bseb-p6:once-parable-bird": {
    topic: "Toni Morrison: The Parable of the Bird & Living Language",
    chapter: "Once Upon a Time",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "Toni Morrison's luminous 1993 Nobel Lecture in Literature featuring a traditional folklore parable to illuminate the immense ethical power and vulnerability of human language.",
    keyPoints: [
      "The story centers on an old, blind, wise African-American woman, the daughter of slaves, living in a secluded cabin on the outskirts of town.",
      "She is visited by mischievous young people seeking to ridicule her legendary insight.",
      "One youth asks: 'Old woman, I hold in my hand a bird. Tell me whether it is living or dead.'",
      "If she answers it is dead, the boy can open his hand and let it fly; if she says it is alive, he can crush it to death in his fist.",
      "The woman's timeless response: 'I don't know whether the bird you're holding is dead or alive, but what I do know is that it is in your hands.'",
      "Morrison interprets the bird as 'language' and the woman as an experienced, practicing writer.",
      "Oppressive language is dangerous: it silences dialogue, justifies genocide, and degrades human intellect.",
      "Vital, living language bridges divides between generations, captures emotional truth, and creates mutual sanctuary.",
    ],
    examples: [
      "The Trapped Bird: Symbolizing the fragility of words, truth, and freedom in the custody of the young generation.",
      "Oppressive State Rhetoric: Language used to sanitize war and deny civil liberties.",
    ],
    commonMistakes: [
      "Taking the story literally about animal cruelty — the bird is a profound metaphor for language and responsibility.",
      "Forgetting Morrison's Nobel year: 1993 in Literature (she was the first African-American woman to win the Nobel in Literature).",
    ],
    examKeywords: [
      "Toni Morrison",
      "Nobel Lecture 1993",
      "Old blind woman",
      "Living or dead bird",
      "Responsibility of youth",
      "Oppressive language",
      "Metaphor of language",
    ],
    quickRevision: [
      "✅ Author: Toni Morrison (1993 Nobel laureate in Literature).",
      "✅ Parable: Blind wise old woman asked whether a bird in hand is alive or dead.",
      "✅ Symbolism: The bird represents language; its survival depends on how humans use it.",
    ],
  },

  // 7. The Unity of Indian Culture
  "bseb-english:ch-bseb-p7:unity-culture-vs-civilization": {
    topic: "Culture, Civilization & Indian Continuity",
    chapter: "The Unity of Indian Culture",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A scholarly lecture by Humayun Kabir analyzing the core distinction between civilization and culture, emphasizing India's unique capacity for assimilation and unbroken cultural longevity.",
    keyPoints: [
      "Civilization vs Culture: Civilization refers to physical, mechanical, and socio-economic organization (roads, buildings, governments). Culture is the inward refinement of spirit, morality, intellect, and aesthetics.",
      "Civilization is the outer container; culture is the precious inner content.",
      "Ancient civilizations like Greece, Babylon, Egypt, and Rome crumbled and vanished beneath historical conquests.",
      "India is unique: despite successive invasions by Aryans, Scythians, Greeks, Huns, Turks, and Afghans, Indian culture never broke its continuity.",
      "The secret of India's resilience is 'Unity in Diversity' and the capacity to synthesize and absorb diverse philosophical streams without enforcing dull uniformity.",
      "Indian culture represents a confluence of traditions, where difference is tolerated and integrated into a harmonious broader civilization.",
    ],
    examples: [
      "Faded Empires: Ancient Egypt and Rome exist today only in museum ruins, while Indian Vedic, Buddhist, and folk traditions thrive actively in daily life.",
      "Assimilation: Invaders who entered India eventually adopted Indian philosophies and became an organic part of its cultural tapestry.",
    ],
    commonMistakes: [
      "Treating culture and civilization as identical synonyms — Kabir clearly distinguishes civilization as external physical setup and culture as internal spiritual refinement.",
      "Believing unity implies uniformity — Kabir insists India's unity lies in harmonizing multiplicity.",
    ],
    examKeywords: [
      "Humayun Kabir",
      "Culture vs Civilization",
      "Unity in Diversity",
      "Continuous vitality",
      "Assimilation",
      "5,000 years continuity",
    ],
    quickRevision: [
      "✅ Author: Humayun Kabir (distinguished academic and former Indian Minister).",
      "✅ Key distinction: Civilization is outward physical organization; culture is inward spiritual refinement.",
      "✅ India's hallmark: Unbroken cultural continuity through absorption and synthesis.",
    ],
  },

  // 8. Little Girls Wiser Than Men
  "bseb-english:ch-bseb-p8:girls-muddy-puddle": {
    topic: "Leo Tolstoy: Children's Innocence & Adult Folly",
    chapter: "Little Girls Wiser Than Men",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A moral short story by Count Leo Tolstoy contrasting the spontaneous forgiveness of little children with the stubborn vindictiveness and destructive ego of adults.",
    keyPoints: [
      "Setting: A Russian village lane on a bright Easter Sunday where melting snow has formed a large muddy pool between farmyards.",
      "Protagonists: Two young village girls, Akoulya (the older girl) and Malasha (the younger girl), dressed in festive, brand-new frocks.",
      "The Incident: The girls take off their boots to wade into the puddle. Malasha accidentally slaps the muddy water, splashing mud all over Akoulya's yellow frock.",
      "The Escalation: Akoulya cries, and her mother storms out, furiously striking Malasha across the neck. Malasha's mother rushes out screaming retaliatory insults.",
      "The Street Brawl: The dispute quickly draws fathers, grandmothers, and village men into a violent, shouting brawl, completely forgetting Easter's holy message.",
      "The Reconciliation: While adults are cursing and pushing one another, Akoulya washes her frock and chips away at the mud with a piece of wood to build a stream.",
      "Malasha joins her with a twig; both girls giggle happily as their toy woodchips sail down the water.",
      "Tolstoy's Moral: Akoulya's grandmother points out to the brawling crowd that the children have already forgiven each other and made peace, proving that little children are wiser than grown men.",
    ],
    examples: [
      "Easter Dresses: Yellow frock stained by water triggering disproportionate adult anger.",
      "Wooden Chip Channel: Akoulya and Malasha uniting to dig a canal while grown men fight.",
    ],
    commonMistakes: [
      "Confusing which girl was older: Akoulya was older; Malasha was younger.",
      "Confusing the festival: The story takes place on Easter Sunday, celebrating renewal and forgiveness.",
    ],
    examKeywords: [
      "Leo Tolstoy",
      "Akoulya & Malasha",
      "Easter Sunday",
      "Muddy puddle",
      "Yellow frock",
      "Adult brawl",
      "Innocence & forgiveness",
    ],
    quickRevision: [
      "✅ Author: Leo Tolstoy; Characters: Akoulya (older) and Malasha (younger).",
      "✅ Conflict: Mud splashes on Akoulya's frock, sparking a street brawl among parents.",
      "✅ Resolution: The girls make peace and play with toy boats, shaming the foolish adults.",
    ],
  },

  // POETRY
  "bseb-english:ch-bseb-po1:cowper-country-vs-town": {
    topic: "God Made the Country: Rural Virtue vs Urban Splendour",
    chapter: "God Made the Country",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "William Cowper's celebrated poem comparing the natural tranquility and moral purity of the English countryside with the noisy, artificial, and corrupt lifestyle of urban towns.",
    keyPoints: [
      "Opening Maxim: 'God made the country, and man made the town' — establishing nature as divine creation and cities as human contrivance.",
      "The countryside provides natural health and virtue, which are the only true gifts that can sweeten life's bitter labors.",
      "In towns, people possess luxury and wealth, but lack genuine peace, enduring continuous anxiety and moral degradation.",
      "Sensory Delights: The country offers fragrant groves, fresh morning breezes, and the sweet melodies of thrushes and nightingales.",
      "In cities, theatrical songs and rattling carriage wheels drown out birdsong, while glaring artificial lamps eclipse the soft glow of the moon and stars.",
    ],
    examples: [
      "Birdsong vs Theatrical Noise: The nightingale muting its voice because city clamor offends nature.",
      "Moonlight vs City Lamps: Urban electric lighting blinding citizens to the natural cosmos.",
    ],
    commonMistakes: [
      "Thinking Cowper wrote during modern industrial smog: Cowper was an 18th-century pre-Romantic English poet witnessing early urbanization.",
    ],
    examKeywords: [
      "William Cowper",
      "God made the country",
      "Man made the town",
      "Rustic peace",
      "Nightingale",
      "Artificial lights",
    ],
    quickRevision: [
      "✅ Poet: William Cowper (18th century).",
      "✅ Theme: Divinity and health in rural country vs artificiality and moral decay in town.",
      "✅ Famous line: 'God made the country, and man made the town.'",
    ],
  },
  "bseb-english:ch-bseb-po2:pope-happy-solitude": {
    topic: "Ode on Solitude: The Blessed Unseen Life",
    chapter: "Ode on Solitude",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "Alexander Pope's early poetic masterpiece written at age 12, meditating on the virtues of a self-sufficient, peaceful, and secluded life away from worldly ambitions.",
    keyPoints: [
      "The happy man is one whose ambitions are confined to a few inherited acres of native soil.",
      "Self-Sufficiency: His herds provide milk, his wheat fields give bread, his sheep provide wool for clothes, and his own trees provide summer shade and winter firewood.",
      "A blessed life enjoys health of body, peace of mind, quiet daytime hours, and undisturbed nightly sleep.",
      "Pope blends leisure with thoughtful study, meditation, and pure innocence.",
      "Final Testament: The poet desires to live unobserved and unnoticed, and to die unlamented without a single tombstone marking where he is buried.",
    ],
    examples: [
      "Paternal Acres: Contentment with family land rather than seeking royal honors or imperial conquests.",
      "Unlamented Passing: Wishing to depart the world silently like a gentle breeze.",
    ],
    commonMistakes: [
      "Assuming Pope wrote this as an old hermit: Alexander Pope composed this poem when he was barely 12 years old.",
    ],
    examKeywords: [
      "Alexander Pope",
      "Ode on Solitude",
      "Paternal acres",
      "Self-sufficiency",
      "Unseen, unknown",
      "Unlamented death",
    ],
    quickRevision: [
      "✅ Poet: Alexander Pope (written at age 12).",
      "✅ Ideal: A quiet life supported by one's own paternal land and herds.",
      "✅ Ultimate wish: Live unseen, die peacefully without a stone telling where he lies.",
    ],
  },
  "bseb-english:ch-bseb-po3:poly-hazard-grief": {
    topic: "Polythene Bag: Environmental Ruin & Buried Heartache",
    chapter: "Polythene Bag",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A striking contemporary poem by Durga Prasad Panda drawing an extended metaphor between the non-biodegradable nature of plastic waste and unhealed emotional sorrow buried inside human hearts.",
    keyPoints: [
      "Polythene is indestructible: When touched it emits a high-pitched squeak; when exposed to flame it melts, giving off suffocating, pungent stench.",
      "If left buried underground, it refuses to decay, choking earth's fertility and releasing microscopic toxins.",
      "Metaphor: Panda connects this physical blight with personal sorrow and anguish hidden deep within the heart.",
      "Just like plastic buried in soil, suppressed grief does not vanish with time; it quietly smolders, corrupting emotional peace and happiness.",
    ],
    examples: [
      "Pungent Smell: Burning polythene emitting poisonous black smoke likened to bitter anger.",
      "Buried Bag: Plastic surviving decades underground just like unaddressed emotional trauma.",
    ],
    commonMistakes: [
      "Viewing the poem as solely a technical environmental essay — it is equally a meditation on human emotional pain.",
    ],
    examKeywords: [
      "Durga Prasad Panda",
      "Polythene bag",
      "Non-biodegradable",
      "Pungent fumes",
      "Buried grief",
      "Smoldering sorrow",
    ],
    quickRevision: [
      "✅ Poet: Durga Prasad Panda.",
      "✅ Physical properties: Squeaks on touch, stinks when burnt, never dissolves in soil.",
      "✅ Metaphor: Plastic pollution represents suppressed grief that never disintegrates.",
    ],
  },
  "bseb-english:ch-bseb-po4:vidya-radha-separation": {
    topic: "Thinner Than a Crescent: Radha's Love & Pangs of Separation",
    chapter: "Thinner Than a Crescent",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A devotional lyric by the celebrated Maithili poet Vidyapati portraying Radha's boundless love and heart-rending suffering during her separation from Lord Krishna.",
    keyPoints: [
      "Context: Lord Krishna has departed, leaving Radha in intense emotional desolation (Viraha).",
      "Radha's grief is so overwhelming that she weeps uninterruptedly; her friends say her stream of tears has carved a river on the earth.",
      "Radha sits motionless on the riverbank, lost in memories, confused and inconsolable.",
      "Her physical body deteriorates under the agony of yearning, losing weight rapidly.",
      "The Central Simile: Radha's distress has reduced her physical form until she has become 'thinner than a crescent in the sky'.",
      "Her desperate friends run to Krishna to convey her critical condition before her life slips away.",
    ],
    examples: [
      "River of Tears: Poetic hyperbole conveying the magnitude of spiritual devotion and grief.",
      "Crescent Moon Simile: Describing extreme physical emaciation caused by love-sickness.",
    ],
    commonMistakes: [
      "Confusing the poet's language and region: Vidyapati is the immortal master of Maithili literature from Mithila (Bihar).",
    ],
    examKeywords: [
      "Vidyapati",
      "Radha & Krishna",
      "Thinner than a crescent",
      "River of tears",
      "Viraha (separation)",
      "Mithila poetry",
    ],
    quickRevision: [
      "✅ Poet: Vidyapati (great classical poet of Mithila, Bihar).",
      "✅ Protagonist: Radha suffering agonizing separation from Krishna.",
      "✅ Famous image: Crying a river of tears; wasting away thinner than the crescent moon.",
    ],
  },
  "bseb-english:ch-bseb-po5:heart-greed-kalpataru": {
    topic: "The Empty Heart: Greed, The Wish-Tree & Destruction",
    chapter: "The Empty Heart",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "A cautionary moral poem by Tamil writer Periasamy Thooran illustrating how insatiable material greed devours human happiness and life.",
    keyPoints: [
      "A wealthy man, driven by discontent, seeks the celestial wish-granting tree known as Kalpataru.",
      "He prays for riches, and the generous tree grants him seven large silver vessels filled to the brim with gold coins.",
      "The Kalpataru also adds an eighth pitcher, but leaves it only half-filled with gold.",
      "This half-filled vessel becomes a spiritual curse: the man cannot sleep or rest until the eighth pitcher is brimful.",
      "He ceases to feed his children, denies food to himself, and desperately hoards every brass token, copper coin, and crumb.",
      "The struggle consumes him entirely: his health collapses and he dies with the pitcher still unfilled.",
      "Moral: Wealth cannot satisfy an empty heart; desire is a bottomless pit.",
    ],
    examples: [
      "Seven Full Vessels vs One Half Vessel: The tragic human flaw of ignoring abundance to obsess over an incomplete desire.",
      "Starving for Coins: The absurdity of dying wealthy while living in self-inflicted squalor.",
    ],
    commonMistakes: [
      "Thinking the man was originally poor — he was already wealthy, but spiritually bankrupt.",
      "Forgetting the name of the wish-fulfilling tree: Kalpataru.",
    ],
    examKeywords: [
      "Periasamy Thooran",
      "The Empty Heart",
      "Kalpataru (wish-tree)",
      "Seven pitchers of gold",
      "Half-filled eighth pitcher",
      "Insatiable greed",
    ],
    quickRevision: [
      "✅ Poet: Periasamy Thooran (Tamil writer).",
      "✅ Tale: A rich man receives 7 full pots of gold and 1 half-full pot from Kalpataru.",
      "✅ Lesson: Insatiable desire ruins peace; he dies starving trying to fill the final pot.",
    ],
  },

  // SUPPLEMENTARY READER
  "bseb-english:ch-bseb-sr1:jan-halku-winter-debt": {
    topic: "January Night (Poos Ki Raat): Debt, Cold & Peasant Fate",
    chapter: "January Night (Poos Ki Raat)",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "Munshi Premchand's timeless masterpiece portraying the harrowing plight of Halku, an impoverished tenant farmer battling landlord exploitation, bitter winter cold, and the despair of rural poverty.",
    keyPoints: [
      "Halku and his wife Munni have painstakingly scraped together three rupees to purchase a winter blanket (kamal).",
      "Landlord Sahna arrives demanding unpaid agricultural tax, threatening abuses. Halku pleads to spare the money, but gives in to protect his self-respect despite Munni's righteous protests.",
      "Munni declares that tenant farming is legalized bondage where peasants starve while landlords reap the reward.",
      "On a freezing January night (Poos), Halku huddles under a bamboo thatch in his sugarcane field with his faithful stray dog, Jabra.",
      "The chill is unbearable; Halku embraces Jabra, feeling a divine brotherhood that dissolves human prejudices of animal impurity.",
      "To ward off the biting frost, Halku gathers dry leaves from an adjacent mango grove and lights a warm bonfire.",
      "Nilgais (wild cattle) invade the field and begin voraciously devouring the crop. Jabra barks furiously and charges into the darkness.",
      "Halku, lulled by the comfort of the fire and paralyzed by the freezing wind, cannot force himself to get up.",
      "Next morning, Munni weeps over the flattened field and laments how they will pay rent now. Halku smiles with bitter irony: at least he will never have to spend winter nights in the open field again.",
    ],
    examples: [
      "The Three Rupees: The peasant's dilemma between physical survival (blanket) and social dignity (appeasing the landlord).",
      "The Mango Leaf Bonfire: An oasis of temporary warmth that numbs Halku's protective responsibility.",
      "The Irony of Defeat: Halku rejoicing at the loss of his livelihood because it relieves him of freezing nighttime labor.",
    ],
    commonMistakes: [
      "Misspelling characters' names: Halku, Munni, Jabra (dog), Sahna (landlord).",
      "Forgetting the amount saved for the blanket: exactly three rupees.",
      "Believing Halku fought off the nilgais — he was incapacitated by cold and inertia, allowing the crop to be destroyed.",
    ],
    examKeywords: [
      "Munshi Premchand",
      "Poos Ki Raat",
      "Halku & Munni",
      "Jabra (the dog)",
      "Three rupees",
      "Landlord Sahna",
      "Nilgais",
      "Mango grove bonfire",
    ],
    quickRevision: [
      "✅ Author: Munshi Premchand (master of Indian realism).",
      "✅ Characters: Halku, wife Munni, dog Jabra, landlord Sahna.",
      "✅ Tragedy: Three rupees surrendered to Sahna; cold prevents Halku from stopping nilgais, ruining his crop.",
    ],
  },
  "bseb-english:ch-bseb-sr2:quality-gessler-craft": {
    topic: "Quality: The Gessler Brothers & The Death of Craftsmanship",
    chapter: "Quality",
    subject: "English (Bihar Board - Panorama Part 2)",
    definition: "John Galsworthy's moving tribute to Mr. Gessler, a proud German master bootmaker in London who chose slow starvation over compromising his artistic standards in a mechanized commercial world.",
    keyPoints: [
      "Setting: A quiet shoemaker's shop in London's fashionable West End, marked only by the sign 'Gessler Brothers'.",
      "Craftsmanship as Art: Mr. Gessler considers shoemaking an art; his boots are handmade to perfection, fitting like skin without creaking and lasting an extraordinarily long time.",
      "Industrial Threat: Mass-production shoe firms flood the market with cheap, factory-made footwear supported by ubiquitous advertising campaigns.",
      "Gessler's sorrowful comment: 'Dey get id all by adverdisement, nod by work.'",
      "The shop loses customers as public taste shifts to flashy, disposable shoes. The older Gessler brother dies of sheer heartbreak after relinquishing half of their shop.",
      "The younger brother continues working relentlessly, putting every shilling into shop rent and high-grade leather, while denying himself basic meals.",
      "The End: The narrator returns to find the shop sold. An English shopman informs him that Mr. Gessler passed away from slow starvation.",
      "The story stands as an elegy for dedicated artisans crushed by the ruthless wheel of corporate industrialism.",
    ],
    examples: [
      "The Russian Leather Boots: Boots so exceptionally crafted that they seemed endowed with immortality.",
      "The German Accent: Gessler's phonetic dialogue capturing his passion and foreign simplicity.",
    ],
    commonMistakes: [
      "Thinking Gessler died of an infectious disease: Gessler died of self-inflicted slow starvation ('slow starvation, the doctor called it').",
      "Forgetting the author: John Galsworthy was an English novelist and Nobel laureate in Literature.",
    ],
    examKeywords: [
      "John Galsworthy",
      "Mr. Gessler",
      "Quality boots",
      "Craftsmanship vs Advertising",
      "Slow starvation",
      "West End London",
    ],
    quickRevision: [
      "✅ Author: John Galsworthy (English Nobel laureate).",
      "✅ Protagonist: Mr. Gessler (German master bootmaker in London).",
      "✅ Climax: Gessler starves to death, refusing to compromise quality for commercial competition.",
    ],
  },
};

export const BSEB_FLASHCARDS: Record<string, Flashcard[]> = {
  "bseb-english:ch-bseb-p1:pace-agony-merchant": [
    {
      front: "Who wrote the essay 'The Pace for Living' and where did he watch the play?",
      back: "R.C. Hutchinson wrote it; he watched the play in Dublin, Ireland.",
    },
    {
      front: "Who is the chief character in the Dublin play in 'The Pace for Living'?",
      back: "An elderly Irish corn merchant with many worries: a deceitful nephew and a wife who spent £10 on a holiday.",
    },
    {
      front: "What was the corn merchant's agonizing cry about modern speed?",
      back: "'They tell me there's an aeroplane now that goes at 1,000 miles an hour... Now that's too fast!'",
    },
    {
      front: "To which tribe of thinkers does author R.C. Hutchinson confess he belongs?",
      back: "The tribe of 'slow thinkers' who are disadvantaged in competitive commercial life.",
    },
    {
      front: "Why does the author fail to follow cinema plots without his wife's help?",
      back: "Because modern films cut rapidly between scenes, and the three leading blonde actresses look virtually identical to his slow-moving mind.",
    },
  ],
  "bseb-english:ch-bseb-p2:eco-jim-mission": [
    {
      front: "Who is the author of 'Me and the Ecology Bit' and who is the protagonist?",
      back: "Joan Lexau is the author; the narrator and protagonist is a young schoolboy named Jim.",
    },
    {
      front: "What is Jim's famous observation about people's attitude toward ecology?",
      back: "'Everybody is in favour of ecology, but nobody wants to do anything about it.'",
    },
    {
      front: "What does Jim advise Mr. Williams to do instead of burning leaves?",
      back: "Jim advises him to make a compost pile using leaves, grass, and food waste to enrich garden soil.",
    },
    {
      front: "What does Ms. Greene call Jim that annoys him, and what does she reprimand him for?",
      back: "She calls him 'Jimmy' and scolds him for throwing gum wrappers on her lawn.",
    },
    {
      front: "How does Jim's mother counter his advice about saving electricity?",
      back: "She points out that Jim keeps the television running 27 hours a day while lecturing her about using an electric kitchen mixer.",
    },
  ],
  "bseb-english:ch-bseb-p3:gillu-rescue-nurturing": [
    {
      front: "Who wrote 'Gillu' and what kind of animal was Gillu?",
      back: "Mahadevi Varma wrote it; Gillu was a tiny baby squirrel.",
    },
    {
      front: "How was Gillu injured when Mahadevi Varma discovered him?",
      back: "Two crows were viciously pecking at him in a game of 'Kakbhushundi' after he fell from his nest.",
    },
    {
      front: "What medicine was applied to Gillu's wounds and how was he fed initially?",
      back: "Penicillin ointment was applied; milk was fed drop-by-drop through a thin cotton wick.",
    },
    {
      front: "What was Gillu's favorite food and where did he live in the room?",
      back: "Cashew nuts (Kaju); he lived in a light wicker basket lined with cotton hanging near the window.",
    },
    {
      front: "What is the natural lifespan of a squirrel, and where was Gillu buried?",
      back: "Barely 2 years; Gillu was buried under the roots of the Sonjuhi creeper.",
    },
  ],
  "bseb-english:ch-bseb-p4:films-critique-hollywood": [
    {
      front: "Who is the author of 'What is Wrong with Indian Films?' and what is his legacy?",
      back: "Satyajit Ray, India's legendary Oscar-winning filmmaker and director of the Apu Trilogy.",
    },
    {
      front: "What is the primary flaw in Indian films highlighted by Satyajit Ray?",
      back: "Unthinking, slavish imitation of American Hollywood cinema, glossy sets, and foreign jazz conventions instead of authentic Indian reality.",
    },
    {
      front: "According to Ray, what does Indian cinema need more than anything else?",
      back: "Maturity, visual simplicity, and genuine stories rooted in the daily life and rich folk culture of India.",
    },
  ],
  "bseb-english:ch-bseb-p5:speech-suu-kyi-struggle": [
    {
      front: "When and where was Aung San Suu Kyi awarded the Nobel Peace Prize?",
      back: "December 10, 1991 in Oslo, Norway.",
    },
    {
      front: "Who delivered the Nobel Acceptance Speech on Suu Kyi's behalf and why?",
      back: "Her 18-year-old son, Alexander Aris, because Suu Kyi was held under house arrest by the Burmese military regime.",
    },
    {
      front: "To whom did Alexander Aris dedicate the 1991 Nobel Peace Prize?",
      back: "To all the courageous people of Burma, particularly the peaceful Buddhist monks, student martyrs, and political prisoners.",
    },
  ],
  "bseb-english:ch-bseb-p6:once-parable-bird": [
    {
      front: "Who delivered the Nobel lecture 'Once Upon a Time' and in which year?",
      back: "Toni Morrison in 1993, upon winning the Nobel Prize in Literature.",
    },
    {
      front: "What trick question did the young visitors ask the blind old woman?",
      back: "'Old woman, I hold in my hand a bird. Tell me whether it is living or dead?'",
    },
    {
      front: "What was the wise old woman's answer?",
      back: "'I do not know whether the bird you are holding is dead or alive, but what I do know is that it is in your hands.'",
    },
    {
      front: "What does the bird symbolize in Toni Morrison's discourse?",
      back: "Language—its vulnerability, power, and the ethical responsibility of human beings who hold it.",
    },
  ],
  "bseb-english:ch-bseb-p7:unity-culture-vs-civilization": [
    {
      front: "Who wrote 'The Unity of Indian Culture'?",
      back: "Humayun Kabir, prominent academician and former Indian Minister of Education.",
    },
    {
      front: "What is the key difference between civilization and culture according to Humayun Kabir?",
      back: "Civilization is the external material and social organization; culture is the internal spiritual and moral refinement of mind.",
    },
    {
      front: "What is the secret behind the 5,000-year unbroken continuity of Indian culture?",
      back: "Its remarkable capacity for synthesis, toleration, and assimilation of invading races without losing its foundational identity.",
    },
  ],
  "bseb-english:ch-bseb-p8:girls-muddy-puddle": [
    {
      front: "Who wrote 'Little Girls Wiser Than Men' and what are the names of the two girls?",
      back: "Count Leo Tolstoy; the girls are Akoulya (older) and Malasha (younger).",
    },
    {
      front: "On which religious festival is the story set and what caused the quarrel?",
      back: "Easter Sunday; Malasha accidentally splashed muddy puddle water on Akoulya's yellow frock.",
    },
    {
      front: "What were the girls doing while the village adults were violently brawling?",
      back: "They had reconciled and were happily digging a water channel to float wooden chips together.",
    },
  ],
  "bseb-english:ch-bseb-po1:cowper-country-vs-town": [
    {
      front: "Quote the famous opening line of William Cowper's poem.",
      back: "'God made the country, and man made the town.'",
    },
    {
      front: "What are the blessings unique to the countryside according to William Cowper?",
      back: "Health, virtue, birdsong, sweet groves, pure air, and quiet contentment.",
    },
  ],
  "bseb-english:ch-bseb-po2:pope-happy-solitude": [
    {
      front: "At what age did Alexander Pope write 'Ode on Solitude'?",
      back: "At the tender age of barely 12 years old.",
    },
    {
      front: "What is the final wish expressed by the poet in 'Ode on Solitude'?",
      back: "To live unseen, unknown, and to die quietly and unlamented without a tombstone marking his grave.",
    },
  ],
  "bseb-english:ch-bseb-po3:poly-hazard-grief": [
    {
      front: "Who wrote the poem 'Polythene Bag' and what is its core metaphor?",
      back: "Durga Prasad Panda; polythene's inability to decay represents unresolved grief buried inside human hearts.",
    },
  ],
  "bseb-english:ch-bseb-po4:vidya-radha-separation": [
    {
      front: "Who wrote 'Thinner Than a Crescent' and which dialect/region did he belong to?",
      back: "Vidyapati; he was the master poet of Maithili from Mithila, Bihar.",
    },
    {
      front: "Why has Radha become 'thinner than a crescent'?",
      back: "Due to deep sorrow and physical wasting caused by painful separation from Lord Krishna.",
    },
  ],
  "bseb-english:ch-bseb-po5:heart-greed-kalpataru": [
    {
      front: "Who is the poet of 'The Empty Heart' and what was the wish-tree called?",
      back: "Periasamy Thooran; the wishing tree was the celestial Kalpataru.",
    },
    {
      front: "How many full pots of gold did the tree give, and what ruined the man's peace?",
      back: "Seven full silver pitchers of gold; the half-filled eighth pitcher drove him mad with greed until he died.",
    },
  ],
  "bseb-english:ch-bseb-sr1:jan-halku-winter-debt": [
    {
      front: "Who wrote 'January Night' (Poos Ki Raat) and who are the four key characters?",
      back: "Munshi Premchand; Halku (peasant), Munni (wife), Jabra (dog), and Sahna (landlord).",
    },
    {
      front: "How much money had Halku saved for a blanket, and what happened to it?",
      back: "Three rupees; he surrendered it to landlord Sahna to pay off tax debts.",
    },
    {
      front: "What destroyed Halku's field on that bitter January night?",
      back: "A herd of nilgais (wild cattle) trampled and devoured his harvest while Halku lay numbed near his bonfire.",
    },
  ],
  "bseb-english:ch-bseb-sr2:quality-gessler-craft": [
    {
      front: "Who wrote 'Quality' and what was Mr. Gessler's profession?",
      back: "John Galsworthy; Mr. Gessler was a German master shoemaker in London.",
    },
    {
      front: "What did Mr. Gessler die of according to the English shopman?",
      back: "Slow starvation; he spent all his money on fine leather and rent, depriving himself of food.",
    },
  ],
};
