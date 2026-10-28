import {
  AlertTriangle,
  CreditCard,
  FileText,
  LayoutDashboard,
  Megaphone,
  Settings2,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

export const useAdminDashboard = () => {
  const revenueData = [
    { name: "Mon", revenue: 4000 },
    { name: "Tue", revenue: 3000 },
    { name: "Wed", revenue: 5000 },
    { name: "Thu", revenue: 2780 },
    { name: "Fri", revenue: 1890 },
    { name: "Sat", revenue: 2390 },
    { name: "Sun", revenue: 3490 },
  ];

  interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendType: "up" | "down";
  color: string;
}

  const stats:Stat[] = [
    {
      title: "Total Users",
      value: "124,592",
      icon: Users,
      trend: "+12.5%",
      trendType: "up",
      color: "bg-[#2e7d32]",
    },
    {
      title: "Active Trips",
      value: "8,234",
      icon: LayoutDashboard,
      trend: "+5.2%",
      trendType: "up",
      color: "bg-blue-600",
    },
    {
      title: "Total Revenue",
      value: "$2.4M",
      icon: CreditCard,
      trend: "+18.1%",
      trendType: "up",
      color: "bg-indigo-600",
    },
    {
      title: "Pending Reports",
      value: "42",
      icon: AlertTriangle,
      trend: "Requires attention",
      trendType: "down",
      color: "bg-red-500",
    },
  ];

  const users = [
    {
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      date: "Oct 24, 2023",
      status: "Active",
    },
    {
      name: "Michael Chen",
      email: "m.chen@example.com",
      date: "Oct 23, 2023",
      status: "Pending",
    },
    {
      name: "Elena Rodriguez",
      email: "elena.r@example.com",
      date: "Oct 22, 2023",
      status: "Active",
    },
    {
      name: "Arjun Malhotra",
      email: "arjun.m@tripnest.com",
      date: "Oct 21, 2023",
      status: "Active",
    },
  ];

  const quickActions = [
    {
      icon: Megaphone,
      label: "New Announcement",
      color: "bg-emerald-500",
    },
    {
      icon: UserPlus,
      label: "Invite Admin",
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      label: "Generate Report",
      color: "bg-indigo-500",
    },
    {
      icon: Settings2,
      label: "System Settings",
      color: "bg-slate-700",
    },
  ];

  const alerts = [
    {
      icon: AlertTriangle,
      title: "Payment Gateway Latency",
      desc: "Average response time > 2s",
      time: "10 mins ago",
      type: "critical" as const,
    },
    {
      icon: Settings2,
      title: "High Server Load",
      desc: "EU-West-1 node at 85% capacity",
      time: "1 hour ago",
      type: "warning" as const,
    },
  ];

  return {
    revenueData,
    stats,
    users,
    quickActions,
    alerts,
  };
};
