import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { ChangeEvent } from "react";

import type { AppDispatch } from "@/app/store";
import { base64ToFile } from "@/shared/utils/base64ToFile";

import { UpdateProfilePictureThunk } from "../redux/profile.thunk";

export const useProfileImage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [showCropper, setShowCropper] = useState(false);

  ////////////////////////////////////////////////////////////

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowCropper(true);
    };

    reader.readAsDataURL(file);
  };

  ////////////////////////////////////////////////////////////

  const uploadProfileImage = async (croppedImage: string) => {
    setPreviewImage(croppedImage);

    try {
      const file = await base64ToFile(croppedImage, "profile.jpg");

      await dispatch(
        UpdateProfilePictureThunk({
          profileImage: file,
        }),
      ).unwrap();

      // Clear preview because Redux now has the new image URL
      setPreviewImage(null);

      setShowCropper(false);
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////////////////////////////////////////////

  return {
    fileInputRef,

    previewImage,

    selectedImage,

    showCropper,

    setShowCropper,

    handleImageSelect,

    uploadProfileImage,
  };
};
