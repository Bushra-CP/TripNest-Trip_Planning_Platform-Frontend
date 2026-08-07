import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import AlertItem from "../components/AlertItem";
import QuickAction from "../components/QuickAction";
import StatCard from "../components/StatCard";
import UserRow from "../components/UserRow";

import { useAdminDashboard } from "../hooks/useAdminDashboard";

const AdminDashboardPage = () => {
  const {
    revenueData,
    stats,
    users,
    quickActions,
    alerts,
  } = useAdminDashboard();

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">

      {/* Welcome */}

      <section>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Welcome back, Admin
        </h2>

        <p className="text-slate-500 mt-1">
          Here's a summary of today's key platform metrics and recent activity.
        </p>
      </section>

      {/* Statistics */}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}

      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left */}

        <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

          <div className="p-6 border-b flex justify-between">

            <h3 className="text-lg font-black">
              Recent Registrations
            </h3>

            <button className="text-[10px] font-black uppercase text-[#2e7d32]">
              View All
            </button>

          </div>

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  User
                </th>

                <th>Date Joined</th>

                <th>Status</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <UserRow
                  key={user.email}
                  {...user}
                />

              ))}

            </tbody>

          </table>

          <div className="h-64 p-6">

            <ResponsiveContainer>

              <AreaChart data={revenueData}>

                <defs>

                  <linearGradient
                    id="colorRev"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2e7d32"
                      stopOpacity={0.15}
                    />

                    <stop
                      offset="95%"
                      stopColor="#2e7d32"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <Tooltip />

                <Area
                  dataKey="revenue"
                  stroke="#2e7d32"
                  fill="url(#colorRev)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* Right */}

        <div className="space-y-8">

          <section className="bg-white rounded-2xl border border-slate-200 p-8">

            <h3 className="text-sm font-black uppercase mb-6">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {quickActions.map((action) => (

                <QuickAction
                  key={action.label}
                  {...action}
                />

              ))}

            </div>

          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8">

            <div className="flex justify-between mb-6">

              <h3 className="text-sm font-black uppercase">
                System Alerts
              </h3>

              <span className="text-red-600 text-xs font-bold">
                2 New
              </span>

            </div>

            <div className="space-y-6">

              {alerts.map((alert) => (

                <AlertItem
                  key={alert.title}
                  {...alert}
                />

              ))}

            </div>

          </section>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboardPage;