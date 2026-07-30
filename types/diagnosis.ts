export type StoredDiagnosisAnswers = Record<string, number>;

export type StoredDiagnosisState = {
  version: 1;
  answers: StoredDiagnosisAnswers;
  currentStep: number;
  showResult: boolean;
  updatedAt: string;
};

export type QuickDiagnosisInput = {
  people: "1" | "2" | "3" | "4plus";
  purpose: "social" | "video" | "work" | "other";
  days: "1-3" | "4-7" | "8-14" | "15plus";
};
