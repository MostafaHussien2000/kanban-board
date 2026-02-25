import { PRIORITY_CONFIG } from "@/config/priorities.config";
import { cn } from "@/lib/utils";

interface DifficultyRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DifficultyRadioGroup({
  value,
  onChange,
}: DifficultyRadioGroupProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.entries(PRIORITY_CONFIG).map(([key, config]) => {
        const isSelected = value === key;
        return (
          <label
            key={key}
            htmlFor={`priority-${key}`}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 select-none",
              isSelected
                ? `${config.bgColor} ${config.textColor} border-current`
                : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/30",
            )}
          >
            <input
              type="radio"
              id={`priority-${key}`}
              name="priority"
              value={key}
              checked={isSelected}
              onChange={() => onChange(key)}
              className="sr-only"
            />
            <span className="text-sm font-semibold capitalize">
              {config.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
