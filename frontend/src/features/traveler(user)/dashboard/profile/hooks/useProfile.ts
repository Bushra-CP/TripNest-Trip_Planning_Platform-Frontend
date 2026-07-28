// import { useEffect } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// // import {
// //     getProfileThunk,
// //     updateProfileThunk,
// // } from "../redux/profileThunk";

// // import {
// //     selectProfile,
// //     selectProfileLoading,
// //     selectProfileUpdating,
// // } from "../redux/profileSelectors";

// // import { UpdateProfileDto } from "../dto/profile.dto";

// // import { updateProfileSchema } from "../validation/profile.schema";

// export const useProfile = () => {
//     const dispatch = useAppDispatch();

//     // const profile = useAppSelector(selectProfile);

//     // const loading = useAppSelector(selectProfileLoading);

//     // const saving = useAppSelector(selectProfileUpdating);

//     const {
//         register,
//         control,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm<UpdateProfileDto>({
//         resolver: zodResolver(updateProfileSchema),

//         defaultValues: {
//             fullName: "",
//             phone: "",
//             location: "",
//             bio: "",
//             socialPresence: [],
//         },
//     });

//     const {
//         fields,
//         append,
//         remove,
//     } = useFieldArray({
//         control,
//         name: "socialPresence",
//     });

//     useEffect(() => {
//         dispatch(getProfileThunk());
//     }, [dispatch]);

//     useEffect(() => {
//         if (!profile) return;

//         reset({
//             fullName: profile.fullName,
//             phone: profile.phone,
//             location: profile.location,
//             bio: profile.bio,
//             socialPresence: profile.socialPresence,
//         });
//     }, [profile, reset]);

//     const onSubmit = (data: UpdateProfileDto) => {
//         dispatch(updateProfileThunk(data));
//     };

//     return {
//         register,

//         control,

//         errors,

//         loading,

//         saving,

//         fields,

//         append,

//         remove,

//         handleSubmit,

//         onSubmit,
//     };
// };