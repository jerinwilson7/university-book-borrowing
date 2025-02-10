"use client";

import { Upload } from "@/assets/icons";
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

interface ImageUploadProps {
  onFileChange: (filePath: string) => void;
}

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/auth/image-kit`);

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

export const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };
  const onError = (error: any) => {
    console.log(error);

    toast({
      title: "Image uploaded failed",
      description: `Your image could not be uploaded. Please try again later`,
      variant: "destructive",
    });
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
        fileName="test-upload.png"
      />

      <button className="upload-btn" onClick={(e) => uploadFile(e)}>
        <Image
          src={Upload}
          alt="upload-icon"
          height={20}
          width={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          src={`${urlEndpoint}${file.filePath}`}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};
