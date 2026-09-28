import React, { useState } from 'react';
import {
  Compass,
  Search,
  Bell,
  ArrowLeft,
  Share2,
  Bookmark,
  MapPin,
  Heart,
  MessageSquare,
  Send,
  MoreHorizontal,
  Play,
  Maximize2,
  CheckCircle2,
  UserPlus,
  ChevronRight,
  Sparkles
} from 'lucide-react';



interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
  likes: number;
  isLiked?: boolean;
}

export const PostDetailPage2: React.FC = () => {
  // Post Engagement State
  const [likesCount, setLikesCount] = useState<number>(1420);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // New Comment State
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      author: 'Rohan Mehra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      timeAgo: '2 hours ago',
      text: 'Did you need a forest permit in advance for the Chembra trek? Or can we obtain it on the spot at the Meppadi checkpoint?',
      likes: 18,
      isLiked: false
    },
    {
      id: 'c2',
      author: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      timeAgo: '4 hours ago',
      text: 'The homestay food looks so authentic! Pinning this for my next trip in December. Was the Kabini water level high enough for smooth rafting?',
      likes: 9,
      isLiked: false
    }
  ]);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added: CommentItem = {
      id: `c-${Date.now()}`,
      author: 'Arjun Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      timeAgo: 'Just now',
      text: newComment.trim(),
      likes: 0
    };

    setComments(prev => [added, ...prev]);
    setNewComment('');
  };

  const handleCommentLike = (id: string) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id === id) {
          const liked = !c.isLiked;
          return {
            ...c,
            isLiked: liked,
            likes: liked ? c.likes + 1 : c.likes - 1
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F4FAFF] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-[#DCFCE7] selection:text-[#15803D]">
      {/* -------------------- TOP NAVIGATION BAR -------------------- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#15803D] flex items-center justify-center text-white shadow-md shadow-[#15803D]/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-[#0F172A] tracking-tight">TripNest</span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
              <a href="#" className="hover:text-[#15803D] transition-colors">
                Explore
              </a>
              <a href="#" className="hover:text-[#15803D] transition-colors">
                AI Planner
              </a>
              <a href="#" className="hover:text-[#15803D] transition-colors">
                Posts
              </a>
              <a
                href="#"
                className="text-[#15803D] font-extrabold px-3 py-1.5 rounded-full bg-[#DCFCE7]/70 border border-[#86EFAC]/40"
              >
                Community
              </a>
              <a href="#" className="hover:text-[#15803D] transition-colors">
                Support
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search places, stories, itineraries..."
                className="w-full h-9 pl-10 pr-4 rounded-full bg-[#F1F5F9] border border-transparent focus:border-[#15803D] focus:bg-white text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C] ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                alt="Arjun Sharma"
                className="w-8 h-8 rounded-full object-cover border border-[#15803D]/30 ring-2 ring-[#DCFCE7]"
              />
              <div className="hidden lg:block text-left leading-tight">
                <p className="text-xs font-bold text-slate-900">Arjun Sharma</p>
                <p className="text-[10px] text-slate-400 font-medium">Traveler</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------- SUB-HEADER BREADCRUMB BAR -------------------- */}
      <div className="border-b border-[#E2E8F0] bg-white/60 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between text-xs">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-[#15803D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Posts</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Post share link copied!')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              title="Share Story"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
                isSaved ? 'text-[#15803D]' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Bookmark Post"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#15803D]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- MAIN PAGE CONTAINER -------------------- */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Post Hero Header */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-[#15803D] text-[11px] font-black uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Wayanad, Kerala
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              • Trip Memoir • 3 Days Itinerary
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            My 3 Days in Wayanad
          </h1>

          <p className="text-base text-slate-600 font-medium max-w-3xl leading-relaxed">
            Mist-draped slopes, ancient stone carvings, bamboo journeys on Kabini, and homestyle Malabar spiced meals nestled in wild cardamom hills.
          </p>

          {/* Author Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                alt="Ananya Iyer"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#DCFCE7] border border-[#15803D]/20 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900">Ananya Iyer</h3>
                  <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                    Verified Explorer
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Yesterday at 4:30 PM • 5 min read
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
                isFollowing
                  ? 'bg-slate-100 text-slate-700 border border-slate-200'
                  : 'bg-[#15803D] hover:bg-[#166534] text-white shadow-[#15803D]/20'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </button>
          </div>
        </section>

        {/* -------------------- 2-COLUMN MAIN CONTENT GRID -------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: STORY CONTENT (8 COLS) ================= */}
          <article className="lg:col-span-8 space-y-8">
            {/* Pull Quote Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50/70 via-white to-white border border-[#DCFCE7] shadow-sm">
              <span className="text-5xl font-serif text-[#15803D]/30 absolute top-4 left-6 select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="text-sm sm:text-base italic font-semibold text-slate-800 leading-relaxed pl-6 relative z-10">
                &ldquo;Wayanad isn't merely a weekend retreat; it's a sensory immersion into rolling monsoon-nourished hills where every pine-scented turn whispers folk stories and aroma of fresh roasted pepper.&rdquo;
              </p>
            </div>

            {/* Day 1 Section */}
            <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15803D] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#15803D]/25">
                  1
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Chembra Peak Ascent &amp; The Heart-Shaped Lake
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We started before twilight broke over the Meppadi ranges. Getting to the base early is paramount because forest permits are capped strictly per morning. As we navigated the steep, wet earthen trails flanked by misting shola forests, the fog momentarily parted to unveil <em>Hridaya Saras</em>—the legendary heart-shaped high altitude lake. Standing at 1,500 meters, enveloped by silence with dew clinging to wild ferns, was sheer meditation.
              </p>

              {/* Dual image showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 group border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop"
                    alt="Hridaya Saras Heart Lake"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold">
                    Hridaya Saras Heart Lake
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 group border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                    alt="Meppadi Ridge View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold">
                    Meppadi Ridge View
                  </span>
                </div>
              </div>
            </section>

            {/* Day 2 Section */}
            <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15803D] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#15803D]/25">
                  2
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Edakkal's Petroglyphs &amp; Serene Bamboo Rafting
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Day two pivoted to history and water. Climbing the 300-plus steep steps to Edakkal Caves feels like walking back into 6,000 BCE. The Stone Age rock etchings depiction of human figures with peculiar headgear and ancient wheels remain enigmatic. In the afternoon, we moved down toward Pozhuthana for bamboo rafting on the slow-moving river. Drifting silently along bamboo groves while hornbills fly overhead is an unforgettable way to cool off.
              </p>

              {/* Video Player Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 group shadow-md border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
                  alt="Bamboo Rafting on Kabini River"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => alert('Playing: Bamboo Rafting on Kabini River (4K UHD)')}
                    className="w-14 h-14 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <p className="font-extrabold">Bamboo Rafting on Kabini River</p>
                    <p className="text-[10px] text-slate-300">4K UHD • Captured with Action Cam on Kabini Backwaters</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                      01:40
                    </span>
                    <button
                      onClick={() => alert('Fullscreen video expanded')}
                      className="p-1 rounded hover:bg-white/20 transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Day 3 Section */}
            <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15803D] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#15803D]/25">
                  3
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Muthanga Safari &amp; Cardamom Homestay Feasts
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our final dawn began in the Wayanad Wildlife Sanctuary at Muthanga. We encountered a small wild elephant herd foraging gracefully amidst moist deciduous teak woods, alongside chital deer and an elusive Malabar giant squirrel. We capped off the evening at our stay—a century-old plantation house where the hosts treated us to wood-fired Appams, spicy fish curry, and freshly steeped cardamom tea straight off their bushes.
              </p>

              {/* Video Player 2 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 group shadow-md border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
                  alt="Misty Sunrise at Banasura Dam"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => alert('Playing: Misty Sunrise at Banasura Dam (Drone Reel)')}
                    className="w-14 h-14 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <p className="font-extrabold">Misty Sunrise at Banasura Dam</p>
                    <p className="text-[10px] text-slate-300">Drone Reel • Banasura Sagar Reservoir at 06:15 AM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                      02:15
                    </span>
                    <button
                      onClick={() => alert('Fullscreen video expanded')}
                      className="p-1 rounded hover:bg-white/20 transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Photo Memories Gallery */}
            <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Photo Memories</h3>
                <span className="text-[11px] font-bold text-slate-400">Gallery • 6 items (click to enlarge)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop',
                    caption: 'Tea plantations'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
                    caption: 'Meenmutty stream'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop',
                    caption: 'Sadya banana leaf meal'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=600&auto=format&fit=crop',
                    caption: 'Wild elephants'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
                    caption: 'Treehouse stay'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop',
                    caption: 'Banasura reservoir'
                  }
                ].map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => alert(`Enlarging photo: ${photo.caption}`)}
                    className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-100 cursor-pointer border border-slate-200 hover:shadow-md transition-all"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['#Wayanad', '#Kerala', '#Travel', '#MistyHills', '#RoadTrip'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-slate-700 text-xs font-bold hover:bg-[#F0FDF4] hover:text-[#15803D] hover:border-[#DCFCE7] transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Engagement Action Bar */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
                <button
                  onClick={handleToggleLike}
                  className={`inline-flex items-center gap-2 transition-colors ${
                    isLiked ? 'text-rose-600' : 'hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 stroke-rose-600' : ''}`} />
                  <span>{likesCount.toLocaleString()}</span>
                </button>

                <div className="inline-flex items-center gap-2 text-slate-600">
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                  <span>{comments.length} comments</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    isSaved
                      ? 'bg-[#15803D] text-white shadow-md shadow-[#15803D]/25'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  <span>{isSaved ? 'Saved to My Trips' : 'Save to My Trips'}</span>
                </button>

                <button
                  onClick={() => alert('Post link copied to clipboard!')}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Comments Thread Section */}
            <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Comments ({comments.length})
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Sorted by Most Helpful</span>
              </div>

              {/* Add Comment Field */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                    alt="Arjun Sharma"
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1">
                    <textarea
                      rows={3}
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Write a comment or ask Ananya for route tips..."
                      className="w-full p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#15803D] focus:bg-white text-xs outline-none transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pl-12">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Helpful tips get pinned by the creator
                  </span>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Comment</span>
                  </button>
                </div>
              </form>

              {/* Existing Comments */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {comments.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{c.author}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{c.timeAgo}</span>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-normal pl-9">
                      {c.text}
                    </p>

                    <div className="flex items-center gap-4 pl-9 pt-1 text-[11px] font-bold text-slate-400">
                      <button
                        onClick={() => handleCommentLike(c.id)}
                        className={`inline-flex items-center gap-1 hover:text-rose-600 transition-colors ${
                          c.isLiked ? 'text-rose-600' : ''
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${c.isLiked ? 'fill-rose-600' : ''}`} />
                        <span>{c.likes}</span>
                      </button>

                      <button
                        onClick={() => alert(`Replying to ${c.author}...`)}
                        className="hover:text-slate-800 transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* ================= RIGHT COLUMN: CONTEXT & DISCOVERY SIDEBAR (4 COLS) ================= */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 1. Trip Itinerary Route Map Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Trip Itinerary Route</h3>
                  <p className="text-[11px] text-slate-400">Meppadi ➔ Sulthan Bathery ➔ Muthanga</p>
                </div>
                <span className="text-[10px] font-black text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full uppercase">
                  3 Stops
                </span>
              </div>

              {/* Map Preview Image */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-44 border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop"
                  alt="Route Map Wayanad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div>
                    <p className="font-extrabold">Wayanad High Loop</p>
                    <p className="text-[10px] text-slate-300">Total Route: 84 km • Scenic Ghats</p>
                  </div>
                  <button
                    onClick={() => alert('Opening Route Map View...')}
                    className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => alert('Redirecting to AI Itinerary Planner with Wayanad 3-Day Template...')}
                className="w-full py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-all shadow-md shadow-[#15803D]/25 flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open in AI Route Planner</span>
              </button>
            </div>

            {/* 2. Author Profile Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  alt="Ananya Iyer"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#DCFCE7] border border-[#15803D]/20 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Ananya Iyer</h4>
                  <p className="text-[11px] text-slate-400">Bangalore • 24 Trips Logged</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Storyteller, coffee fiend, and solo off-beat trekker exploring Western Ghats and Himalayan trails.
              </p>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                <div>
                  <p className="text-base font-black text-slate-900">24</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stories</p>
                </div>
                <div>
                  <p className="text-base font-black text-slate-900">14.2k</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Followers</p>
                </div>
                <div>
                  <p className="text-base font-black text-[#15803D]">4.9★</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</p>
                </div>
              </div>
            </div>

            {/* 3. Traveler Insights Quick Fact Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Compass className="w-4 h-4 text-[#15803D]" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Traveler Insights
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-500 font-medium">Best Season:</span>
                  <span className="font-bold text-slate-800">Oct – March</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-500 font-medium">Average Temp:</span>
                  <span className="font-bold text-slate-800">18°C – 26°C</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-500 font-medium">Local Transport:</span>
                  <span className="font-bold text-slate-800">Rental 4x4 / Scooters</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-500 font-medium">Permit Notice:</span>
                  <span className="font-bold text-emerald-700">Early Chembra Entry</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* -------------------- DESTINATION-BASED RELATED POSTS -------------------- */}
        <section className="pt-8 border-t border-[#E2E8F0] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>More Inspiration</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                More Posts from Wayanad
              </h2>
            </div>

            <a
              href="#"
              className="text-xs font-bold text-[#15803D] hover:underline inline-flex items-center gap-1"
            >
              <span>View All in Wayanad</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
                  alt="Hidden Places I Found in Wayanad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  5 photos
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Offbeat Trail
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#15803D] transition-colors">
                  Hidden Places I Found in Wayanad
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  Secret waterfalls, unmapped spice gardens, and small quiet mountain passes away from usual tourist routes.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span className="font-semibold text-slate-700">Vikram S.</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    850
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                  alt="Banasura Sagar Dam by Kayak"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center gap-1">
                  <Play className="w-3 h-3 fill-white" />
                  Video
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Water Adventure
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#15803D] transition-colors">
                  Banasura Sagar Dam by Kayak
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  Paddling early through the reservoir islands before motorboats arrive. Pure silence and mountain reflections.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span className="font-semibold text-slate-700">Meera J.</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    420
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop"
                  alt="Spices & Treehouses in Wayanad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  8 photos
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Unique Stays
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#15803D] transition-colors">
                  Spices &amp; Treehouses in Wayanad
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  Living 40 feet in the canopy! A comprehensive guide to plantation homestays that support local coffee farmers.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span className="font-semibold text-slate-700">Ashwin K.</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    1.1k
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* -------------------- GLOBAL FOOTER -------------------- */}
      <footer className="border-t border-[#E2E8F0] bg-white mt-16 py-10 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#15803D] flex items-center justify-center text-white font-black text-xs">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-sm">TripNest</span>
            <span className="text-slate-300 mx-2">|</span>
            <span>© 2024 TripNest Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold text-slate-600">
            <a href="#" className="hover:text-[#15803D] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#15803D] transition-colors">
              Help Center
            </a>
            <a href="#" className="hover:text-[#15803D] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#15803D] transition-colors">
              Community Guidelines
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PostDetailPage2;
