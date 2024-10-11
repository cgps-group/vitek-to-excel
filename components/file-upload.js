"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { saveAs } from "file-saver";

import { Button } from "./ui/button.jsx";
import { Progress } from "./ui/progress.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.jsx";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setUploadStatus(null);
    setUploadProgress(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFile = async () => {
    if (!file) return;

    // const formData = new FormData();
    // formData.append("file", file);

    try {
      setUploadStatus(null);
      setUploadProgress(0);

      const response = await axios.post("/api/convert", file, {
        responseType: "blob",
        headers: { "Content-Type": "application/zip" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      // const fileName = response.headers["content-disposition"].match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
      saveAs(response.data, file.name.replace(/\.xpt$/i, ".xlsx"));

      setUploadStatus({ type: "success", message: "File uploaded successfully!" });
    }
    catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({ type: "error", message: "File upload failed. Please try again." });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Convert VITEK <code>.xpt</code> files to Excel</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <p>Drag and drop a <code>.xpt</code> file here,
              <br/ >
              or click to select a file</p>
            )}
            <Upload className="mx-auto mt-4" size={24} />
          </div>

          {file && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Selected file: {file.name}</p>
            </div>
          )}

          <Button
            className="w-full mt-4"
            onClick={uploadFile}
            disabled={!file || uploadProgress > 0}
          >
            Convert File
          </Button>

          {uploadProgress > 0 && (
            <Progress value={uploadProgress} className="mt-4" />
          )}

          {uploadStatus && (
            <Alert className="mt-4" variant={uploadStatus.type === "success" ? "default" : "destructive"}>
              {uploadStatus.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {uploadStatus.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>
                {uploadStatus.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
