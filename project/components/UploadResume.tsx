"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, FileText} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadResumeProps {
  onFileSelect: (file: File) => void;
}

export default function UploadResume({ onFileSelect }: UploadResumeProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-blue-50">Sube tu CV</h2>
        <p className="text-blue-200">
          Soportamos archivos PDF y TXT de hasta 10MB
        </p>
      </div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${isDragActive
            ? "border-amber-400 bg-amber-400/10"
            : "border-blue-700 hover:border-amber-400/50 hover:bg-blue-800/50"
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-amber-400/10 rounded-full">
            <Upload className="w-8 h-8 text-amber-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium mb-1 text-blue-50">
                {isDragActive ? "Suelta tu archivo aquí" : "Arrastra y suelta tu CV"}
            </p>
            <p className="text-sm text-blue-200">
              o haz clic para buscar en tu computadora
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-6 bg-blue-800/50 rounded-xl border border-blue-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-400/10 rounded-lg">
              <FileText className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="font-medium text-blue-50">{selectedFile.name}</p>
              <p className="text-sm text-blue-200">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setSelectedFile(null)}
              className="rounded-lg"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onFileSelect(selectedFile)}
              className="rounded-lg bg-amber-500 hover:bg-amber-600 text-blue-950"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}