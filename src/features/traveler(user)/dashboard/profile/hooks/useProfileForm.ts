import { useEffect, useMemo, useState } from "react";

import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";

import { State, City } from "country-state-city";

import {
  GetTravelerProfileThunk,
  UpdateTravelerProfileThunk,
} from "../redux/profile.thunk";

import type { UpdateTravelerProfileRequestDto } from "../dto/UpdateTravelerProfileRequestDto";
import { selectUser } from "../../../auth/redux/authSelectors";
import type { TravelerProfileResponseDto } from "../dto/TravelerProfileResponseDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTravelerProfileSchema } from "@/features/traveler(user)/auth/update-profile.schema";
import { toast } from "sonner";

export const useProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const email = user?.email;

  const [profile, setProfile] = useState<TravelerProfileResponseDto | null>(
    null,
  );

  /////////////////////////////////////////////////////////////

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateTravelerProfileRequestDto>({
    resolver: zodResolver(updateTravelerProfileSchema),

    defaultValues: {
      fullName: "",

      phone: "",

      country: "",

      city: "",

      bio: "",

      socialPresence: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialPresence",
  });

  /////////////////////////////////////////////////////////////
  const states = State.getStatesOfCountry("IN");

  const state = useWatch({
    control,
    name: "state",
  });

  const cities = useMemo(() => {
    if (!state) return [];

    return City.getCitiesOfState("IN", state);
  }, [state]);
  /////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await dispatch(GetTravelerProfileThunk()).unwrap();

        setProfile(profile);

        reset({
          fullName: profile.data.fullName,

          phone: profile.data.phone,

          country: profile.data.country,

          state: profile.data.state,

          city: profile.data.city,

          bio: profile.data.bio,

          socialPresence: profile.data.socialPresence,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [dispatch, reset]);

  /////////////////////////////////////////////////////////////

  const onSubmit = async (data: UpdateTravelerProfileRequestDto) => {
    try {
      console.log(data);

      const res = await dispatch(UpdateTravelerProfileThunk(data)).unwrap();

      toast.success(res.message);
    } catch (error) {
      console.error(error);

      // Error toast
    }
  };

  /////////////////////////////////////////////////////////////

  return {
    profile,

    email,

    register,

    handleSubmit,

    onSubmit,

    control,

    watch,

    errors,

    isSubmitting,

    isDirty,

    fields,

    append,

    remove,

    states,

    cities,
  };
};
