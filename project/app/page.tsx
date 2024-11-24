"use client";
import { useState } from "react";
import { FileText, Briefcase, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dynamic from 'next/dynamic';

const UploadResume = dynamic(() => import('@/components/UploadResume'), {
  ssr: false
});
const JobDescription = dynamic(() => import('@/components/JobDescription'), {
  ssr: false
});
const AnalysisResults = dynamic(() => import('@/components/AnalysisResults'), {
  ssr: false
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ideal-invention-pxw4xrrv744364gq-8000.app.github.dev";

export default function Home() {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0]);
      console.log("File selected:", event.target.files[0]);
    }
  };

  const handleJobDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(event.target.value);
    console.log("Job description changed:", event.target.value);
  };

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      toast.error("Please provide both a resume and job description");
      return;
    }

    setIsAnalyzing(true);
    console.log("Starting analysis...");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", JSON.stringify({ text: jobDescription }));
    console.log("FormData created:", formData);

    try {
      const response = await axios.post(`${API_URL}/api/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API response:", response.data);
      setAnalysisResults(response.data);
      setStep(3);
      toast.success("Analysis completed successfully!");
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      toast.error(
        error.response?.data?.detail ||
        "Failed to analyze resume. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
      console.log("Analysis finished.");
    }
  };

  const handleReset = () => {
    setStep(1);
    setResume(null);
    setJobDescription("");
    setAnalysisResults(null);
    toast.info("Ready to upload a new resume and job description");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Analizador de CVs
            </h1>
            <p className="text-muted-foreground">
              Sube tu CV y descripción del trabajo para obtener recomendaciones personalizadas.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-muted">
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>
            <div className="relative flex justify-around">
              {[
                { icon: FileText, label: "Subir CV" },
                { icon: Briefcase, label: "Detalles del Trabajo" },
                { icon: Brain, label: "Análisis AI" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-2 ${step > index + 1
                      ? "text-primary"
                      : step === index + 1
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step > index + 1
                        ? "bg-primary text-primary-foreground"
                        : step === index + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6">
            {step === 1 && (
              <UploadResume
                onFileSelect={(file) => {
                  setResume(file);
                  setStep(2);
                    toast.success("¡CV subido con éxito!");
                    console.log("CV subido:", file);
                }}
              />
            )}

            {step === 2 && (
              <JobDescription
                value={jobDescription}
                onChange={setJobDescription}
                onSubmit={handleAnalyze}
                isLoading={isAnalyzing}
              />
            )}

            {step === 3 && (
              <>
                {analysisResults ? (
                  <AnalysisResults recommendations={analysisResults} />
                ) : (
                  <p>Cargando resultados...</p>
                )}
                <Button onClick={handleReset} className="mt-4">
                  Subir nuevo CV y descripción del trabajo
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}