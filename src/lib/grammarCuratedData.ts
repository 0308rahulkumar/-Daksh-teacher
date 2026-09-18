import type { MindmapDoc, NoteDoc, Flashcard, GeneratedQuizQuestion } from "./types";

/**
 * Handcrafted Class 10 English Grammar & Hindi Grammar (हिंदी व्याकरण) Curated Material
 * Aligned with CBSE Class 10 Board & State Board / Bihar Board examination syllabi.
 */

export const GRAMMAR_MINDMAPS: Record<string, MindmapDoc> = {
  // ================= ENGLISH GRAMMAR =================
  "english-grammar:ch-eg-tenses:eg-present-past": {
    root: "Tenses: Present & Past Systems",
    nodes: [
      {
        label: "Present Tense Forms",
        detail: "Habitual, ongoing, and completed actions",
        children: [
          { label: "Simple Present: S + V1/V5 (Habitual, universal facts: 'Water boils at 100°C')" },
          { label: "Present Continuous: S + is/am/are + V4 (Ongoing: 'She is reading now')" },
          { label: "Present Perfect: S + has/have + V3 (Past action with present result: 'I have finished')" },
          { label: "Present Perfect Continuous: S + has/have + been + V4 + since/for" },
        ],
      },
      {
        label: "Past Tense Forms",
        detail: "Actions completed in the past",
        children: [
          { label: "Simple Past: S + V2 (Specific past time: 'I visited Agra yesterday')" },
          { label: "Past Continuous: S + was/were + V4 (Interrupted past action)" },
          { label: "Past Perfect: S + had + V3 (Earlier of two past events: 'Train had left before we arrived')" },
          { label: "Past Perfect Continuous: S + had + been + V4 (Duration before a past point)" },
        ],
      },
      {
        label: "Since vs For Rule",
        detail: "High-frequency board exam question point",
        children: [
          { label: "'Since' + Point of Time (since 2010, since 8 AM, since Monday, since morning)" },
          { label: "'For' + Period / Duration of Time (for 5 years, for two hours, for three days)" },
        ],
      },
      {
        label: "Board Exam Traps",
        detail: "Common errors in Class 10 board tests",
        children: [
          { label: "Do not use Present Perfect with specific past time adverbs (yesterday, ago, in 1947)" },
          { label: "Stative verbs (know, believe, love, smell) rarely take continuous -ing forms" },
        ],
      },
    ],
  },
  "english-grammar:ch-eg-concord:eg-agreement-rules": {
    root: "Subject-Verb Concord (Agreement)",
    nodes: [
      {
        label: "Fundamental Law",
        detail: "Singular Subject takes Singular Verb; Plural Subject takes Plural Verb",
        children: [
          { label: "The dog barks (Singular) vs The dogs bark (Plural)" },
          { label: "Remember: Verbs take -s/-es for singular, nouns take -s/-es for plural" },
        ],
      },
      {
        label: "Rule of Proximity",
        detail: "Either... or / Neither... nor / Not only... but also",
        children: [
          { label: "Verb agrees with the subject closest to it" },
          { label: "Neither the teacher nor the students WERE present" },
          { label: "Either my brothers or my sister IS coming" },
        ],
      },
      {
        label: "First Subject Priority",
        detail: "Connecting parenthetical expressions",
        children: [
          { label: "Connected by: as well as, along with, together with, with, accompanied by, in addition to" },
          { label: "Verb agrees strictly with the FIRST subject!" },
          { label: "The captain, as well as his soldiers, WAS awarded (Singular, matches captain)" },
        ],
      },
      {
        label: "Indefinite Pronouns & Tricky Nouns",
        detail: "Always singular in standard English",
        children: [
          { label: "Each, Every, Either, Neither, One of the + Plural Noun -> SINGULAR Verb" },
          { label: "One of the boys HAS lost his book (NOT have)" },
          { label: "News, Mathematics, Physics, Economics, Measles -> SINGULAR Verb" },
          { label: "A pair of scissors IS on the table vs The scissors ARE sharp" },
        ],
      },
    ],
  },
  "english-grammar:ch-eg-reported-speech:eg-direct-indirect-statements": {
    root: "Reported Speech (Direct & Indirect)",
    nodes: [
      {
        label: "Tense Backshift Rules",
        detail: "When reporting verb is in the Past tense (said / told)",
        children: [
          { label: "Simple Present (V1) -> Simple Past (V2)" },
          { label: "Present Continuous (is/am/are) -> Past Continuous (was/were)" },
          { label: "Present Perfect (has/have + V3) -> Past Perfect (had + V3)" },
          { label: "Simple Past (V2) -> Past Perfect (had + V3)" },
          { label: "Past Continuous (was/were) -> Past Perfect Continuous (had been + V4)" },
          { label: "Can -> Could, Will -> Would, May -> Might, Shall -> Should" },
        ],
      },
      {
        label: "Exceptions: No Backshift",
        detail: "When tense remains UNCHANGED",
        children: [
          { label: "Universal truths & scientific facts: 'The Earth revolves around the Sun'" },
          { label: "Habitual actions & historical truths" },
          { label: "If reporting verb is in Present or Future: 'He says', 'She will say'" },
        ],
      },
      {
        label: "Adverbial & Pronoun Changes",
        detail: "Distance in time and place",
        children: [
          { label: "Now -> Then; Today -> That day; Yesterday -> The day before / previous day" },
          { label: "Tomorrow -> The next day / following day; Here -> There; This -> That" },
          { label: "Pronouns change according to SON formula: Subject, Object, No change" },
        ],
      },
      {
        label: "Interrogative & Imperative Rules",
        detail: "Reporting questions and orders",
        children: [
          { label: "Yes/No questions: Use 'if' or 'whether', invert question to statement order" },
          { label: "Wh- questions: Retain the wh- word (who, where, why) as conjunction" },
          { label: "Commands/Requests: Reporting verb becomes ordered/requested/advised + to + V1" },
        ],
      },
    ],
  },
  "english-grammar:ch-eg-modals:eg-modal-functions": {
    root: "Modal Auxiliaries & Functions",
    nodes: [
      {
        label: "Ability & Permission",
        detail: "Can, Could, May",
        children: [
          { label: "Can: Present physical/mental ability ('I can swim') or informal permission" },
          { label: "Could: Past ability ('I could run fast in youth') or polite request ('Could you help me?')" },
          { label: "May: Formal permission ('May I come in?') or strong possibility ('It may rain today')" },
        ],
      },
      {
        label: "Obligation, Duty & Advice",
        detail: "Must, Ought to, Should",
        children: [
          { label: "Must: Strong compulsion / legal necessity ('You must wear a helmet')" },
          { label: "Ought to: Moral duty / civic obligation ('We ought to respect our elders')" },
          { label: "Should: Recommendation or general advice ('You should sleep 8 hours')" },
        ],
      },
      {
        label: "Possibility & Probability",
        detail: "Might, Must (deduction)",
        children: [
          { label: "Might: Weak or remote possibility ('He might come, but he is busy')" },
          { label: "Must: Logical deduction ('Lights are on; someone must be inside')" },
        ],
      },
    ],
  },
  "english-grammar:ch-eg-voice:eg-voice-transformations": {
    root: "Active & Passive Voice",
    nodes: [
      {
        label: "Core Structure & Formula",
        detail: "Subject and Object swap positions",
        children: [
          { label: "Active: Subject + Verb + Object" },
          { label: "Passive: Object + Auxiliary 'Be' (in same tense) + V3 (Past Participle) + by + Subject" },
          { label: "Example: 'She writes a letter' -> 'A letter IS WRITTEN by her'" },
        ],
      },
      {
        label: "Tense Conjugation of 'Be'",
        detail: "Always match the original tense with 'be' + V3",
        children: [
          { label: "Present Simple: is/am/are + V3" },
          { label: "Present Continuous: is/am/are + BEING + V3" },
          { label: "Present Perfect: has/have + BEEN + V3" },
          { label: "Past Simple: was/were + V3" },
          { label: "Past Continuous: was/were + BEING + V3" },
          { label: "Past Perfect: had + BEEN + V3" },
          { label: "Modals: Modal + BE + V3 ('can be done', 'must be solved')" },
        ],
      },
      {
        label: "Imperative Passives",
        detail: "Orders, requests, and advice",
        children: [
          { label: "Orders: 'Let + Object + be + V3' (e.g., 'Close the door' -> 'Let the door be closed')" },
          { label: "Advice: 'Object + should be + V3' (e.g., 'Help the poor' -> 'The poor should be helped')" },
          { label: "Requests: 'You are requested to + V1'" },
        ],
      },
    ],
  },

  // ================= HINDI GRAMMAR =================
  "hindi-grammar:ch-hg-padbandh:hg-padbandh-types": {
    root: "पदबंध (Phrase Types)",
    nodes: [
      {
        label: "पद vs पदबंध की परिभाषा",
        detail: "वाक्य में प्रयुक्त व्याकरणिक इकाई",
        children: [
          { label: "पद: वाक्य में प्रयुक्त होने वाला कोई एक सार्थक शब्द" },
          { label: "पदबंध: जब एक से अधिक पद मिलकर एक ही व्याकरणिक इकाई का कार्य करें" },
          { label: "पहचान नियम: रेखांकित अंश का अंतिम (शीर्ष) पद ही पदबंध का प्रकार तय करता है!" },
        ],
      },
      {
        label: "1. संज्ञा एवं सर्वनाम पदबंध",
        detail: "शीर्ष पद संज्ञा या सर्वनाम हो",
        children: [
          { label: "संज्ञा पदबंध: 'अयोध्या के राजा दशरथ' के चार पुत्र थे (शीर्ष: दशरथ = संज्ञा)" },
          { label: "सर्वनाम पदबंध: 'हमेशा दूसरों की मदद करने वाले आप' आज मौन हैं (शीर्ष: आप = सर्वनाम)" },
        ],
      },
      {
        label: "2. विशेषण पदबंध",
        detail: "संज्ञा या सर्वनाम की विशेषता बताने वाला पद समूह",
        children: [
          { label: "विशेषण पदबंध: 'बहुत परिश्रमी और ईमानदार' बालक कभी असफल नहीं होता" },
          { label: "नियम: यदि रेखांकित अंश संज्ञा से पहले समाप्त हो जाए तो विशेषण पदबंध होता है" },
        ],
      },
      {
        label: "3. क्रिया एवं क्रियाविशेषण पदबंध",
        detail: "क्रिया या क्रिया की विशेषता",
        children: [
          { label: "क्रिया पदबंध: वह खाना खाकर 'सो गया होगा' (मुख्य क्रिया + रंजक क्रियाएँ)" },
          { label: "क्रियाविशेषण पदबंध: वह 'बहुत धीमी गति से' चल रहा था (रीति/समय/स्थान सूचक)" },
        ],
      },
    ],
  },
  "hindi-grammar:ch-hg-vakya:hg-vakya-types-transform": {
    root: "रचना के आधार पर वाक्य रूपांतरण",
    nodes: [
      {
        label: "1. सरल वाक्य (Simple)",
        detail: "एक ही मुख्य उद्देश्य और एक ही समापिका क्रिया",
        children: [
          { label: "परिभाषा: जिसमें एक कर्ता और एक विधेय (मुख्य क्रिया) हो" },
          { label: "उदाहरण: 'प्रातःकाल होते ही पक्षी चहचहाने लगे'" },
          { label: "उदाहरण: 'परिश्रमी बालक परीक्षा में अवश्य उत्तीर्ण होते हैं'" },
        ],
      },
      {
        label: "2. संयुक्त वाक्य (Compound)",
        detail: "दो या दो से अधिक स्वतंत्र उपवाक्य समानाधिकरण योजक से जुड़े",
        children: [
          { label: "योजक शब्द: और, तथा, एवं, या, अथवा, किन्तु, परन्तु, लेकिन, इसलिए, अतः" },
          { label: "पहचान: यदि योजक हटा दें, तो दोनों उपवाक्य स्वतंत्र अर्थ देंगे" },
          { label: "उदाहरण: 'प्रातःकाल हुआ और पक्षी चहचहाने लगे'" },
        ],
      },
      {
        label: "3. मिश्र वाक्य (Complex)",
        detail: "एक प्रधान उपवाक्य और उस पर आश्रित एक या अधिक उपवाक्य",
        children: [
          { label: "व्यधिकरण योजक: कि, जो-वह, जिसने, जैसा-वैसा, जब-तब, यदि-तो, क्योंकि" },
          { label: "उदाहरण: 'जैसे ही प्रातःकाल हुआ, वैसे ही पक्षी चहचहाने लगे'" },
          { label: "संज्ञा आश्रित उपवाक्य: 'कि' से शुरू ('गांधीजी ने कहा कि अहिंसा परमो धर्मः है')" },
          { label: "विशेषण आश्रित उपवाक्य: 'जो/जिसने' से शुरू ('जो लड़का कल आया था, वह बीमार है')" },
          { label: "क्रियाविशेषण आश्रित उपवाक्य: जब, जहाँ, जैसे, क्योंकि, यदि से शुरू" },
        ],
      },
    ],
  },
  "hindi-grammar:ch-hg-samas:hg-samas-all-types": {
    root: "समास एवं समास-विग्रह",
    nodes: [
      {
        label: "1. तत्पुरुष व कर्मधारय",
        detail: "उत्तरपद प्रधान समास",
        children: [
          { label: "तत्पुरुष: कारक चिह्न लुप्त ('राजपुत्र' = राजा का पुत्र, 'देशभक्ति' = देश के लिए भक्ति)" },
          { label: "कर्मधारय: विशेषण-विशेष्य या उपमेय-उपमान ('नीलकमल' = नीला है जो कमल; 'चंद्रमुख' = चंद्र के समान मुख)" },
        ],
      },
      {
        label: "2. द्विगु व द्वंद्व समास",
        detail: "संख्या और जोड़े वाले समास",
        children: [
          { label: "द्विगु: पूर्वपद संख्यावाचक विशेषण ('त्रिफला' = तीन फलों का समूह; 'चौराहा' = चार राहों का समाहार)" },
          { label: "द्वंद्व: दोनों पद प्रधान, योजक लुप्त ('माता-पिता' = माता और पिता; 'दिन-रात' = दिन और रात)" },
        ],
      },
      {
        label: "3. बहुव्रीहि व अव्ययीभाव",
        detail: "अन्य पद प्रधान व अव्यय पद",
        children: [
          { label: "बहुव्रीहि: दोनों पद अप्रधान, अन्य पद प्रधान ('पीतांबर' = पीला है अंबर जिसका अर्थात् श्रीकृष्ण)" },
          { label: "अव्ययीभाव: पहला पद अव्यय/उपसर्ग, समस्त पद अव्यय ('यथाशक्ति' = शक्ति के अनुसार; 'प्रतिदिन' = प्रत्येक दिन)" },
        ],
      },
    ],
  },
  "hindi-grammar:ch-hg-vachya:hg-vachya-types-transform": {
    root: "वाच्य एवं वाच्य परिवर्तन",
    nodes: [
      {
        label: "1. कर्तृवाच्य (Active)",
        detail: "कर्ता की प्रधानता",
        children: [
          { label: "क्रिया का लिंग, वचन और पुरुष कर्ता के अनुसार बदलता है" },
          { label: "सकर्मक और अकर्मक दोनों क्रियाएँ हो सकती हैं" },
          { label: "उदाहरण: 'लड़का पुस्तक पढ़ता है' / 'लड़की पुस्तक पढ़ती है'" },
        ],
      },
      {
        label: "2. कर्मवाच्य (Passive)",
        detail: "कर्म की प्रधानता (केवल सकर्मक क्रिया)",
        children: [
          { label: "कर्ता के साथ 'से' या 'के द्वारा' जोड़ा जाता है" },
          { label: "क्रिया का लिंग-वचन कर्म के अनुसार होता है" },
          { label: "उदाहरण: 'लड़के के द्वारा पुस्तक पढ़ी जाती है' (पुस्तक स्त्रीलिंग -> पढ़ी जाती है)" },
        ],
      },
      {
        label: "3. भाववाच्य (Impersonal)",
        detail: "भाव/क्रिया की प्रधानता (केवल अकर्मक क्रिया)",
        children: [
          { label: "क्रिया सदैव अन्य पुरुष, पुल्लिंग और एकवचन में रहती है" },
          { label: "प्रायः असमर्थता या विवशता प्रकट करने के लिए प्रयोग होता है" },
          { label: "उदाहरण: 'रोगी से बैठा नहीं जाता' / 'हमसे इतनी धूप में चला नहीं जाता'" },
        ],
      },
    ],
  },
  "hindi-grammar:ch-hg-alankar:hg-shabdalankar-arthalankar": {
    root: "अलंकार (काव्य सौंदर्य)",
    nodes: [
      {
        label: "शब्दालंकार (शब्द चमत्कार)",
        detail: "ध्वनि और शब्दों की सुंदरता",
        children: [
          { label: "अनुप्रास: वर्ण की आवृत्ति ('चारु चंद्र की चंचल किरणें', 'तरनि तनूजा तट तमाल')" },
          { label: "यमक: एक शब्द एक से अधिक बार भिन्न अर्थ में ('कनक कनक ते सौ गुनी' - सोना vs धतूरा)" },
          { label: "श्लेष: एक शब्द के अनेक अर्थ ('रहिमन पानी राखिए, बिन पानी सब सून' - चमक, प्रतिष्ठा, जल)" },
        ],
      },
      {
        label: "अर्थालंकार (अर्थ चमत्कार)",
        detail: "भाव और अर्थ की सुंदरता",
        children: [
          { label: "उपमा: समानता (वाचक शब्द: सा, सी, से, सम, सरिस) - 'पीपर पात सरिस मन डोला'" },
          { label: "रूपक: उपमेय पर उपमान का अभेद आरोप - 'चरण कमल बंदौ हरिराई'" },
          { label: "उत्प्रेक्षा: संभावना (वाचक शब्द: मानो, मनु, जानो, जनु) - 'सिर फट गया उसका वहीं, मानो अरुण रंग का घड़ा हो'" },
          { label: "अतिशयोक्ति: बढ़ा-चढ़ाकर वर्णन - 'हनुमान की पूंछ में लगन न पाई आग, लंका सिगरी जल गई'" },
          { label: "मानवीकरण: जड़ प्रकृति पर मानवीय चेष्टाओं का आरोप - 'मेघ आए बड़े बन-ठन के सँवर के'" },
        ],
      },
    ],
  },
};

export const GRAMMAR_NOTES: Record<string, NoteDoc> = {
  // ================= ENGLISH GRAMMAR =================
  "english-grammar:ch-eg-tenses:eg-present-past": {
    topic: "Present & Past Tenses: Rules, Structures & Board Traps",
    chapter: "Tenses & Time",
    subject: "English Grammar",
    definition: "Tense indicates the time of an action (Present, Past, Future) and its aspect of completion (Simple, Continuous, Perfect, Perfect Continuous). Mastering verb conjugations is the bedrock of Class 10 editing and gap-filling.",
    keyPoints: [
      "Simple Present: Subject + V1 / V5 (with he/she/it). Used for universal truths, scientific facts, and regular habits.",
      "Present Continuous: Subject + is/am/are + V4 (-ing). Used for actions happening at the moment of speech.",
      "Present Perfect: Subject + has/have + V3. Links a past action to the present moment. NEVER use with past time markers like 'yesterday' or 'in 1999'.",
      "Present Perfect Continuous: Subject + has/have + been + V4 + since/for. Action started in past and still ongoing.",
      "Simple Past: Subject + V2. Mandatory whenever past time words (ago, yesterday, last week, in 2020) are mentioned.",
      "Past Perfect: Subject + had + V3. Used when TWO past actions occur, to indicate which action happened FIRST ('The patient had died before the doctor arrived').",
    ],
    formulas: [
      "Present Perfect = S + has/have + V3",
      "Past Perfect = S + had + V3 (First Action) + before + S + V2 (Second Action)",
      "Since = Point of time (since Monday, since 5 PM, since childhood)",
      "For = Duration/period of time (for 3 days, for ten years, for a long time)",
    ],
    differences: [
      {
        label: "Present Perfect vs Simple Past",
        a: "Present Perfect: Past action with ongoing relevance; no specific past time allowed ('I have visited London').",
        b: "Simple Past: Action completed at a specific historical point in the past ('I visited London in 2018').",
      },
    ],
    examples: [
      "Incorrect: 'I have seen him yesterday.' -> Correct: 'I saw him yesterday.' (Simple Past required with 'yesterday').",
      "Board Question: 'By the time the fire brigade arrived, the fire _____ (destroy) the warehouse.' -> Answer: 'had destroyed'.",
      "Since/For: 'He has been studying here FOR five years' vs 'He has been studying here SINCE 2019'.",
    ],
    commonMistakes: [
      "Using 'since' with periods of time (e.g. saying 'since three years' instead of 'for three years').",
      "Using Present Perfect with definite past time markers (e.g. 'She has passed the exam last year' -> 'She passed...').",
      "Confusing Stative verbs in continuous tense (e.g. 'I am understanding the lesson' -> 'I understand the lesson').",
    ],
    examKeywords: [
      "Simple Past vs Present Perfect",
      "Past Perfect for earlier action",
      "Since vs For",
      "CBSE Editing Passages",
      "Subject-Verb Agreement",
    ],
    quickRevision: [
      "✅ Formula: Past Perfect (had + V3) for the 1st action; Simple Past (V2) for the 2nd action.",
      "✅ Rule: Since = Starting point of time; For = Total duration of time.",
      "✅ Rule: Specific past time adverbs (yesterday, ago) strictly require V2 (Simple Past).",
    ],
  },
  "english-grammar:ch-eg-concord:eg-agreement-rules": {
    topic: "Subject-Verb Concord: Golden Rules & Exception Catalog",
    chapter: "Subject-Verb Concord",
    subject: "English Grammar",
    definition: "Subject-Verb Concord dictates that a verb must agree with its grammatical subject in number (singular or plural) and person. In Class 10 board exams, questions test proximity, collective nouns, and correlative conjunctions.",
    keyPoints: [
      "Golden Principle: Singular subjects take singular verbs ('The train arrives'); plural subjects take plural verbs ('The trains arrive').",
      "Proximity Rule: In 'Either... or', 'Neither... nor', 'Not only... but also', the verb agrees strictly with the CLOSEST subject.",
      "First Subject Rule: When subjects are joined by 'as well as', 'along with', 'with', 'together with', 'in addition to', the verb agrees strictly with the FIRST subject.",
      "Distributive Pronouns: 'Each', 'Every', 'Either of', 'Neither of', 'One of the' are grammatically singular and take SINGULAR verbs.",
      "Apparent Plurals: Words like 'Mathematics', 'Physics', 'News', 'Economics', 'Gulliver's Travels' look plural but are singular concepts and take singular verbs.",
      "Quantities & Measurements: Sums of money, periods of time, and distances considered as a single unit take singular verbs ('Ten kilometers is a long walk').",
    ],
    formulas: [
      "Subject 1 + as well as + Subject 2 -> Verb agrees with Subject 1",
      "Either S1 or S2 / Neither S1 nor S2 -> Verb agrees with S2 (Proximity)",
      "One of the + Plural Noun + Singular Verb (e.g., 'One of the girls is absent')",
    ],
    differences: [
      {
        label: "As Well As vs And",
        a: "And: Joins two subjects to form a compound plural ('Ravi and Suresh are coming').",
        b: "As Well As: A parenthetical prepositional phrase; verb follows the first subject ('Ravi, as well as his friends, is coming').",
      },
    ],
    examples: [
      "'Neither the teacher nor the students WERE present in the lab.' (Students is plural and closer).",
      "'The Prime Minister, along with his cabinet ministers, HAS departed for Paris.' (Agrees with Prime Minister).",
      "'Bread and butter IS his favorite breakfast.' (Treated as a single unified dish).",
      "'One of my friends IS a pilot.' (One = singular).",
    ],
    commonMistakes: [
      "Matching the verb to the nearest plural noun inside a prepositional phrase (e.g., 'The quality of these mangoes ARE good' -> FALSE! 'Quality' is singular, so 'IS good').",
      "Using plural verbs after 'Each' or 'Everyone' (e.g. 'Everyone are ready' -> FALSE! 'Everyone is ready').",
    ],
    examKeywords: [
      "Rule of Proximity",
      "As well as / Along with",
      "One of the + Plural Noun",
      "Collective Nouns",
      "Distributive Pronouns",
    ],
    quickRevision: [
      "✅ Rule of Proximity: 'Neither A nor B' -> Verb matches B.",
      "✅ Rule of First Subject: 'A as well as B' -> Verb matches A.",
      "✅ Rule of 'One of the': 'One of the [Plural Noun]' strictly takes a SINGULAR verb.",
    ],
  },
  "english-grammar:ch-eg-reported-speech:eg-direct-indirect-statements": {
    topic: "Reported Speech: Transformation Mechanics & Backshift",
    chapter: "Reported Speech",
    subject: "English Grammar",
    definition: "Reported Speech (Indirect Speech) conveys the message of a speaker without using the exact spoken words. In Class 10 board dialog completion exercises, it requires simultaneous manipulation of tenses, pronouns, and time/place adverbs.",
    keyPoints: [
      "Reporting Verb: 'said to' changes to 'told' + object. 'said' remains 'said'. Conjunction 'that' connects reporting clause to indirect clause.",
      "Tense Backshift: Simple Present -> Simple Past; Present Continuous -> Past Continuous; Present Perfect -> Past Perfect; Simple Past -> Past Perfect.",
      "Exception: Universal truths and permanent scientific realities NEVER shift tense ('The teacher said that the sun is a star').",
      "Yes/No Questions: The reporting verb changes to 'asked/inquired'; conjunction is 'if' or 'whether'; sentence word order shifts from question to statement (Subject + Verb).",
      "Wh- Questions: Reporting verb becomes 'asked'; retain the Wh- word (what, where, why) as conjunction; do NOT insert 'that'.",
      "Imperatives: Reporting verb changes to 'ordered', 'requested', 'advised', followed by 'to + V1' (or 'not to + V1' for negatives).",
    ],
    formulas: [
      "Direct: S + said to + O, 'Statement' -> Indirect: S + told + O + that + shifted statement",
      "Direct: S + said, 'Do you like tea?' -> Indirect: S + asked + if/whether + I liked tea",
      "Time shifts: Now -> Then | Today -> That day | Yesterday -> The previous day | Tomorrow -> The next day",
    ],
    examples: [
      "Direct: He said, 'I am working hard.' -> Indirect: He said that he was working hard.",
      "Direct: She said to me, 'Where do you live?' -> Indirect: She asked me where I lived.",
      "Direct: Doctor said to patient, 'Take this medicine daily.' -> Indirect: The doctor advised the patient to take that medicine daily.",
    ],
    commonMistakes: [
      "Retaining question order in indirect speech (e.g. writing 'He asked me where did I live' instead of 'He asked me where I lived').",
      "Using 'that' along with Wh- words (e.g. 'He asked that where I was going' -> FALSE!).",
      "Changing the tense of universal truths (e.g. 'The teacher said that the earth was round' -> FALSE! 'is round').",
    ],
    examKeywords: [
      "Tense Backshift Table",
      "Pronoun Shifts (SON Rule)",
      "Adverbs of Time & Place",
      "Reporting Questions with If/Whether",
      "Imperatives with to + V1",
    ],
    quickRevision: [
      "✅ Rule: In reported questions, ALWAYS convert interrogative syntax back into statement syntax (Subject + Verb).",
      "✅ Rule: Never combine 'that' with 'if', 'whether', or Wh- question words.",
      "✅ Rule: Universal truths and scientific laws retain their present tense.",
    ],
  },

  // ================= HINDI GRAMMAR =================
  "hindi-grammar:ch-hg-padbandh:hg-padbandh-types": {
    topic: "पदबंध: भेद, सटीक पहचान एवं बोर्ड परीक्षा ट्रिक्स",
    chapter: "पदबंध (Phrase Types)",
    subject: "Hindi Grammar (हिंदी व्याकरण)",
    definition: "जब दो या दो से अधिक पद मिलकर एक व्याकरणिक इकाई (संज्ञा, सर्वनाम, विशेषण, क्रिया या क्रियाविशेषण) का कार्य करते हैं, तो उस बंधी हुई पद-इकाई को 'पदबंध' कहा जाता है।",
    keyPoints: [
      "पद vs पदबंध: एक अकेला शब्द वाक्य में प्रयुक्त होकर 'पद' कहलाता है। जब कई पद मिलकर एक इकाई बनें, तो वह 'पदबंध' होता है।",
      "पहचान का अचूक नियम (शीर्ष पद नियम): रेखांकित अंश का अंतिम पद (शीर्ष पद) जिस व्याकरणिक कोटि का होगा, पूरा पदबंध उसी भेद का कहलाएगा!",
      "संज्ञा पदबंध: रेखांकित अंश का अंतिम पद संज्ञा होता है (उदा. 'दशरथ-पुत्र राम' ने रावण को मारा -> शीर्ष पद 'राम' संज्ञा है)।",
      "सर्वनाम पदबंध: रेखांकित अंश का अंतिम पद सर्वनाम होता है (उदा. 'सबका भला चाहने वाले आप' क्यों मौन हैं? -> शीर्ष पद 'आप' सर्वनाम है)।",
      "विशेषण पदबंध: रेखांकित अंश किसी संज्ञा/सर्वनाम से पहले आकर उसकी विशेषता बताए (उदा. 'लोहे की जंजीरों से बँधा हुआ' शेर दहाड़ रहा था -> शेर की विशेषता)।",
      "क्रिया पदबंध: मुख्य क्रिया और उसकी सहायक/रंजक क्रियाएँ मिलकर क्रिया पदबंध बनाती हैं (उदा. 'बच्चा गेंद फेंककर भाग गया होगा')।",
      "क्रियाविशेषण (अव्यय) पदबंध: क्रिया के होने के समय, स्थान, रीति या परिमाण की विशेषता बताए (उदा. 'वह सुबह से शाम तक' पड़ता रहा)।",
    ],
    formulas: [
      "शीर्ष पद संज्ञा = संज्ञा पदबंध (जैसे: 'विदेश से आए अतिथि' आज लौटेंगे)",
      "शीर्ष पद सर्वनाम = सर्वनाम पदबंध (जैसे: 'सदा सच बोलने वाले तुम' आज डर गए)",
      "संज्ञा से ठीक पहले विशेषता का अंश = विशेषण पदबंध (जैसे: 'तेज गति से चलने वाली' रेलगाड़ी)",
      "मुख्य क्रिया + सहायक क्रियाएँ = क्रिया पदबंध (जैसे: 'खाता चला जा रहा है')",
    ],
    examples: [
      "संज्ञा पदबंध: 'चार ताकतवर मजदूर' उस भारी पत्थर को उठा पाए। (मजदूर = संज्ञा)",
      "सर्वनाम पदबंध: 'किस्मत का मारा मैं' कहाँ जाऊँ? (मैं = सर्वनाम)",
      "विशेषण पदबंध: 'नीले आकाश में उड़ते हुए' पक्षी सुंदर लग रहे हैं।",
      "क्रिया पदबंध: वह नदी में 'डूबता चला गया'।",
      "क्रियाविशेषण पदबंध: गाड़ी 'बहुत धीमी गति से' स्टेशन पहुँची।",
    ],
    commonMistakes: [
      "संज्ञा पदबंध और विशेषण पदबंध में भ्रम: यदि रेखांकित अंश में संज्ञा भी शामिल है ('घमंडी राजा'), तो संज्ञा पदबंध होगा। यदि केवल विशेषता रेखांकित है ('घमंडी' राजा), तो विशेषण पदबंध होगा।",
      "क्रिया और क्रियाविशेषण पदबंध का अंतर न समझना: क्रिया 'क्या हो रहा है' दर्शाती है; क्रियाविशेषण 'कैसे/कहाँ/कब' हो रहा है दर्शाती है।",
    ],
    examKeywords: [
      "शीर्ष पद नियम",
      "संज्ञा पदबंध",
      "विशेषण पदबंध",
      "क्रिया पदबंध",
      "क्रियाविशेषण पदबंध",
      "CBSE 4-अंक प्रश्न",
    ],
    quickRevision: [
      "✅ रेखांकित अंश का आख़िरी शब्द देखें: यदि संज्ञा है -> संज्ञा पदबंध; यदि सर्वनाम है -> सर्वनाम पदबंध।",
      "✅ यदि आख़िरी शब्द मुख्य क्रिया के साथ जुड़ा है -> क्रिया पदबंध।",
      "✅ यदि रेखांकित अंश 'कैसे/कब/कहाँ' का उत्तर दे रहा है -> क्रियाविशेषण पदबंध।",
    ],
  },
  "hindi-grammar:ch-hg-vakya:hg-vakya-types-transform": {
    topic: "रचना के आधार पर वाक्य भेद व रूपांतरण",
    chapter: "रचना के आधार पर वाक्य रूपांतरण",
    subject: "Hindi Grammar (हिंदी व्याकरण)",
    definition: "रचना की दृष्टि से वाक्य के तीन भेद होते हैं: सरल वाक्य, संयुक्त वाक्य और मिश्र वाक्य। बोर्ड परीक्षा में वाक्य भेद पहचानना और एक वाक्य को दूसरे रूप में बदलना (रूपांतरण) 4 अंकों का अनिवार्य प्रश्न है।",
    keyPoints: [
      "1. सरल वाक्य: जिसमें एक ही उद्देश्य (कर्ता) और एक ही विधेय (समापिका क्रिया) हो ('बालक रोते-रोते सो गया')। इसमें कोई योजक शब्द नहीं होता।",
      "2. संयुक्त वाक्य: दो या दो से अधिक स्वतंत्र उपवाक्य समानाधिकरण योजक शब्दों से जुड़े हों। योजक: 'और', 'तथा', 'एवं', 'या', 'अथवा', 'किन्तु', 'परन्तु', 'लेकिन', 'इसलिए', 'अतः' ('बालक रोया और सो गया')।",
      "3. मिश्र वाक्य: एक मुख्य/प्रधान उपवाक्य हो और एक या अधिक आश्रित उपवाक्य व्यधिकरण योजकों से जुड़े हों। योजक: 'कि', 'जो-वह', 'जिसने', 'जैसा-वैसा', 'जब-तब', 'जहाँ-वहाँ', 'यदि-तो', 'यद्यपि-तथापि', 'क्योंकि' ('जैसे ही बालक रोया, वह सो गया')।",
      "आश्रित उपवाक्य के 3 भेद: 1. संज्ञा आश्रित (प्रायः 'कि' से शुरू); 2. विशेषण आश्रित ('जो/जिसने/जिसका' से शुरू होकर संज्ञा की विशेषता बताए); 3. क्रियाविशेषण आश्रित ('जब/जहाँ/जैसे/यदि' से शुरू होकर क्रिया का समय/स्थान/रीति बताए)।",
    ],
    formulas: [
      "सरल वाक्य = कर्ता + कर्म + एक ही समापिका क्रिया (योजक रहित)",
      "संयुक्त वाक्य = स्वतंत्र उपवाक्य + [और / किन्तु / इसलिए / या] + स्वतंत्र उपवाक्य",
      "मिश्र वाक्य = प्रधान उपवाक्य + [कि / जो / जब-तब / जैसे ही] + आश्रित उपवाक्य",
    ],
    differences: [
      {
        label: "संयुक्त वाक्य vs मिश्र वाक्य",
        a: "संयुक्त वाक्य: दोनों उपवाक्य स्वतंत्र होते हैं; योजक हटाने पर भी दोनों अपने आप में पूर्ण अर्थ देते हैं।",
        b: "मिश्र वाक्य: एक उपवाक्य प्रधान होता है और दूसरा उस पर आश्रित होता है; आश्रित उपवाक्य अकेले पूरा अर्थ नहीं देता।",
      },
    ],
    examples: [
      "सरल: 'सूर्योदय होने पर पक्षी घोंसलों से निकल आए।'",
      "संयुक्त: 'सूर्योदय हुआ और पक्षी घोंसलों से निकल आए।' (समानाधिकरण योजक 'और')",
      "मिश्र: 'जैसे ही सूर्योदय हुआ, वैसे ही पक्षी घोंसलों से निकल आए।' (व्यधिकरण योजक 'जैसे ही-वैसे ही')",
    ],
    commonMistakes: [
      "संयुक्त और मिश्र वाक्य के योजकों को आपस में मिला देना: 'और, लेकिन, इसलिए' संयुक्त के हैं; 'कि, जो, जब, क्योंकि' मिश्र के हैं।",
      "रूपांतरण करते समय मूल वाक्य का अर्थ या काल (Tense) बदल देना — वाक्य रूपांतरण में अर्थ और काल कभी नहीं बदलना चाहिए।",
    ],
    examKeywords: [
      "सरल वाक्य",
      "संयुक्त वाक्य",
      "मिश्र वाक्य",
      "समानाधिकरण योजक",
      "व्यधिकरण योजक",
      "आश्रित उपवाक्य भेद",
    ],
    quickRevision: [
      "✅ 'और, किन्तु, परन्तु, इसलिए' दिखे -> संयुक्त वाक्य।",
      "✅ 'कि, जो, जब-तब, जैसे ही, यदि-तो' दिखे -> मिश्र वाक्य।",
      "✅ कोई योजक नहीं, केवल एक समापिका क्रिया -> सरल वाक्य।",
    ],
  },
  "hindi-grammar:ch-hg-samas:hg-samas-all-types": {
    topic: "समास: छह भेद, विग्रह विधियाँ एवं पहचान सूत्र",
    chapter: "समास एवं समास-विग्रह",
    subject: "Hindi Grammar (हिंदी व्याकरण)",
    definition: "दो या दो से अधिक शब्दों के मेल से नए सार्थक शब्द बनाने की प्रक्रिया को 'समास' कहते हैं। सामासिक पदों को अलग-अलग करके उनके संबंध को स्पष्ट करना 'समास-विग्रह' कहलाता है।",
    keyPoints: [
      "1. तत्पुरुष समास: उत्तरपद (दूसरा पद) प्रधान होता है और दोनों पदों के बीच कारक-चिह्न का लोप होता है ('राजपुत्र' = राजा का पुत्र [संबध तत्पुरुष]; 'रोगमुक्त' = रोग से मुक्त [अपादान तत्पुरुष])।",
      "2. कर्मधारय समास: उत्तरपद प्रधान होता है और दोनों पदों में विशेषण-विशेष्य या उपमेय-उपमान का संबंध होता है ('नीलगगन' = नीला है जो गगन; 'चरणकमल' = कमल के समान चरण)।",
      "3. द्विगु समास: पूर्वपद (पहला पद) संख्यावाचक विशेषण होता है और समस्त पद समाहार (समूह) का बोध कराता है ('नवरत्न' = नौ रत्नों का समूह; 'सप्तर्षि' = सात ऋषियों का समूह)।",
      "4. द्वंद्व समास: दोनों पद प्रधान होते हैं और विग्रह करने पर 'और', 'या', 'तथा', 'अथवा' लगता है ('माता-पिता' = माता और पिता; 'सुख-दुख' = सुख और दुख)।",
      "5. बहुव्रीहि समास: दोनों पद अप्रधान होते हैं और मिलकर किसी तीसरे अन्य पद की ओर संकेत करते हैं ('दशानन' = दस हैं आनन जिसके अर्थात् रावण; 'लंबोदर' = लंबा है उदर जिसका अर्थात् गणेश जी)।",
      "6. अव्ययीभाव समास: पूर्वपद अव्यय/उपसर्ग होता है और समस्त पद क्रियाविशेषण अव्यय की तरह कार्य करता है ('यथाशक्ति' = शक्ति के अनुसार; 'प्रतिदिन' = प्रत्येक दिन; 'आजन्म' = जन्म से लेकर)।",
    ],
    formulas: [
      "कारक चिह्न का लोप = तत्पुरुष समास ('हस्तलिखित' = हाथ से लिखित)",
      "विशेषण + विशेष्य = कर्मधारय समास ('महात्मा' = महान है जो आत्मा)",
      "संख्या + समूह = द्विगु समास ('त्रिलोक' = तीन लोकों का समाहार)",
      "दोनों पद प्रधान + योजक चिह्न = द्वंद्व समास ('पाप-पुण्य' = पाप और पुण्य)",
      "अन्य अर्थ (तीसरा व्यक्ति/देवता) = बहुव्रीहि समास ('चक्रपाणि' = विष्णु)",
      "उपसर्ग/अव्यय पूर्वपद = अव्ययीभाव समास ('बेखटके' = बिना खटके के)",
    ],
    differences: [
      {
        label: "कर्मधारय vs बहुव्रीहि (पीतांबर)",
        a: "कर्मधारय: यदि विग्रह 'पीत है जो अंबर' (कपड़ा) किया जाए तो विशेषण-विशेष्य होने से कर्मधारय होगा।",
        b: "बहुव्रीहि: यदि विग्रह 'पीत हैं अंबर जिसके अर्थात् श्रीकृष्ण' किया जाए तो अन्य पद प्रधान होने से बहुव्रीहि होगा।",
      },
      {
        label: "द्विगु vs बहुव्रीहि (दशानन)",
        a: "द्विगु: 'दस आननों (मुखों) का समाहार' विग्रह करने पर द्विगु समास होगा।",
        b: "बहुव्रीहि: 'दस हैं आनन जिसके अर्थात् रावण' विग्रह करने पर बहुव्रीहि समास होगा।",
      },
    ],
    examples: [
      "तत्पुरुष: 'गौशाला' = गायों के लिए शाला (संप्रदान तत्पुरुष)।",
      "कर्मधारय: 'प्राणप्रिय' = प्राणों के समान प्रिय।",
      "द्विगु: 'पंचतत्व' = पाँच तत्वों का समाहार।",
      "द्वंद्व: 'दिन-रात' = दिन और रात।",
      "बहुव्रीहि: 'त्रिनेत्र' = तीन हैं नेत्र जिसके अर्थात् भगवान शिव।",
      "अव्ययीभाव: 'रातों-रात' = रात ही रात में।",
    ],
    commonMistakes: [
      "कर्मधारय और बहुव्रीहि में बिना विग्रह देखे भेद लिखना: ध्यान रहे कि भेद का निर्धारण विग्रह के आधार पर होता है।",
      "अव्ययीभाव में द्विरुक्ति शब्दों को द्वंद्व समझ लेना: 'रातों-रात', 'हाथों-हाथ', 'दिनो-दिन' में दोनों शब्द समान होने के कारण अव्ययीभाव समास है, द्वंद्व नहीं!",
    ],
    examKeywords: [
      "समास-विग्रह नियम",
      "कर्मधारय vs बहुव्रीहि",
      "द्विगु समास समाहार",
      "तत्पुरुष कारक लोप",
      "अव्ययीभाव पहचान",
    ],
    quickRevision: [
      "✅ पहला पद संख्या -> द्विगु (यदि तीसरा अर्थ निकले तो बहुव्रीहि)।",
      "✅ दोनों पदों के बीच 'और/या' -> द्वंद्व समास।",
      "✅ पहला पद उपसर्ग (यथा, प्रति, आ, बे, नि) -> अव्ययीभाव समास।",
      "✅ कारक विभक्ति का लोप -> तत्पुरुष समास।",
    ],
  },
  "hindi-grammar:ch-hg-vachya:hg-vachya-types-transform": {
    topic: "वाच्य: कर्तृवाच्य, कर्मवाच्य, भाववाच्य व रूपांतरण",
    chapter: "वाच्य एवं वाच्य परिवर्तन",
    subject: "Hindi Grammar (हिंदी व्याकरण)",
    definition: "क्रिया के जिस रूप से यह जाना जाए कि वाक्य में क्रिया का मुख्य संबंध कर्ता, कर्म या भाव में से किसके साथ है, उसे 'वाच्य' कहते हैं।",
    keyPoints: [
      "1. कर्तृवाच्य: क्रिया का लिंग, वचन और पुरुष कर्ता के अनुसार बदलता है। इसमें क्रिया सकर्मक या अकर्मक दोनों हो सकती है ('बच्चा दूध पीता है', 'पक्षी आकाश में उड़ते हैं')।",
      "2. कर्मवाच्य: क्रिया का लिंग और वचन कर्म के अनुसार बदलता है। केवल सकर्मक क्रियाओं का ही कर्मवाच्य बनता है! कर्ता के साथ 'के द्वारा' या 'से' का प्रयोग होता है ('बच्चे के द्वारा दूध पिया जाता है')।",
      "3. भाववाच्य: क्रिया का लिंग और वचन भाव (क्रिया) के अनुसार होता है। केवल अकर्मक क्रियाओं का ही भाववाच्य बनता है! क्रिया सदैव अन्य पुरुष, पुल्लिंग, एकवचन में रहती है ('बूढ़े से चला नहीं जाता')।",
      "रूपांतरण नियम: कर्तृवाच्य से कर्मवाच्य/भाववाच्य बनाते समय कर्ता के बाद 'से' या 'के द्वारा' जोड़ें, और मुख्य क्रिया को सामान्य भूतकाल में बदलकर कालानुरूप 'जाना' क्रिया का रूप जोड़ें।",
    ],
    formulas: [
      "कर्तृवाच्य -> कर्मवाच्य = कर्ता + [के द्वारा / से] + कर्म + मुख्य क्रिया (भूतकाल) + [जाना क्रिया]",
      "कर्तृवाच्य -> भाववाच्य = कर्ता + [से] + अकर्मक क्रिया + [जाता है / गया / जाएगा]",
    ],
    examples: [
      "कर्तृवाच्य से कर्मवाच्य: 'माली पौधे लगाता है।' -> 'माली के द्वारा पौधे लगाए जाते हैं।'",
      "कर्तृवाच्य से कर्मवाच्य: 'कवि ने कविता सुनाई।' -> 'कवि द्वारा कविता सुनाई गई।' (कविता स्त्रीलिंग -> सुनाई गई)",
      "कर्तृवाच्य से भाववाच्य: 'पक्षी रात में नहीं उड़ते।' -> 'पक्षियों से रात में उड़ा नहीं जाता।'",
      "कर्तृवाच्य से भाववाच्य: 'मैं अब बैठ नहीं सकता।' -> 'मुझसे अब बैठा नहीं जाता।'",
    ],
    commonMistakes: [
      "अकर्मक क्रिया का कर्मवाच्य बनाना: अकर्मक क्रिया का कभी कर्मवाच्य नहीं बन सकता; उसका केवल भाववाच्य बनता है!",
      "सकर्मक क्रिया का भाववाच्य बनाना: यदि वाक्य में कर्म मौजूद है, तो भाववाच्य नहीं बनेगा, केवल कर्मवाच्य बनेगा।",
    ],
    examKeywords: [
      "कर्तृवाच्य",
      "कर्मवाच्य (सकर्मक)",
      "भाववाच्य (अकर्मक)",
      "के द्वारा / से प्रयोग",
      "जाना क्रिया रूप",
    ],
    quickRevision: [
      "✅ वाक्य में कर्म है और 'के द्वारा' लगा है -> कर्मवाच्य।",
      "✅ वाक्य में कर्म नहीं है, 'से' लगा है और असमर्थता का भाव है -> भाववाच्य।",
      "✅ कर्ता स्वतंत्र है, कोई 'से/के द्वारा' नहीं -> कर्तृवाच्य।",
    ],
  },
};

export const GRAMMAR_FLASHCARDS: Record<string, Flashcard[]> = {
  "english-grammar:ch-eg-tenses:eg-present-past": [
    {
      front: "What is the difference between 'Since' and 'For' in perfect continuous tenses?",
      back: "'Since' is used for a specific starting point in time (since 2015, since morning).\n'For' is used for a duration or period of time (for 3 hours, for five days).",
    },
    {
      front: "Why is 'I have met him yesterday' grammatically incorrect?",
      back: "Because Present Perfect cannot be paired with a definite past time adverb (yesterday). The correct sentence is: 'I met him yesterday' (Simple Past).",
    },
    {
      front: "When is the Past Perfect tense (had + V3) strictly used?",
      back: "When two actions happened in the past, the Past Perfect is used to express the EARLIER action (e.g. 'The train had left before we reached the platform').",
    },
  ],
  "english-grammar:ch-eg-concord:eg-agreement-rules": [
    {
      front: "State the Rule of Proximity for 'Neither... nor' and 'Either... or'.",
      back: "The verb agrees in number and person with the SUBJECT CLOSEST to it.\nExample: 'Neither the principal nor the teachers WERE present.'",
    },
    {
      front: "Which subject does the verb agree with in: 'The captain, as well as the players, (is/are) ready'?",
      back: "'IS'. With 'as well as', 'along with', 'together with', the verb agrees strictly with the FIRST subject ('captain').",
    },
    {
      front: "Does 'One of the students' take a singular or plural verb?",
      back: "A SINGULAR verb (e.g. 'One of the students IS absent'). 'One' is the true grammatical subject.",
    },
  ],
  "english-grammar:ch-eg-reported-speech:eg-direct-indirect-statements": [
    {
      front: "How does tense change when converting Simple Present and Simple Past to indirect speech?",
      back: "Simple Present (V1) -> Simple Past (V2)\nSimple Past (V2) -> Past Perfect (had + V3)",
    },
    {
      front: "Why does 'The teacher said, 'The Earth rotates on its axis'' NOT backshift to past tense?",
      back: "Because universal scientific truths, geographical facts, and habitual realities remain in the PRESENT tense in indirect speech.",
    },
    {
      front: "What conjunction is used when reporting Yes/No questions?",
      back: "'If' or 'Whether'. The question is also converted back into statement order (Subject before Verb).",
    },
  ],
  "hindi-grammar:ch-hg-padbandh:hg-padbandh-types": [
    {
      front: "पद और पदबंध में क्या मुख्य अंतर है?",
      back: "वाक्य में प्रयुक्त एक शब्द 'पद' कहलाता है, जबकि कई पदों का समूह मिलकर जब एक ही व्याकरणिक इकाई का कार्य करता है, तो उसे 'पदबंध' कहते हैं।",
    },
    {
      front: "पदबंध का भेद पहचानने का 'शीर्ष पद नियम' क्या है?",
      back: "रेखांकित अंश का अंतिम (शीर्ष) शब्द जिस व्याकरणिक कोटि का होता है (संज्ञा, सर्वनाम, विशेषण, क्रिया या क्रियाविशेषण), पूरा पदबंध उसी भेद का होता है।",
    },
    {
      front: "'हमेशा दूसरों की सहायता करने वाले आप आज शांत हैं' में कौन सा पदबंध है?",
      back: "सर्वनाम पदबंध, क्योंकि रेखांकित अंश का अंतिम पद 'आप' एक सर्वनाम है।",
    },
  ],
  "hindi-grammar:ch-hg-vakya:hg-vakya-types-transform": [
    {
      front: "रचना के आधार पर वाक्य के तीन भेद कौन-से हैं?",
      back: "1. सरल वाक्य (एक उद्देश्य, एक समापिका क्रिया)\n2. संयुक्त वाक्य (समानाधिकरण योजक: और, किन्तु, इसलिए)\n3. मिश्र वाक्य (व्यधिकरण योजक: कि, जो, जब-तब)",
    },
    {
      front: "सरल वाक्य 'सूर्योदय होने पर अंधकार मिट गया' को संयुक्त वाक्य में बदलिए।",
      back: "'सूर्योदय हुआ और अंधकार मिट गया।'",
    },
    {
      front: "मिश्र वाक्य के तीन आश्रित उपवाक्य कौन-से होते हैं?",
      back: "1. संज्ञा आश्रित उपवाक्य ('कि' से शुरू)\n2. विशेषण आश्रित उपवाक्य ('जो, जिसने' से शुरू)\n3. क्रियाविशेषण आश्रित उपवाक्य ('जब, जहाँ, जैसे' से शुरू)",
    },
  ],
  "hindi-grammar:ch-hg-samas:hg-samas-all-types": [
    {
      front: "द्विगु समास और बहुव्रीहि समास में क्या अंतर है?",
      back: "द्विगु समास में पहला पद संख्यावाचक होता है और समूह का बोध कराता है (जैसे 'त्रिफला' = तीन फलों का समाहार)। बहुव्रीहि में संख्या होने पर भी तीसरा विशेष अर्थ निकलता है (जैसे 'दशानन' = दस सिर वाला अर्थात् रावण)।",
    },
    {
      front: "अव्ययीभाव समास की मुख्य पहचान क्या है?",
      back: "पहला पद अव्यय या उपसर्ग (यथा, प्रति, आ, बे, भर) होता है और समस्त पद अव्यय बन जाता है। जैसे: यथाशक्ति (शक्ति के अनुसार), प्रतिदिन (हर दिन)।",
    },
  ],
  "hindi-grammar:ch-hg-vachya:hg-vachya-types-transform": [
    {
      front: "कर्मवाच्य और भाववाच्य में क्रिया का सबसे बड़ा अंतर क्या है?",
      back: "कर्मवाच्य केवल सकर्मक क्रियाओं (कर्म वाले) का बनता है।\nभाववाच्य केवल अकर्मक क्रियाओं (बिना कर्म वाले) का बनता है, और क्रिया सदैव अन्य पुरुष, पुल्लिंग, एकवचन में रहती है।",
    },
    {
      front: "'मरीज चल नहीं सकता' को भाववाच्य में बदलिए।",
      back: "'मरीज से चला नहीं जाता।'",
    },
  ],
};
