"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, CheckCircle } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
}

export function UploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading" as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }, [])

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 20, 100)
            const newStatus = newProgress === 100 ? "processing" : file.status

            if (newProgress === 100) {
              setTimeout(() => {
                setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "completed" } : f)))
              }, 2000)
            }

            return { ...file, progress: newProgress, status: newStatus }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 5000)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload Invoices</CardTitle>
          <CardDescription>
            Drag and drop invoice files or click to browse. Supports PDF, PNG, JPG, and TIFF formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.tiff"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drop invoice files here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse your computer</p>
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Track the progress of your uploaded files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <FileText className="h-8 w-8 text-muted-foreground" />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            file.status === "completed"
                              ? "default"
                              : file.status === "processing"
                                ? "secondary"
                                : file.status === "error"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {file.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {file.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Progress value={file.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
