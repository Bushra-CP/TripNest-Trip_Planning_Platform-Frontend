import React from "react";
import {
  LayoutDashboard,
  Users,
  Gavel,
  Flag,
  BarChart3,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Clock,
  ShieldAlert,
  RefreshCw,
  Download,
  CheckCircle2,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#f7f9fb] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-[#2e7d32] tracking-tighter uppercase">
              TripNest Admin
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              Super Admin Console
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
          />
          <NavItem icon={<Users size={20} />} label="User Management" />
          <NavItem icon={<Gavel size={20} />} label="Moderation" />
          <NavItem icon={<Flag size={20} />} label="Reports" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
            <img
              src="https://i.pravatar.cc/150?u=admin-alex"
              alt="Alex Rivera"
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-white"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">Alex Rivera</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                Principal Moderator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px]">
        {/* Top App Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative w-[400px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users, events, or reports..."
              className="w-full h-10 pl-10 pr-4 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#2e7d32]/20 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
              <HelpCircle size={20} />
            </button>
            <span className="text-sm font-bold text-slate-500 cursor-pointer hover:text-slate-800">
              Support
            </span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-1">
                Admin Dashboard
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Real-time overview of the TripNest ecosystem.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <Download size={16} /> Export Report
              </button>
              <button className="h-10 px-4 bg-[#2e7d32] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#256628] transition-colors shadow-lg shadow-[#2e7d32]/20">
                <RefreshCw size={16} /> Refresh Data
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              label="TOTAL USERS"
              value="128,432"
              trend="+ 12%"
              trendType="up"
              color="#2e7d32"
            />
            <StatCard
              label="ACTIVE ORGANIZERS"
              value="1,248"
              trend="+ 4.5%"
              trendType="up"
              color="#2e7d32"
            />
            <StatCard
              label="PENDING APPROVALS"
              value="247"
              subValue="82 Urgent"
              badges={["142 Reg", "105 Events"]}
              color="#f59e0b"
            />
            <StatCard
              label="ACTIVE REPORTS"
              value="18"
              subValue="High Priority"
              progress={75}
              color="#ef4444"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Tables */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">
                    Pending Organizer Requests
                  </h3>
                  <button className="text-xs font-bold text-[#2e7d32] hover:underline">
                    View All
                  </button>
                </header>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-3">Organizer Name</th>
                        <th className="px-6 py-3">Registration Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      <OrganizerRow
                        initials="MA"
                        name="Mountain Adventurers Co."
                        email="vancouver_tours@tripnest.com"
                        date="Oct 24, 2023"
                        time="14:22"
                        status="Pending Review"
                        statusColor="amber"
                      />
                      <OrganizerRow
                        initials="SL"
                        name="Skyline Luxury Stays"
                        email="admin@skyline-stays.io"
                        date="Oct 24, 2023"
                        time="11:45"
                        status="Pending Review"
                        statusColor="amber"
                      />
                      <OrganizerRow
                        initials="GT"
                        name="Global Trekkers Ltd."
                        email="contact@globaltrekkers.com"
                        date="Oct 23, 2023"
                        time="16:10"
                        status="Re-submission"
                        statusColor="pink"
                      />
                      <OrganizerRow
                        initials="NB"
                        name="Nature Bonds"
                        email="info@naturebonds.net"
                        date="Oct 23, 2023"
                        time="09:30"
                        status="Pending Review"
                        statusColor="amber"
                      />
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Widgets */}
            <div className="space-y-8">
              {/* Platform Load Widget */}
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <header className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800">Platform Load</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#2e7d32] rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      Optimal
                    </span>
                  </div>
                </header>

                {/* Bar Chart Mockup (SVG) */}
                <div className="h-32 w-full flex items-end justify-between gap-1 mb-4">
                  {[40, 65, 55, 45, 80, 50, 70, 90, 40, 60, 50, 65, 85, 95].map(
                    (h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-sm ${h > 80 ? "bg-[#2e7d32]" : "bg-[#2e7d32]/30"}`}
                      ></div>
                    ),
                  )}
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>00:00</span>
                  <span>12:00</span>
                  <span>NOW</span>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">
                      Uptime
                    </span>
                    <span className="text-xs font-bold">99.98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">
                      API Response
                    </span>
                    <span className="text-xs font-bold">124ms</span>
                  </div>
                </div>
              </section>

              {/* System Activity */}
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">
                  System activity
                </h3>
                <div className="space-y-6 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-100"></div>

                  <ActivityItem
                    icon={<CheckCircle2 size={16} className="text-[#2e7d32]" />}
                    title="New Organizer verified"
                    detail="Summit Safaris"
                    time="2 minutes ago • Automated"
                  />
                  <ActivityItem
                    icon={<ShieldAlert size={16} className="text-red-500" />}
                    title="Critical Report filed"
                    detail="event #8841"
                    time="14 minutes ago • User ID: 4192"
                  />
                  <ActivityItem
                    icon={<Clock size={16} className="text-amber-500" />}
                    title="Security Alert: Failed login"
                    detail="Multiple attempts"
                    time="1 hour ago • IP: 192.168.1.1"
                  />
                  <ActivityItem
                    icon={<RefreshCw size={16} className="text-blue-500" />}
                    title="System Update deployed"
                    detail="v2.4.1"
                    time="3 hours ago • Deployment Bot"
                  />
                </div>
                <button className="w-full mt-6 py-2 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors">
                  Load more activity
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? "bg-emerald-50 text-[#2e7d32] font-bold shadow-sm shadow-emerald-900/5"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    <span
      className={
        active ? "text-[#2e7d32]" : "text-slate-400 group-hover:text-[#2e7d32]"
      }
    >
      {icon}
    </span>
    <span className="text-sm">{label}</span>
  </a>
);

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendType?: "up" | "down";
  subValue?: string;
  badges?: string[];
  progress?: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendType,
  subValue,
  badges,
  progress,
  color,
}) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      {trend && (
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            trendType === "up"
              ? "bg-emerald-50 text-[#2e7d32]"
              : "bg-red-50 text-red-500"
          }`}
        >
          {trend}
        </span>
      )}
    </div>
    <div className="flex items-baseline gap-2">
      <p className="text-3xl font-black tracking-tight">{value}</p>
      {subValue && (
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          {subValue}
        </span>
      )}
    </div>

    {badges && (
      <div className="flex gap-2 mt-4">
        {badges.map((b, i) => (
          <span
            key={i}
            className="text-[9px] font-black px-2 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-100 uppercase tracking-tight"
          >
            {b}
          </span>
        ))}
      </div>
    )}

    {progress && (
      <div className="mt-6 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${progress}%`, backgroundColor: color }}
          className="h-full"
        ></div>
      </div>
    )}

    <div
      className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ backgroundColor: color }}
    ></div>
  </div>
);

interface OrganizerRowProps {
  initials: string;
  name: string;
  email: string;
  date: string;
  time: string;
  status: string;
  statusColor: "amber" | "pink";
}

const OrganizerRow: React.FC<OrganizerRowProps> = ({
  initials,
  name,
  email,
  date,
  time,
  status,
  statusColor,
}) => {
  const colors = {
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    pink: "bg-pink-50 text-pink-700 border-pink-100",
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <div>
            <p className="font-bold text-slate-800">{name}</p>
            <p className="text-xs text-slate-500 font-medium">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-xs font-bold text-slate-700">{date}</p>
        <p className="text-[10px] text-slate-400 font-medium">{time}</p>
      </td>
      <td className="px-6 py-4">
        <span
          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border uppercase tracking-wider ${colors[statusColor as keyof typeof colors]}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="h-8 px-4 bg-[#2e7d32] text-white text-[10px] font-bold uppercase rounded-lg hover:bg-[#256628] transition-colors">
            Approve
          </button>
          <button className="h-8 px-4 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded-lg hover:bg-slate-50 transition-colors">
            Details
          </button>
        </div>
      </td>
    </tr>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  detail,
  time,
}) => (
  <div className="flex gap-4 relative z-10">
    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-800">
        <span className="text-[#2e7d32]">{title.split(":")[0]}</span>
        {title.includes(":") ? ":" : ""}{" "}
        {title.includes(":") ? title.split(":")[1] : ""}
      </p>
      <p className="text-xs text-slate-500 font-medium mb-1">{detail}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        {time}
      </p>
    </div>
  </div>
);

export default AdminDashboard;
