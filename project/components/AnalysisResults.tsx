"use client";

import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalysisResultsProps {
  recommendations: {
    recommendations: {
      match_percentage: number;
      skills_comparison: {
        matching_skills: string[];
        missing_skills: string[];
      };
      missing_experience: string[];
      presentation_improvements: string[];
      customization_suggestions: string[];
    };
  }
}

export default function AnalysisResults({ recommendations }: AnalysisResultsProps) {
  console.log("AnalysisResults props 2:", recommendations);
  console.log("Matching skills:", recommendations.recommendations.skills_comparison.matching_skills);
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-amber-400/10 ring-2 ring-amber-400 ring-offset-2 ring-offset-blue-950">
          <div className="text-4xl font-bold text-amber-400">
            {recommendations.recommendations.match_percentage}%
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-50">Puntuación de Coincidencia</h2>
          <p className="text-blue-200">
            Basado en tu currículum y los requisitos del trabajo
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-blue-900/50 border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-50">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Habilidades Coincidentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendations.recommendations.skills_comparison.matching_skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/50 border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-50">
              <XCircle className="w-5 h-5 text-red-400" />
              Habilidades Faltantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendations.recommendations.skills_comparison.missing_skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="bg-red-400/10 text-red-400 border-red-400/20"
          >
            {skill}
          </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-900/50 border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-50">
        <TrendingUp className="w-5 h-5 text-amber-400" />
        Experiencia Faltante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
        {recommendations.recommendations.missing_experience.map((experience, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-blue-900/50 rounded-lg"
          >
            <span className="w-6 h-6 bg-amber-400/10 rounded-full flex items-center justify-center text-sm font-medium text-amber-400">
          {index + 1}
            </span>
            <span className="text-blue-50">{experience}</span>
          </li>
        ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-blue-900/50 border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-50">
        <Award className="w-5 h-5 text-amber-400" />
        Mejoras en la Presentación
          </CardTitle>
          <CardDescription className="text-blue-200">
        Sugerencias para mejorar la presentación de tu currículum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6 list-disc list-inside">
        {recommendations.recommendations.presentation_improvements.map((improvement, index) => (
          <li key={index} className="flex items-start gap-3 bg-blue-900/50 rounded-lg">
            <span className="w-6 h-6 bg-amber-400/10 rounded-full flex items-center justify-center text-sm font-medium text-amber-400">
          {index + 1}
            </span>
            <span className="text-blue-50">{improvement}</span>
          </li>
        ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-blue-900/50 border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-50">
        <BookOpen className="w-5 h-5 text-amber-400" />
        Sugerencias de Personalización
          </CardTitle>
          <CardDescription className="text-blue-200">
        Sugerencias para personalizar tu currículum para este puesto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6 list-disc list-inside">
        {recommendations.recommendations.customization_suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-blue-900/50 rounded-lg"
          >
            <span className="w-6 h-6 bg-amber-400/10 rounded-full flex items-center justify-center text-sm font-medium text-amber-400">
          {index + 1}
            </span>
            <span className="text-blue-50">{suggestion}</span>
          </li>
        ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}