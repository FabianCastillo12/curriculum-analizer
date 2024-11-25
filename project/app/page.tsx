"use client";
import { useState } from "react";
import { FileText, Briefcase, Brain, Sparkles } from "lucide-react";
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
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-12 h-12 text-amber-400" />
              <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-amber-400">
                Analizador de CV
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Sube tu CV y descripción del trabajo para obtener recomendaciones personalizadas.
            </p>
          </div>
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-blue-800 rounded-full overflow-hidden">
              <Progress 
                value={(step / 3) * 100} 
                className="h-2 bg-gradient-to-r from-amber-400 to-amber-500" 
              />
            </div>
            <div className="relative flex justify-around">
              {[
                { icon: FileText, label: "Subir CV" },
                { icon: Briefcase, label: "Detalles del Trabajo" },
                { icon: Brain, label: "Análisis AI" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-3 ${
                    step > index + 1
                      ? "text-amber-400"
                      : step === index + 1
                      ? "text-amber-400"
                      : "text-blue-400"
                  }`}
                >
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step > index + 1
                        ? "bg-amber-400/20 ring-2 ring-amber-400 ring-offset-2 ring-offset-blue-950"
                        : step === index + 1
                        ? "bg-amber-400/20"
                        : "bg-blue-800"
                    }`}
                  >
                    {step === index + 1 && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                        <div className="absolute inset-0 rounded-full bg-amber-400/10 animate-pulse" />
                        <div className="absolute -inset-1 rounded-full border-2 border-amber-400/50 animate-[spin_3s_linear_infinite]" />
                      </>
                    )}
                    <item.icon className={`w-6 h-6 ${step === index + 1 ? "animate-bounce" : ""}`} />
                  </div>
                  <span className={`text-sm font-medium transition-all duration-300 ${
                    step === index + 1 ? "scale-110" : ""
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-blue-900/50 border-blue-800 backdrop-blur-sm">
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
                <Button 
                  onClick={handleReset} 
                  className="mt-4 bg-amber-500 text-white hover:bg-amber-500 focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-blue-950"
                >
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