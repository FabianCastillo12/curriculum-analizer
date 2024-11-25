"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Briefcase } from "lucide-react";

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
    <div className="space-y-8">
      <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-semibold text-blue-50">Descripción del Trabajo</h2>
          </div>
          <p className="text-blue-200">
            Pega la descripción de la oferta de trabajo
          </p>
        </div>
        
        <div className="space-y-4">
        <Textarea
          placeholder="Enter the job description or requirements..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[240px] bg-blue-800/50 border-blue-700 placeholder:text-blue-400 resize-none text-blue-50"
        />
        
        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={!value || isLoading}
            className="rounded-lg bg-amber-500 hover:bg-amber-600 text-blue-950 min-w-[180px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analizando...
              </>
            ) : (
                <>
                Analizar
                <ArrowRight className="w-4 h-4 ml-2" />
                </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}