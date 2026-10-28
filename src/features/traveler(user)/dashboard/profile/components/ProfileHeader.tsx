import { Camera, Mail } from "lucide-react";
import { useSelector } from "react-redux";

import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";

import ImageCropModal from "./ImageCropModal";
import { useProfileImage } from "../hooks/useProfileImage";

const ProfileHeader = () => {
  const user = useSelector(selectUser);

  const {
    fileInputRef,
    previewImage,
    selectedImage,
    showCropper,
    setShowCropper,
    handleImageSelect,
    uploadProfileImage,
  } = useProfileImage();

  const imageToShow = previewImage ?? user?.profileImage;

  return (
    <>
      <section>
        {/* ========================= MOBILE ========================= */}

        <div className="block bg-white px-6 pt-18 pb-3 md:hidden">
          <div className="flex items-start justify-between gap-4">
            {/* Left - Profile Image */}
            <div className="relative shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
                {imageToShow ? (
                  <img
                    src={imageToShow}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xl font-semibold">
                    {user?.fullName?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
          absolute
          bottom-0
          right-0
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-[#6c63ff]
          text-white
          shadow-lg
        "
              >
                <Camera size={14} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageSelect}
              />
            </div>

            {/* Right - User Info */}
            <div className="flex flex-col items-end text-right">
              <h1 className="text-xl font-bold text-slate-900">Arjun Sharma</h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} />
                <span>{user?.email}</span>
              </div>

              {/* <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={14} />
                <span>Member since: Oct 2023</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* ========================= DESKTOP ========================= */}

        <div className="relative hidden md:block">
          {/* Cover */}

          <div className="h-50 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069"
              alt="Cover"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>

          <div className="relative mx-auto -mt-28 max-w-6xl px-10">
            <div className="flex items-end gap-8">
              {/* Profile */}

              <div className="relative">
                <div className="h-56 w-56 overflow-hidden rounded-full border-10 border-white bg-white shadow-2xl">
                  {imageToShow ? (
                    <img
                      src={imageToShow}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-6xl font-bold text-gray-700">
                      {user?.fullName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="
              absolute
              bottom-5
              right-5
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#6c63ff]
              text-white
              shadow-xl
              hover:bg-[#5a52d5]
            "
                >
                  <Camera size={20} />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageSelect}
              />

              {/* User Details */}

              <div className="flex flex-1 items-end justify-between pb-4">
                <div>
                  <h1 className="mb-2 text-2xl font-black text-white drop-shadow-lg">
                    {user?.fullName}
                  </h1>

                  <div className="flex items-center gap-6 text-sm font-semibold text-slate-100">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      {user?.email}
                    </span>

                    {/* <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      Member since: Oct 2023
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cropper Modal */}
      {showCropper && (
        <ImageCropModal
          image={selectedImage}
          onClose={() => setShowCropper(false)}
          onCropComplete={uploadProfileImage}
        />
      )}
    </>
  );
};

export default ProfileHeader;
