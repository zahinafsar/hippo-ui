"use client";
import { useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import { FileInput, FilePreview } from "@/components/ui/file-input";

export default function FileInputPreview() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="flex w-96 flex-col gap-3">
      <FileInput
        multiple
        accept="image/*"
        value={files}
        onValueChange={setFiles}
        className="w-full"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-6 py-8 text-sm text-muted-foreground transition-colors hover:border-ring hover:text-foreground group-data-[drag-over]:border-ring group-data-[drag-over]:bg-accent group-data-[drag-over]:text-foreground">
          <UploadCloudIcon className="size-6" />
          <div className="text-center">
            <span className="font-medium text-foreground">Click to upload</span>
            <span> or drag and drop</span>
            <div className="text-xs">image/*</div>
          </div>
        </div>
      </FileInput>
      <FilePreview files={files} onRemove={(i) => setFiles(files.filter((_, j) => j !== i))} />
    </div>
  );
}
