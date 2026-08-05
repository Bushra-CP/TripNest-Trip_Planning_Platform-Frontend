import { User, Map, TrendingUp, Edit3 } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const ProfileStats = () => {
  const stats: StatItem[] = [
    {
      label: "Trips Planned",
      value: "14",
      icon: <Map className="text-[#6c63ff]" size={18} />,
    },
    {
      label: "Trips Completed",
      value: "10",
      icon: <TrendingUp className="text-[#6c63ff]" size={18} />,
    },
    {
      label: "Posts Shared",
      value: "128",
      icon: <Edit3 className="text-[#6c63ff]" size={18} />,
    },
    {
      label: "Followers",
      value: "1.2k",
      icon: <User className="text-[#6c63ff]" size={18} />,
    },
    {
      label: "Following",
      value: "450",
      icon: <User className="text-[#6c63ff]" size={18} />,
    },
  ];

  return (
    <section className="hidden md:grid grid-cols-5 lg:grid-cols-5 gap-4 md:gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            flex
            flex-col
            items-center
            rounded-4xl
            border
            border-[#cfdce4]/40
            bg-white
            p-5
            text-center
            shadow-sm
            transition-all
            hover:-translate-y-1
            hover:shadow-xl
            group
          "
        >
          <div
            className="
              hidden
              lg:flex
              mb-4
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-[#f8fbf4]
              transition-all
              group-hover:scale-110
              group-hover:bg-[#6c63ff]/10
            "
          >
            {stat.icon}
          </div>

          <p className="text-2xl font-black tracking-tight text-[#1a1c1e]">
            {stat.value}
          </p>

          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ProfileStats;
