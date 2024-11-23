"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function JobDescription({
  value,
  onChange,
  onSubmit,
  isLoading,
}: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Paste the job description or requirements to analyze compatibility
        </p>
        <Textarea
          placeholder="Enter job description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={!value || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze Compatibility
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}