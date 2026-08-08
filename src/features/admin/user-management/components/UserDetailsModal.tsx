import type { UserDetails } from "../types/user.types";

interface UserDetailsModalProps {
  open: boolean;
  user: UserDetails | null;
  onClose: () => void;
}

const UserDetailsModal = ({ open, user, onClose }: UserDetailsModalProps) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold">User Details</h2>
            <p className="text-sm text-slate-500">
              Complete traveler information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-8 p-6">
          {/* Profile */}
          <div className="flex items-center gap-5">
            <img
              src={user.profileImage ?? "/images/default-avatar.png"}
              alt={user.fullName}
              className="h-24 w-24 rounded-full border object-cover"
            />

            <div>
              <h3 className="text-2xl font-bold">{user.fullName}</h3>

              {user.phoneNumber && (
                <p className="text-slate-500">{user.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Basic */}
          <Section title="Basic Information">
            <InfoItem label="Reward Points" value={user.rewardPoints} />

            <InfoItem
              label="Created At"
              value={new Date(user.createdAt).toLocaleString()}
            />
          </Section>

          {/* Address */}
          <Section title="Address">
            <InfoItem label="Country" value={user.country || "-"} />

            <InfoItem label="State" value={user.state || "-"} />

            <InfoItem label="City" value={user.city || "-"} />
          </Section>

          {/* Bio */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Bio
            </h4>

            <div className="rounded-xl border bg-slate-50 p-4 text-sm">
              {user.bio || "No bio added."}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Social Presence
            </h4>

            {user.socialPresence.length === 0 ? (
              <p className="text-slate-500">No social links available.</p>
            ) : (
              <div className="space-y-2">
                {user.socialPresence.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    {item.url}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 font-semibold hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div>
    <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
      {title}
    </h4>

    <div className="grid grid-cols-2 gap-5">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div>
    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
      {label}
    </p>

    <p className="break-words text-sm font-semibold text-slate-800">{value}</p>
  </div>
);

export default UserDetailsModal;
