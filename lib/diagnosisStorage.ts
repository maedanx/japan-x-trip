import type {
  QuickDiagnosisInput,
  StoredDiagnosisAnswers,
  StoredDiagnosisState,
} from "@/types/diagnosis";

const STORAGE_KEY = "japan-x-trip:diagnosis:v1";
const STORAGE_VERSION = 1 as const;

const peopleAnswerMap: Record<QuickDiagnosisInput["people"], number> = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4plus": 3,
};

const purposeAnswerMap: Record<QuickDiagnosisInput["purpose"], number> = {
  social: 1,
  video: 2,
  work: 3,
  other: 1,
};

const daysAnswerMap: Record<QuickDiagnosisInput["days"], number> = {
  "1-3": 0,
  "4-7": 1,
  "8-14": 2,
  "15plus": 3,
};

function isBrowser() {
  return typeof window !== "undefined";
}

function isValidAnswerRecord(
  value: unknown,
): value is StoredDiagnosisAnswers {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.entries(value).every(
    ([questionId, answerIndex]) =>
      questionId.length > 0 &&
      Number.isInteger(answerIndex) &&
      Number(answerIndex) >= 0,
  );
}

export function loadDiagnosisState(): StoredDiagnosisState | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredDiagnosisState>;

    if (
      parsed.version !== STORAGE_VERSION ||
      !isValidAnswerRecord(parsed.answers) ||
      !Number.isInteger(parsed.currentStep) ||
      Number(parsed.currentStep) < 0 ||
      typeof parsed.showResult !== "boolean" ||
      typeof parsed.updatedAt !== "string"
    ) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      version: STORAGE_VERSION,
      answers: parsed.answers,
      currentStep: Number(parsed.currentStep),
      showResult: parsed.showResult,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveDiagnosisState(
  state: Omit<StoredDiagnosisState, "version" | "updatedAt">,
) {
  if (!isBrowser()) return;

  const payload: StoredDiagnosisState = {
    version: STORAGE_VERSION,
    answers: state.answers,
    currentStep: state.currentStep,
    showResult: state.showResult,
    updatedAt: new Date().toISOString(),
  };

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearDiagnosisState() {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function saveQuickDiagnosis(input: QuickDiagnosisInput) {
  const existing = loadDiagnosisState();

  const answers: StoredDiagnosisAnswers = {
    ...(existing?.answers ?? {}),
    party: peopleAnswerMap[input.people],
    usage: purposeAnswerMap[input.purpose],
    duration: daysAnswerMap[input.days],
  };

  saveDiagnosisState({
    answers,
    currentStep: 0,
    showResult: false,
  });
}

export function answerArrayToRecord(
  questionIds: string[],
  answers: number[],
): StoredDiagnosisAnswers {
  return questionIds.reduce<StoredDiagnosisAnswers>(
    (record, questionId, index) => {
      const answer = answers[index];

      if (Number.isInteger(answer) && answer >= 0) {
        record[questionId] = answer;
      }

      return record;
    },
    {},
  );
}

export function answerRecordToArray(
  questionIds: string[],
  answers: StoredDiagnosisAnswers,
): number[] {
  const result: number[] = [];

  questionIds.forEach((questionId, index) => {
    const answer = answers[questionId];

    if (Number.isInteger(answer) && answer >= 0) {
      result[index] = answer;
    }
  });

  return result;
}
