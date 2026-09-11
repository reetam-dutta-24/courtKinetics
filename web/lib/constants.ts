export const FOCUS_MODULES = [
  { value: "anticipation", label: "Anticipation" },
  { value: "mistakes", label: "Mistakes" },
  { value: "doubles", label: "Doubles" },
  { value: "miss_chances", label: "Miss Chances" },
] as const;

export type FocusModule = (typeof FOCUS_MODULES)[number]["value"];

export function moduleLabel(value: string) {
  return FOCUS_MODULES.find((m) => m.value === value)?.label ?? value;
}