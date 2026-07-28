// import {
//   Control,
//   Controller,
//   FieldErrors,
//   useFieldArray,
// } from "react-hook-form";

// import { Plus, Trash2 } from "lucide-react";

// import { UpdateProfileDto } from "../dto/profile.dto";

// interface Props {
//   control: Control<UpdateProfileDto>;
//   errors: FieldErrors<UpdateProfileDto>;
// }

// const socialPlatforms = [
//   "Instagram",
//   "Facebook",
//   "X",
//   "LinkedIn",
//   "GitHub",
//   "YouTube",
//   "Website",
// ];

// const SocialPresenceInput = ({
//   control,
//   errors,
// }: Props) => {
//   const {
//     fields,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: "socialPresence",
//   });

//   return (
//     <div className="space-y-5">

//       <div className="flex items-center justify-between">

//         <div>

//           <h3 className="text-lg font-semibold">
//             Social Presence
//           </h3>

//           <p className="text-sm text-gray-500">
//             Share your social profiles.
//           </p>

//         </div>

//         <button
//           type="button"
//           onClick={() =>
//             append({
//               platform: "",
//               url: "",
//             })
//           }
//           className="
//             flex
//             items-center
//             gap-2
//             rounded-lg
//             bg-green-600
//             px-4
//             py-2
//             text-white
//           "
//         >
//           <Plus size={18} />

//           Add
//         </button>

//       </div>

//       {fields.length === 0 && (

//         <div className="rounded-xl border border-dashed p-8 text-center text-gray-400">
//           No social profiles added.
//         </div>

//       )}

//       {fields.map((field, index) => (

//         <div
//           key={field.id}
//           className="rounded-2xl border p-5 space-y-4"
//         >

//           {/* Platform */}

//           <div>

//             <label className="mb-2 block text-sm font-medium">
//               Platform
//             </label>

//             <Controller
//               control={control}
//               name={`socialPresence.${index}.platform`}
//               render={({ field }) => (
//                 <select
//                   {...field}
//                   className="w-full rounded-xl border p-3"
//                 >
//                   <option value="">
//                     Select Platform
//                   </option>

//                   {socialPlatforms.map((platform) => (
//                     <option
//                       key={platform}
//                       value={platform}
//                     >
//                       {platform}
//                     </option>
//                   ))}

//                 </select>
//               )}
//             />

//           </div>

//           {/* URL */}

//           <div>

//             <label className="mb-2 block text-sm font-medium">
//               Profile URL
//             </label>

//             <Controller
//               control={control}
//               name={`socialPresence.${index}.url`}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   placeholder="https://..."
//                   className="w-full rounded-xl border p-3"
//                 />
//               )}
//             />

//             <p className="mt-1 text-sm text-red-500">
//               {
//                 errors.socialPresence?.[index]?.url
//                   ?.message
//               }
//             </p>

//           </div>

//           <button
//             type="button"
//             onClick={() => remove(index)}
//             className="
//               flex
//               items-center
//               gap-2
//               text-red-500
//               hover:text-red-600
//             "
//           >
//             <Trash2 size={18} />

//             Remove
//           </button>

//         </div>

//       ))}

//     </div>
//   );
// };

// export default SocialPresenceInput;