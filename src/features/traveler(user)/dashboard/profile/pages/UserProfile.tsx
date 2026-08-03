import ProfileForm from "../components/ProfileForm";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";

export default function UserProfile() {
  return (
    <>
      <ProfileHeader />
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <ProfileStats />
        <ProfileForm/>
      </main>
    </>
  );
}
