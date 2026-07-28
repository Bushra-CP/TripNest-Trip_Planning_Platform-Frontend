// import { User, Phone, MapPin, FileText } from "lucide-react";

// import { useProfile } from "../hooks/useProfile";
// import AvatarUploader from "./AvatarUploader";
// import SocialPresenceInput from "./SocialPresenceInput";

// const ProfileForm = () => {
//     const {
//         register,
//         control,
//         errors,
//         saving,
//         handleSubmit,
//         onSubmit,
//     } = useProfile();

//     return (
//         <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-8 rounded-3xl bg-white p-8 shadow-sm"
//         >
//             {/* Heading */}

//             <div>
//                 <h2 className="text-2xl font-bold">
//                     Personal Information
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                     Keep your profile up to date.
//                 </p>
//             </div>

//             {/* Avatar */}

//             <AvatarUploader />

//             {/* Full Name */}

//             <div>

//                 <label className="mb-2 block text-sm font-medium">
//                     Full Name
//                 </label>

//                 <div className="relative">

//                     <User
//                         size={18}
//                         className="absolute left-4 top-4 text-gray-400"
//                     />

//                     <input
//                         {...register("fullName")}
//                         className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-green-600 focus:outline-none"
//                     />

//                 </div>

//                 <p className="mt-1 text-sm text-red-500">
//                     {errors.fullName?.message}
//                 </p>

//             </div>

//             {/* Phone */}

//             <div>

//                 <label className="mb-2 block text-sm font-medium">
//                     Phone Number
//                 </label>

//                 <div className="relative">

//                     <Phone
//                         size={18}
//                         className="absolute left-4 top-4 text-gray-400"
//                     />

//                     <input
//                         {...register("phone")}
//                         className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-green-600 focus:outline-none"
//                     />

//                 </div>

//                 <p className="mt-1 text-sm text-red-500">
//                     {errors.phone?.message}
//                 </p>

//             </div>

//             {/* Location */}

//             <div>

//                 <label className="mb-2 block text-sm font-medium">
//                     Location
//                 </label>

//                 <div className="relative">

//                     <MapPin
//                         size={18}
//                         className="absolute left-4 top-4 text-gray-400"
//                     />

//                     <input
//                         {...register("location")}
//                         className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-green-600 focus:outline-none"
//                     />

//                 </div>

//                 <p className="mt-1 text-sm text-red-500">
//                     {errors.location?.message}
//                 </p>

//             </div>

//             {/* Bio */}

//             <div>

//                 <label className="mb-2 block text-sm font-medium">
//                     Bio
//                 </label>

//                 <div className="relative">

//                     <FileText
//                         size={18}
//                         className="absolute left-4 top-4 text-gray-400"
//                     />

//                     <textarea
//                         rows={5}
//                         {...register("bio")}
//                         className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-green-600 focus:outline-none"
//                     />

//                 </div>

//                 <p className="mt-1 text-sm text-red-500">
//                     {errors.bio?.message}
//                 </p>

//             </div>

//             {/* Social Links */}

//             <SocialPresenceInput
//                 control={control}
//                 errors={errors}
//             />

//             {/* Save */}

//             <button
//                 type="submit"
//                 disabled={saving}
//                 className="
//                     w-full
//                     rounded-xl
//                     bg-green-600
//                     py-3
//                     font-semibold
//                     text-white
//                     transition
//                     hover:bg-green-700
//                     disabled:cursor-not-allowed
//                     disabled:opacity-60
//                 "
//             >
//                 {saving ? "Saving..." : "Save Changes"}
//             </button>
//         </form>
//     );
// };

// export default ProfileForm;