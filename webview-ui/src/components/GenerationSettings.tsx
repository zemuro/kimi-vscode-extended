import { useState } from "react";
import { IconAdjustments, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSettingsStore } from "@/stores";
import { cn } from "@/lib/utils";

interface GenerationSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function NumberField({
  label,
  description,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}) {
  const [local, setLocal] = useState(value.toString());

  const handleCommit = () => {
    const parsed = parseFloat(local);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(clamped);
      setLocal(clamped.toString());
    } else {
      setLocal(value.toString());
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">{label}</Label>
        <span className="text-[10px] text-muted-foreground font-mono">
          {min} – {max}
        </span>
      </div>
      <Input
        type="number"
        min={min}
        max={max}
        step={step}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCommit();
        }}
        className="h-7 text-xs"
      />
      {description && (
        <p className="text-[10px] text-muted-foreground leading-tight">{description}</p>
      )}
    </div>
  );
}

export function GenerationSettings({ open, onOpenChange }: GenerationSettingsProps) {
  const { extensionConfig, updateGenerationConfig } = useSettingsStore();
  const { temperature = 0.7, topP = 0.9, maxTokens = 32000 } = extensionConfig.generationConfig;

  const handleReset = () => {
    updateGenerationConfig({ temperature: 0.7, topP: 0.9, maxTokens: 32000 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gap-3">
        <DialogHeader className="pb-1">
          <DialogTitle className="text-sm flex items-center gap-2">
            <IconAdjustments className="size-4" />
            Generation Parameters
          </DialogTitle>
          <DialogDescription className="text-xs">
            Override LLM sampling parameters for this session.
            <br />
            <span className="text-[10px] text-muted-foreground">
              Requires a forked CLI that supports generation flags.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <NumberField
            label="Temperature"
            description="0 = deterministic, 2 = very random"
            value={temperature}
            min={0}
            max={2}
            step={0.1}
            onChange={(v) => updateGenerationConfig({ temperature: v })}
          />

          <NumberField
            label="Top-P"
            description="Nucleus sampling: only consider top P probability mass"
            value={topP}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => updateGenerationConfig({ topP: v })}
          />

          <NumberField
            label="Max Tokens"
            description="Maximum tokens to generate per response"
            value={maxTokens}
            min={1}
            max={200000}
            step={1}
            onChange={(v) => updateGenerationConfig({ maxTokens: Math.round(v) })}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="ghost" size="xs" onClick={handleReset} className="text-[10px] h-6">
            Reset Defaults
          </Button>
          <Button size="xs" onClick={() => onOpenChange(false)} className="text-[10px] h-6">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
