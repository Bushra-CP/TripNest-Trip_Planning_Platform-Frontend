import type { Area } from "react-easy-crop";

export const getCroppedImg = async (
  imageSrc: string,
  croppedAreaPixels: Area,
) => {
  const image = new Image();

  image.crossOrigin = "anonymous";

  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx?.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  return canvas.toDataURL("image/jpeg");
};
