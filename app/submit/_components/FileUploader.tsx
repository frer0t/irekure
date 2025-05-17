"use client";

import { FILES_UPLOAD_CONSTANTS } from "@/constants/files-upload";
import { ComplaintFormData } from "@/lib/zod/form";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface FileUploaderProps {
  form: UseFormReturn<ComplaintFormData>;
}

export function FileUploader({ form }: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setError(null);
      const fileList = Array.from(e.target.files);
      const currentFiles = form.getValues("files") || [];

      const invalidFiles = fileList.filter(
        (file) =>
          !FILES_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        setError(FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.INVALID_FILE_TYPE);
        return;
      }

      const oversizedFiles = fileList.filter(
        (file) => file.size > FILES_UPLOAD_CONSTANTS.MAX_FILE_SIZE
      );

      if (oversizedFiles.length > 0) {
        setError(FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE);
        return;
      }

      form.setValue("files", [...currentFiles, ...fileList]);
      form.trigger("files");
    }
  };

  const removeAttachment = (index: number) => {
    const currentAttachments = form.getValues("files") || [];
    const updatedAttachments = currentAttachments.filter((_, i) => i !== index);
    form.setValue("files", updatedAttachments);
    form.trigger("files");
  };

  return (
    <div>
      <span className="text-sm font-medium block mb-2">
        Amadosiye y'ingereka (optional)
      </span>
      <div className="flex flex-col space-y-3">
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
          <div className="space-y-1 text-center">
            <div className="flex justify-center">
              <CloudUpload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-primary">Kanda hano</span>{" "}
              cyangwa ukurure dosiye
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, PDF, DOCX (Max: 10MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
          />
        </label>

        {(form.watch("files") || []).length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">
              Amadosiye watoranyije ({(form.watch("files") || []).length})
            </p>
            <ul className="space-y-2">
              {(form.watch("files") || []).map((file: File, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center rounded-md bg-muted/30 px-3 py-2 text-sm"
                >
                  <span className="truncate max-w-[80%]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    Siba
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="p-4 mt-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <div className="flex items-start">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
