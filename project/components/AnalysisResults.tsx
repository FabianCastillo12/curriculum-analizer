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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  results: {
    score: number;
    skills: {
      match: string[];
      missing: string[];
    };
    experience: {
      years: number;
      relevance: number;
    };
    recommendations: string[];
  };
}

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
          <div className="text-3xl font-bold text-primary">{results.score}%</div>
        </div>
        <h2 className="text-2xl font-bold mt-4">Match Score</h2>
        <p className="text-muted-foreground">
          Based on your resume and the job requirements
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Matching Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.skills.match.map((skill) => (
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
              Missing Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.skills.missing.map((skill) => (
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
            Experience Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Experience Relevance</span>
              <span className="text-sm text-muted-foreground">
                {results.experience.relevance}%
              </span>
            </div>
            <Progress value={results.experience.relevance} className="h-2" />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5" />
              <div className="font-medium">Years of Experience</div>
            </div>
            <div className="text-2xl font-bold">{results.experience.years}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Recommendations
          </CardTitle>
          <CardDescription>
            Suggestions to improve your resume for this position
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-lg"
              >
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button>Download Full Report</Button>
      </div>
    </div>
  );
}