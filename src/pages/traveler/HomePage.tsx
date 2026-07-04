import {
  Search,
  Bell,
  Map,
  ArrowRight,
  Globe,
} from "lucide-react";
import {
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6"; // X (Twitter)


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-inter text-slate-900">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-black text-[#2e7d32] tracking-tight">
              TripNest
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a
                href="#"
                className="text-[#2e7d32] border-b-2 border-[#2e7d32] pb-1"
              >
                Plan
              </a>
              <a href="#" className="hover:text-[#2e7d32] transition-colors">
                Connect
              </a>
              
            </nav>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full hidden sm:block">
              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full h-10 pl-10 pr-4 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2e7d32]/20 transition-all outline-none"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
              <img
                src="https://i.pravatar.cc/150?u=tripper"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 space-y-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                One Place.{" "}
                <span className="text-[#2e7d32]">Every Indian Journey.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                Namaste! Plan your road trips across Bharat with AI, share
                authentic travel stories, and discover curated Indian
                experiences—all from one intelligent platform.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-8 h-12 bg-[#2e7d32] hover:bg-[#5a52d5] text-white font-bold rounded-lg shadow-lg shadow-[#2e7d32]/25 transition-all active:scale-95">
                  Start Planning
                </button>
                <button className="px-8 h-12 bg-white border border-slate-200 hover:border-[#2e7d32] hover:text-[#2e7d32] text-slate-700 font-bold rounded-lg transition-all active:scale-95">
                  Explore Trip Connect
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069"
                  alt="Munnar Tea Gardens"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI Planning Feature */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2e7d32]/10 text-[#2e7d32] rounded-full text-xs font-bold uppercase tracking-wider">
                <Map size={14} />
                AI-Powered Planning
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Smart Road Trips Across Bharat
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Discover the best routes from Munnar to Hampi. Use AI to
                generate personalized itineraries, compare vehicle profiles for
                Indian terrains, estimate fuel costs in ₹, and collaborate with
                your group in real-time.
              </p>
              <button className="flex items-center gap-2 text-[#2e7d32] font-bold hover:gap-3 transition-all">
                Explore AI Plan <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex-1 w-full relative">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071"
                  alt="Interactive Travel Map"
                  className="rounded-xl w-full h-auto shadow-lg opacity-80 mix-blend-multiply"
                />
                {/* Floating UI Element Mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
                  <div className="text-[10px] font-bold text-[#2e7d32] uppercase mb-1">
                    Current Trip
                  </div>
                  <div className="text-xs font-bold">Munnar to Goa</div>
                  <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2e7d32] w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Network Feature */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Globe size={14} />
                Travel Social Network
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Share Your Journey with the World
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Join a vibrant network of Indian explorers. Share your travel
                reels, discover breathtaking destinations through the eyes of
                others, and follow your favorite travel creators.
              </p>
              <button className="flex items-center gap-2 text-[#2e7d32] font-bold hover:gap-3 transition-all">
                Explore Feed <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <img
                    src="https://i.pinimg.com/1200x/ce/cc/0f/cecc0fc21fb49484dc21d0632e1b20ad.jpg"
                    className="rounded-2xl shadow-md w-full aspect-square object-cover"
                    alt="Hampi"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=500"
                    className="rounded-2xl shadow-md w-full aspect-video object-cover"
                    alt="Rajasthan"
                  />
                </div>
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=500"
                    className="rounded-2xl shadow-md w-full aspect-video object-cover"
                    alt="Varanasi"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=500"
                    className="rounded-2xl shadow-md w-full aspect-square object-cover"
                    alt="Kerala"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div className="space-y-4">
              <div className="text-2xl font-black text-[#2e7d32]">TripNest</div>
              <p className="text-slate-400 text-sm max-w-xs">
                Exploring the soul of India, one road at a time. AI-powered,
                human-driven.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Explore</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>
                    <a href="#" className="hover:text-[#2e7d32]">
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#2e7d32]">
                      AI Planner
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#2e7d32]">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>
                    <a href="#" className="hover:text-[#2e7d32]">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#2e7d32]">
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Contact</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-[#2e7d32] hover:text-white transition-all"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-[#2e7d32] hover:text-white transition-all"
                  >
                    <FaXTwitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <p>© 2024 TripNest AI. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Globe size={14} />
              <span>English (IN)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
