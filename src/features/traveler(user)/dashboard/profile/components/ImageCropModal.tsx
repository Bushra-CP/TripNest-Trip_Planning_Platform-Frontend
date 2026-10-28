import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";

interface Props {
  image: string;
  onClose: () => void;
  onCropComplete: (image: string) => Promise<void>;
}

const ImageCropModal = ({ image, onClose, onCropComplete }: Props) => {
  const [isSaving, setIsSaving] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsSaving(true);

      const cropped = await getCroppedImg(image, croppedAreaPixels);

      onCropComplete(cropped);
    } finally {
      setIsSaving(false);
    }
  }, [croppedAreaPixels, image, onCropComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-125">
        <h2 className="text-xl font-bold mb-5">Crop Profile Picture</h2>

        <div className="relative h-87.5 bg-gray-200 rounded-xl overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="mt-6">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-xl border">
            Cancel
          </button>

          <button
            disabled={isSaving}
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#6c63ff] text-white disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
