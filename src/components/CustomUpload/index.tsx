"use client"
import { uploadFile } from "@/api/auth.service";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { message } from "antd";
import Image from "next/image";

const CustomUploadSingle = ({ value, onChange, style }: any) => {
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setFile(value);
    }
  }, [value]);

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        handleFileChange(file);
      }
    },
  });

  const handleFileChange = async (file: File) => {
    try {
      const loadingKey = 'uploading';
      message.loading({ content: "Uploading file...", key: loadingKey });

      const response = await uploadFile(file);
      const uploadResponse = response as any;

      if (uploadResponse) {
        const cleanUrl = uploadResponse.data;

        message.destroy(loadingKey);
        message.success("File uploaded successfully");

        setFile(cleanUrl);

        
        if (onChange) {
          onChange(cleanUrl);
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      message.error("Error uploading file");
      console.error("Upload error:", err);
    }
  };

  const handleDeleteFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onChange) {
      onChange("");
    }
    setFile(null);
  };

  return (
    <div {...getRootProps()} style={style}>
      <input {...getInputProps()} />
      {file ? (
        <div className="relative w-full h-48 border-2 border-dashed border-gray-300  rounded-lg overflow-hidden">
          <Image
            src={file}
            alt="Uploaded file"
            fill
            className="object-contain"
            onError={(e) => {
              console.error("Image load error:", e);
              message.error("Error loading image");
            }}
          />
          <button
            onClick={handleDeleteFile}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-white hover:border-blue-500 transition-colors">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            Click or drag and drop to upload
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG, JPEG, GIF up to 5MB
          </p>
          </div>
      )}
    </div>
  );
};

export default CustomUploadSingle;