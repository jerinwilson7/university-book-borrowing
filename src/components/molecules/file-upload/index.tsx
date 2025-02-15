"use client";

import { Upload } from "@/assets/icons";
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

interface FileUploadProps {
  accept: string;
  placeholder: string;
  folder: string;
  value?: string;
  type: "image" | "video";
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
}

const authenticator = async () => {
  try {
    const response = await fetch(
      `${config.env.apiEndpoint}/api/auth/image-kit`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);

      throw new Error(
        `Request failed with status code ${response.status} : ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed : ${error.message}`);
  }
};

const {
  env: {
    imageKit: { privateKey, publicKey, urlEndpoint },
  },
} = config;

export const FileUpload = ({
  onFileChange,
  accept,
  folder,
  placeholder,
  variant,
  type,
  value,
}: FileUploadProps) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-slate-500",
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
    });
  };
  const onError = (error: any) => {
    console.log(error);

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again later`,
      variant: "destructive",
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };
  const uploadFile = async (e: FormEvent) => {
    e.preventDefault();

    if (IKUploadRef.current) {
      //@ts-ignore
      IKUploadRef.current.click();
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        useUniqueFileName={true}
        validateFile={onValidate}
        folder={folder}
        accept={accept}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round(loaded / total) * 100;
          setProgress(percent);
        }}
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => uploadFile(e)}
      >
        <Image
          src={Upload}
          alt="upload-icon"
          height={20}
          width={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
        
          <IKImage
            alt={file.filePath!}
            path={file.filePath!}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath!}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};