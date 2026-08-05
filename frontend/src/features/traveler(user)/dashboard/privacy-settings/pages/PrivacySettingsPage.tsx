import { ShieldCheck } from "lucide-react";
import ChangeEmailCard from "../components/ChangeEmailCard";
import ChangePasswordCard from "../components/ChangePasswordCard";

const PrivacySettingsPage = () => {
  return (
    <main className="flex-1 overflow-y-auto max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <div className="max-w-4xl mx-auto px-10 py-12 space-y-12">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Login & Security
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Manage your login credentials and security preferences to keep your
            travel data safe.
          </p>
        </div>

        {/* Login Credentials */}
        <section className="bg-white rounded-3xl md:rounded-4xl border border-[#cfdce4]/50 shadow-sm border-dashed p-1">
          <div className="bg-white p-5 sm:p-6 md:p-8">
            <header className="flex items-center gap-3 sm:gap-4 mb-6 md:mb-8">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2e7d32]/10 text-[#6c63ff] flex items-center justify-center">
                <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                Login Credentials
              </h2>
            </header>

            <div className="space-y-3 sm:space-y-4">
              <ChangeEmailCard />
              <ChangePasswordCard />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-4 sm:pt-6 text-center">
          <p className="text-[9px] sm:text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            © 2024 TripNest Secure Systems
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PrivacySettingsPage;
