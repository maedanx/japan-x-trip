import {
  diagnosisQuestions,
  type ConnectionMethod,
  type DiagnosisFlag,
  type DiagnosisMethod,
} from "./diagnosisQuestions";

export type DiagnosisScores = Record<ConnectionMethod, number>;

export type MethodAvailability =
  | "available"
  | "conditional"
  | "unavailable";

export type MethodAssessment = {
  method: ConnectionMethod;
  score: number;
  availability: MethodAvailability;
  reasons: string[];
  cautions: string[];
};

export type DiagnosisAnalysis = {
  primary: DiagnosisMethod;
  alternative: ConnectionMethod | null;
  scores: DiagnosisScores;
  flags: Set<DiagnosisFlag>;
  assessments: Record<ConnectionMethod, MethodAssessment>;
  primaryReasons: string[];
  primaryCautions: string[];
};

const methods: ConnectionMethod[] = ["esim", "sim", "wifi"];

function collectFlags(answers: number[]): Set<DiagnosisFlag> {
  const flags = new Set<DiagnosisFlag>();

  answers.forEach((answerIndex, questionIndex) => {
    const option = diagnosisQuestions[questionIndex]?.options[answerIndex];

    option?.flags?.forEach((flag) => {
      flags.add(flag);
    });
  });

  return flags;
}

function collectBaseScores(answers: number[]): DiagnosisScores {
  const scores: DiagnosisScores = {
    esim: 0,
    sim: 0,
    wifi: 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const option = diagnosisQuestions[questionIndex]?.options[answerIndex];

    if (!option) return;

    Object.entries(option.scores).forEach(([method, score]) => {
      scores[method as ConnectionMethod] += score ?? 0;
    });
  });

  return scores;
}

function determineAvailability(
  method: ConnectionMethod,
  flags: Set<DiagnosisFlag>,
): MethodAvailability {
  if (method === "esim") {
    if (flags.has("noEsim") || flags.has("locked")) {
      return "unavailable";
    }

    if (flags.has("unknownEsim") || flags.has("unknownLock")) {
      return "conditional";
    }

    return "available";
  }

  if (method === "sim") {
    if (flags.has("locked")) {
      return "unavailable";
    }

    if (flags.has("unknownLock")) {
      return "conditional";
    }

    return "available";
  }

  return "available";
}

function applyTripConditionScores(
  scores: DiagnosisScores,
  flags: Set<DiagnosisFlag>,
) {
  if (flags.has("sharedGroup")) {
    scores.wifi += 6;
    scores.esim -= 1;
    scores.sim -= 1;
  }

  if (flags.has("largeGroup")) {
    scores.wifi += 10;
    scores.esim -= 3;
    scores.sim -= 3;
  }

  if (flags.has("heavyUse")) {
    scores.wifi += 5;
    scores.esim += 1;
  }

  if (flags.has("remoteWork")) {
    scores.wifi += 8;
    scores.esim += 1;
    scores.sim -= 1;
  }

  if (flags.has("longTrip")) {
    scores.sim += 3;
    scores.esim += 2;
    scores.wifi += 1;
  }

  if (flags.has("arrivalPriority")) {
    scores.esim += 5;
    scores.sim += 1;
    scores.wifi -= 1;
  }
}

function applyPreferenceScores(
  scores: DiagnosisScores,
  flags: Set<DiagnosisFlag>,
) {
  if (flags.has("digitalOnly")) {
    scores.esim += 9;
    scores.sim -= 5;
    scores.wifi -= 6;
  }

  if (flags.has("simOkay")) {
    scores.sim += 7;
  }

  if (flags.has("rentalOkay")) {
    scores.wifi += 7;
  }

  if (flags.has("pickupOkay") || flags.has("deliveryOkay")) {
    scores.wifi += 3;
  }
}

function applyAvailabilityScores(
  scores: DiagnosisScores,
  availability: Record<ConnectionMethod, MethodAvailability>,
) {
  methods.forEach((method) => {
    if (availability[method] === "unavailable") {
      scores[method] = -1000;
    }

    if (availability[method] === "conditional") {
      scores[method] -= 12;
    }
  });
}

function buildReasons(
  method: ConnectionMethod,
  flags: Set<DiagnosisFlag>,
): string[] {
  const reasons: string[] = [];

  if (method === "esim") {
    if (flags.has("esimSupported")) {
      reasons.push("Your phone supports eSIM.");
    }

    if (flags.has("unlocked")) {
      reasons.push("Your phone is carrier-unlocked.");
    }

    if (flags.has("arrivalPriority")) {
      reasons.push("You want internet immediately after landing.");
    }

    if (flags.has("digitalOnly")) {
      reasons.push("You prefer a fully digital setup without pickup or return.");
    }

    if (!flags.has("sharedGroup") && !flags.has("largeGroup")) {
      reasons.push("Your group and device needs do not require a shared router.");
    }
  }

  if (method === "sim") {
    if (flags.has("noEsim")) {
      reasons.push("Your phone does not support eSIM.");
    }

    if (flags.has("unlocked")) {
      reasons.push("Your unlocked phone can use another provider’s SIM.");
    }

    if (flags.has("simOkay")) {
      reasons.push("You are comfortable changing a physical SIM card.");
    }

    if (flags.has("longTrip")) {
      reasons.push("A physical SIM can be practical for a longer stay.");
    }
  }

  if (method === "wifi") {
    if (flags.has("locked")) {
      reasons.push("A pocket Wi-Fi works without changing your phone’s SIM.");
    }

    if (flags.has("sharedGroup")) {
      reasons.push("Several people or devices need to share one connection.");
    }

    if (flags.has("largeGroup")) {
      reasons.push("Your larger group benefits from one shared router.");
    }

    if (flags.has("heavyUse")) {
      reasons.push("Your trip includes heavy data use or frequent tethering.");
    }

    if (flags.has("remoteWork")) {
      reasons.push("Laptop work and online meetings increase your shared-data needs.");
    }

    if (flags.has("rentalOkay")) {
      reasons.push("You are comfortable carrying and returning a rental router.");
    }

    if (flags.has("pickupOkay") || flags.has("deliveryOkay")) {
      reasons.push("Pickup or hotel delivery works with your arrival plan.");
    }
  }

  return reasons.slice(0, 4);
}

function buildCautions(
  method: ConnectionMethod,
  flags: Set<DiagnosisFlag>,
  availability: MethodAvailability,
): string[] {
  const cautions: string[] = [];

  if (method === "esim") {
    if (availability === "conditional") {
      cautions.push("Confirm both eSIM compatibility and carrier-unlocked status before buying.");
    }

    cautions.push("Check hotspot rules, activation timing, and the exact supported phone model.");

    if (flags.has("sharedGroup") || flags.has("largeGroup")) {
      cautions.push("Each traveler may need a separate plan when the group splits up.");
    }
  }

  if (method === "sim") {
    if (availability === "conditional") {
      cautions.push("Confirm that your phone is carrier-unlocked before buying.");
    }

    cautions.push("Check SIM size, APN instructions, pickup, or delivery conditions.");

    if (flags.has("arrivalPriority")) {
      cautions.push("A physical SIM may require pickup or setup after landing.");
    }
  }

  if (method === "wifi") {
    cautions.push("The router must be charged, carried, and returned.");

    if (flags.has("arrivalPriority")) {
      cautions.push("Confirm airport pickup or delivery timing before arrival.");
    }

    if (flags.has("sharedGroup") || flags.has("largeGroup")) {
      cautions.push("Travelers lose the connection when they move away from the router.");
    }
  }

  return cautions.slice(0, 3);
}

function rankAvailableMethods(
  scores: DiagnosisScores,
  availability: Record<ConnectionMethod, MethodAvailability>,
): ConnectionMethod[] {
  return [...methods].sort((first, second) => {
    const firstAvailable = availability[first] !== "unavailable";
    const secondAvailable = availability[second] !== "unavailable";

    if (firstAvailable !== secondAvailable) {
      return firstAvailable ? -1 : 1;
    }

    return scores[second] - scores[first];
  });
}

/**
 * Diagnosis is evaluated in three layers:
 *
 * 1. Availability — eliminate methods that cannot work.
 * 2. Trip conditions — group size, devices, duration, and data use.
 * 3. Preference — digital setup, SIM handling, or rental handling.
 *
 * The function remains independent from React, analytics, providers,
 * affiliate links, and presentation code.
 */
export function analyzeDiagnosis(answers: number[]): DiagnosisAnalysis {
  const flags = collectFlags(answers);
  const scores = collectBaseScores(answers);

  const availability: Record<ConnectionMethod, MethodAvailability> = {
    esim: determineAvailability("esim", flags),
    sim: determineAvailability("sim", flags),
    wifi: determineAvailability("wifi", flags),
  };

  applyTripConditionScores(scores, flags);
  applyPreferenceScores(scores, flags);
  applyAvailabilityScores(scores, availability);

  const rankedMethods = rankAvailableMethods(scores, availability);
  const bestMethod = rankedMethods[0] ?? "wifi";
  const alternative =
    rankedMethods.find(
      (method) =>
        method !== bestMethod &&
        availability[method] !== "unavailable",
    ) ?? null;

  const assessments = methods.reduce<
    Record<ConnectionMethod, MethodAssessment>
  >(
    (record, method) => {
      record[method] = {
        method,
        score: scores[method],
        availability: availability[method],
        reasons: buildReasons(method, flags),
        cautions: buildCautions(
          method,
          flags,
          availability[method],
        ),
      };

      return record;
    },
    {
      esim: {
        method: "esim",
        score: 0,
        availability: "available",
        reasons: [],
        cautions: [],
      },
      sim: {
        method: "sim",
        score: 0,
        availability: "available",
        reasons: [],
        cautions: [],
      },
      wifi: {
        method: "wifi",
        score: 0,
        availability: "available",
        reasons: [],
        cautions: [],
      },
    },
  );

  const requiresCompatibilityCheck =
    availability.esim === "conditional" &&
    availability.sim === "conditional" &&
    !flags.has("locked");

  const primary: DiagnosisMethod = requiresCompatibilityCheck
    ? "check"
    : bestMethod;

  return {
    primary,
    alternative: primary === "check" ? "wifi" : alternative,
    scores,
    flags,
    assessments,
    primaryReasons:
      primary === "check"
        ? [
            "Your phone’s eSIM compatibility or carrier-lock status is not confirmed.",
            "Confirm compatibility before purchasing an eSIM or physical SIM.",
          ]
        : assessments[primary].reasons,
    primaryCautions:
      primary === "check"
        ? [
            "Do not purchase an eSIM or physical SIM until compatibility is confirmed.",
            "Pocket Wi-Fi remains usable without changing your phone’s SIM.",
          ]
        : assessments[primary].cautions,
  };
}
