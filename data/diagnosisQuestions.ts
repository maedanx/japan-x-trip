export type ConnectionMethod = "esim" | "sim" | "wifi";
export type DiagnosisMethod = ConnectionMethod | "check";

export type DiagnosisFlag =
  | "esimSupported"
  | "noEsim"
  | "unknownEsim"
  | "unlocked"
  | "locked"
  | "unknownLock"
  | "sharedGroup"
  | "largeGroup"
  | "longTrip"
  | "heavyUse"
  | "remoteWork"
  | "arrivalPriority"
  | "pickupOkay"
  | "deliveryOkay"
  | "digitalOnly"
  | "simOkay"
  | "rentalOkay";

export type DiagnosisAnswerOption = {
  label: string;
  description?: string;
  scores: Partial<Record<ConnectionMethod, number>>;
  flags?: DiagnosisFlag[];
};

export type DiagnosisQuestion = {
  id: string;
  title: string;
  helper: string;
  options: DiagnosisAnswerOption[];
};

/**
 * Step 1 deliberately preserves the current seven-question experience.
 * The approved final question set will be introduced in the UI-flow phase,
 * after the engine is separated and testable.
 */
export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: "esim",
    title: "Does your phone support eSIM?",
    helper: "Check your phone settings or manufacturer specifications when unsure.",
    options: [
      {
        label: "Yes",
        description: "My phone supports eSIM.",
        scores: { esim: 6, sim: 1 },
        flags: ["esimSupported"],
      },
      {
        label: "No",
        description: "My phone does not support eSIM.",
        scores: { sim: 6, wifi: 3 },
        flags: ["noEsim"],
      },
      {
        label: "I’m not sure",
        description: "I need to confirm compatibility.",
        scores: { wifi: 1 },
        flags: ["unknownEsim"],
      },
    ],
  },
  {
    id: "unlocked",
    title: "Is your phone carrier-unlocked?",
    helper: "A locked phone may reject travel eSIMs and physical SIM cards.",
    options: [
      {
        label: "Yes",
        description: "It can use plans from other providers.",
        scores: { esim: 4, sim: 4 },
        flags: ["unlocked"],
      },
      {
        label: "No",
        description: "My carrier restricts other SIMs.",
        scores: { wifi: 8 },
        flags: ["locked"],
      },
      {
        label: "I’m not sure",
        description: "I have not checked yet.",
        scores: { wifi: 1 },
        flags: ["unknownLock"],
      },
    ],
  },
  {
    id: "party",
    title: "Who and what needs internet?",
    helper: "Choose the closest match for your travel group and devices.",
    options: [
      { label: "1 person · 1 device", scores: { esim: 6, sim: 5 } },
      {
        label: "1–2 people · 2–3 devices",
        scores: { esim: 4, sim: 3, wifi: 3 },
      },
      {
        label: "3–4 people or 4–6 devices",
        scores: { wifi: 7, esim: 1 },
        flags: ["sharedGroup"],
      },
      {
        label: "5+ people or many devices",
        scores: { wifi: 9 },
        flags: ["largeGroup"],
      },
    ],
  },
  {
    id: "duration",
    title: "How long will you stay in Japan?",
    helper: "Trip length affects plan size, rental logistics, and recharging needs.",
    options: [
      { label: "1–3 days", scores: { esim: 4, sim: 2, wifi: 1 } },
      { label: "4–7 days", scores: { esim: 5, sim: 3, wifi: 3 } },
      { label: "8–14 days", scores: { esim: 5, sim: 4, wifi: 4 } },
      {
        label: "15 days or longer",
        scores: { sim: 5, esim: 4, wifi: 4 },
        flags: ["longTrip"],
      },
    ],
  },
  {
    id: "usage",
    title: "How much data will you use?",
    helper: "Think about maps, social media, video, calls, uploads, and laptop use.",
    options: [
      {
        label: "Light",
        description: "Maps, messages, email, and occasional browsing.",
        scores: { esim: 4, sim: 3 },
      },
      {
        label: "Regular",
        description: "Daily maps, social media, photos, and browsing.",
        scores: { esim: 5, sim: 4, wifi: 3 },
      },
      {
        label: "Heavy",
        description: "Video, frequent uploads, streaming, or tethering.",
        scores: { wifi: 6, esim: 3, sim: 2 },
        flags: ["heavyUse"],
      },
      {
        label: "Remote work",
        description: "Laptop use, meetings, and reliable tethering.",
        scores: { wifi: 7, esim: 2 },
        flags: ["remoteWork"],
      },
    ],
  },
  {
    id: "arrival",
    title: "Do you need internet immediately after landing?",
    helper: "Pre-installed eSIMs can be convenient, while rentals require pickup or delivery planning.",
    options: [
      {
        label: "Yes, immediately",
        scores: { esim: 5, sim: 2, wifi: 2 },
        flags: ["arrivalPriority"],
      },
      {
        label: "Airport pickup is fine",
        scores: { wifi: 5, sim: 3 },
        flags: ["pickupOkay"],
      },
      {
        label: "Hotel delivery is fine",
        scores: { wifi: 4, sim: 3 },
        flags: ["deliveryOkay"],
      },
      {
        label: "I can use airport Wi-Fi first",
        scores: { esim: 2, sim: 2, wifi: 2 },
      },
    ],
  },
  {
    id: "handling",
    title: "Which setup are you comfortable handling?",
    helper: "Choose the option that best matches your preferred level of setup and equipment.",
    options: [
      {
        label: "Digital setup only",
        description: "No pickup, SIM swap, or return.",
        scores: { esim: 7 },
        flags: ["digitalOnly"],
      },
      {
        label: "Changing a physical SIM is fine",
        scores: { sim: 7 },
        flags: ["simOkay"],
      },
      {
        label: "Carrying and returning a router is fine",
        scores: { wifi: 8 },
        flags: ["rentalOkay"],
      },
      {
        label: "Whichever is simplest for my situation",
        scores: { esim: 3, sim: 2, wifi: 3 },
      },
    ],
  },
];

export const durationQuestionIndex = diagnosisQuestions.findIndex(
  (question) => question.id === "duration",
);
