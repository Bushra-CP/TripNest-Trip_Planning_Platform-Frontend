import { User } from "lucide-react";
import { useProfileForm } from "../hooks/useProfileForm";
import { detectPlatform } from "../utils/detectPlatform";
import { getPlatformIcon } from "../utils/getPlatformIcon";

const ProfileForm = () => {
  const {
    email,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    fields,
    append,
    remove,
    watch,
    states,
    cities,
  } = useProfileForm();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6c63ff]/10">
          <User className="text-[#6c63ff]" size={20} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your account details and travel preferences.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              {...register("fullName")}
              placeholder="Enter your full name"
              className="
            h-12
            w-full
            rounded-xl
            border
            border-gray-200
            bg-slate-50
            px-4
            text-sm
            outline-none
            transition
            focus:border-[#6c63ff]
            focus:bg-white
            focus:ring-2
            focus:ring-[#6c63ff]/20
          "
            />

            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              value={email ?? ""}
              readOnly
              className="
            h-12
            w-full
            cursor-not-allowed
            rounded-xl
            border
            border-gray-200
            bg-gray-100
            px-4
            text-sm
            text-gray-500
          "
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              {...register("phone")}
              placeholder="+91 XXXXX XXXXX"
              className="
            h-12
            w-full
            rounded-xl
            border
            border-gray-200
            bg-slate-50
            px-4
            text-sm
            outline-none
            transition
            focus:border-[#6c63ff]
            focus:bg-white
            focus:ring-2
            focus:ring-[#6c63ff]/20
          "
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Country */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country
            </label>

            <select
              {...register("country")}
              className="
      h-12
      w-full
      rounded-xl
      border
      border-gray-200
      bg-slate-50
      px-4
      text-sm
      outline-none
      transition
      focus:border-[#6c63ff]
      focus:bg-white
      focus:ring-2
      focus:ring-[#6c63ff]/20
    "
            >
              <option value="India">India</option>
            </select>
          </div>

          {/* State */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              State
            </label>

            <select
              {...register("state")}
              className="
      h-12
      w-full
      rounded-xl
      border
      border-gray-200
      bg-slate-50
      px-4
      text-sm
      outline-none
      transition
      focus:border-[#6c63ff]
      focus:bg-white
      focus:ring-2
      focus:ring-[#6c63ff]/20
    "
            >
              <option value="">Select State</option>

              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>

            <select
              {...register("city")}
              className="
      h-12
      w-full
      rounded-xl
      border
      border-gray-200
      bg-slate-50
      px-4
      text-sm
      outline-none
      transition
      focus:border-[#6c63ff]
      focus:bg-white
      focus:ring-2
      focus:ring-[#6c63ff]/20
    "
            >
              <option value="">Select City</option>

              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reference ID */}

          {/* <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Reference ID
            </label>

            <input
              value={profile?.data.referenceId ?? ""}
              readOnly
              className="
            h-12
            w-full
            cursor-not-allowed
            rounded-xl
            border
            border-gray-200
            bg-gray-100
            px-4
            text-sm
            text-gray-500
          "
            />
          </div> */}

          {/* Bio */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bio
            </label>

            <textarea
              {...register("bio")}
              rows={5}
              placeholder="Tell other travelers a little about yourself..."
              className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-slate-50
            px-4
            py-3
            text-sm
            outline-none
            transition
            resize-none
            focus:border-[#6c63ff]
            focus:bg-white
            focus:ring-2
            focus:ring-[#6c63ff]/20
          "
            />

            {errors.bio && (
              <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
            )}
          </div>

          {/* Social Presence */}

          <div className="md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Social Presence
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Add links to your social profiles.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  append({
                    url: "",
                  })
                }
                className="
              rounded-lg
              bg-[#6c63ff]
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#5a52d5]
            "
              >
                + Add Link
              </button>
            </div>

            {fields.length === 0 ? (
              <div
                className="
              rounded-xl
              border
              border-dashed
              border-gray-300
              bg-slate-50
              p-8
              text-center
            "
              >
                <p className="text-sm text-gray-500">
                  No social links added yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                "
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                      <div className="flex-1">
                        {(() => {
                          const url = watch(`socialPresence.${index}.url`);

                          const platform = detectPlatform(url || "");

                          return (
                            <>
                              <label className="mb-2 block text-xs font-medium text-gray-600">
                                URL
                              </label>

                              <div className="flex items-center rounded-xl border border-gray-200 bg-slate-50 px-4">
                                <div className="mr-3">
                                  {getPlatformIcon(platform)}
                                </div>

                                <input
                                  {...register(`socialPresence.${index}.url`)}
                                  placeholder="https://github.com/yourname"
                                  className="
              h-12
              flex-1
              bg-transparent
              text-sm
              outline-none
            "
                                />
                              </div>

                              {errors.socialPresence?.[index]?.url && (
                                <p className="mt-2 text-xs text-red-500">
                                  {errors.socialPresence[index]?.url?.message}
                                </p>
                              )}
                            </>
                          );
                        })()}
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="
                      mt-6
                      rounded-lg
                      border
                      border-red-300
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reward Points */}
          {/* 
          <div className="space-y-3">
            <label className="ml-1 text-[12px] font-black uppercase tracking-widest text-slate-500">
              Reward Points
            </label>

            <input
              value={profile?.rewardPoints ?? 0}
              readOnly
              className="h-16 w-full cursor-not-allowed rounded-2xl border border-[#cfdce4]/40 bg-gray-100 px-6 text-lg font-bold text-gray-500"
            />
          </div> */}
        </div>

        {/* Submit Button */}

        <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Make sure your information is up to date.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
          rounded-xl
          bg-[#6c63ff]
          px-8
          py-3
          text-sm
          font-semibold
          text-white
          shadow-md
          transition-all
          hover:bg-[#5a52d5]
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
