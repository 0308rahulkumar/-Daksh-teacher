export const NOCTURNE_VARIANTS: readonly string[] = ["midnight", "solar", "eclipse"];
export const NOCTURNE_TITLES: Record<string, string> = {
  midnight: "Nocturne — Midnight",
  solar: "Nocturne — Solar",
  eclipse: "Nocturne — Eclipse"
};
export function buildNocturneDocument(variant?: any): string { return ""; }
export type NocturneVariant = string;
