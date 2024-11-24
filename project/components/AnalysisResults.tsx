"use client";

import {
  CheckCircle2,
  XCircle,
  TrendingUp,
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
import { Button } from "@/components/ui/button";

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
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
          <div className="text-3xl font-bold text-primary">
            {recommendations.recommendations.match_percentage}%
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4">Puntuación de Coincidencia</h2>
        <p className="text-muted-foreground">
          Basado en tu currículum y los requisitos del trabajo
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Habilidades Coincidentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendations.recommendations.skills_comparison.matching_skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Habilidades Faltantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendations.recommendations.skills_comparison.missing_skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Experiencia Faltante
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-3">
            {recommendations.recommendations.missing_experience.map((experience, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-lg"
              >
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span>{experience}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Mejoras en la Presentación
          </CardTitle>
          <CardDescription>
            Sugerencias para mejorar la presentación de tu currículum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.recommendations.presentation_improvements.map((improvement, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-lg"
              >
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Sugerencias de Personalización
          </CardTitle>
          <CardDescription>
            Sugerencias para personalizar tu currículum para este puesto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.recommendations.customization_suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-lg"
              >
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}