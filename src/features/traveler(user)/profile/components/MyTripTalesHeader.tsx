import {
  MapPin,
  Plus,
  Edit3,
  Share2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { HighlightItem, ProfileData } from "../types/my-trip-tales.types";

interface Props {
  profile: ProfileData;
  highlights: HighlightItem[];
  postCount: number;
  onCreatePost?: () => void;
  onEditProfile?: () => void;
  onShareProfile?: () => void;
  onHighlightClick?: (highlight: HighlightItem) => void;
}

const MyTripTalesHeader = ({
  profile,
  highlights,
  postCount,
  onCreatePost,
  onEditProfile,
  onShareProfile,
  onHighlightClick,
}: Props) => (
  <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8 space-y-6">
    <div className="flex flex-col items-start gap-6 md:flex-row md:gap-10">
      <div className="relative mx-auto shrink-0 md:mx-0">
        <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-[#15803D] via-[#4ADE80] to-[#166534] p-1 shadow-md sm:h-32 sm:w-32">
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="h-full w-full rounded-full border-2 border-white object-cover"
          />
        </div>
        <span className="absolute bottom-1 right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#15803D] text-white">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="w-full flex-1 space-y-4 text-center md:text-left">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              {profile.fullName}
            </h1>
            <p className="mt-1 text-xs font-semibold text-slate-400">
              {profile.username} · Travel storyteller
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            <button
              onClick={onCreatePost}
              className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-4 py-2 text-xs font-bold text-white hover:bg-[#166534]"
            >
              <Plus className="h-4 w-4" /> Create Post
            </button>
            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <Edit3 className="h-4 w-4" /> Edit Profile
            </button>
            <button
              onClick={onShareProfile}
              aria-label="Share profile"
              className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-7 border-y border-slate-100 py-3 md:justify-start">
          <Metric value={postCount} label="Posts" />
          <Metric value={profile.followers} label="Followers" />
          <Metric value={profile.following} label="Following" />
        </div>

        <p className="text-sm leading-relaxed text-slate-700">{profile.bio}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500 md:justify-start">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-1 text-[#15803D]">
            <ExternalLink className="h-3 w-3" /> TripNest explorer
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-800">
            <Sparkles className="h-3 w-3" /> Travel contributor
          </span>
        </div>
      </div>
    </div>

    {highlights.length > 0 && (
      <div className="border-t border-slate-100 pt-5">
        <p className="mb-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
          Featured Expeditions
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {highlights.map((item) => (
            <button
              key={item.id}
              onClick={() => onHighlightClick?.(item)}
              className="group flex shrink-0 flex-col items-center gap-1.5"
            >
              <span className="h-16 w-16 rounded-full border-2 border-emerald-500/40 p-0.5 group-hover:border-[#15803D]">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <span className="max-w-[80px] truncate text-[11px] font-bold text-slate-700">
                {item.title} {item.emoji}
              </span>
            </button>
          ))}
        </div>
      </div>
    )}
  </section>
);

const Metric = ({ value, label }: { value: number; label: string }) => (
  <div className="text-center md:text-left">
    <span className="text-lg font-black text-slate-900">
      {value.toLocaleString()}
    </span>
    <span className="ml-1.5 text-xs font-semibold text-slate-500">{label}</span>
  </div>
);

export default MyTripTalesHeader;
