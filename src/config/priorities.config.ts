export interface PriorityConfig {
  label: string;
  textColor: string;
  bgColor: string;
}

export const PRIORITY_CONFIG = {
  low: {
    label: "Low",
    textColor: "text-slate-600",
    bgColor: "bg-slate-100",
  },
  medium: {
    label: "Medium",
    textColor: "text-orange-700",
    bgColor: "bg-orange-200",
  },
  high: {
    label: "High",
    textColor: "text-red-700",
    bgColor: "bg-red-200",
  },
} satisfies Record<string, PriorityConfig>;

export type TaskPriority = keyof typeof PRIORITY_CONFIG;
