import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Bot,
  FileText,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  Trophy,
  User,
  Workflow,
  X
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { ShareButtons } from "./share-buttons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sidebarItems = [
  {
    name: "Home",
    href: "/dashboard/home",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Workflows",
    href: "/dashboard/workflow",
    icon: Workflow,
  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai-settings",
    icon: Bot,
  },
  {
    name: "Charity",
    href: "/dashboard/charity",
    icon: Heart,
  },
  {
    name: "File Center",
    href: "/dashboard/files",
    icon: FileText,
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
  {
    name: "Help & Community",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

// Sample chart data
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Stock Performance',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Portfolio Performance'
    }
  }
};

export function DashboardSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showChart, setShowChart] = useState(true);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">StockWiseCare</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
            </div>
            <nav className="flex-1 overflow-auto p-2">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.name}>
                    <SheetClose asChild>
                      <Link to={item.href}>
                        <Button
                          variant={pathname === item.href ? "secondary" : "ghost"}
                          className="w-full justify-start"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Button>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t p-4">
              <Button variant="ghost" className="w-full justify-start text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden h-screen w-64 flex-col border-r bg-background md:flex">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">StockWiseCare</h2>
        </div>
        <nav className="flex-1 overflow-auto p-2">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href}>
                  <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Chart Component */}
      {showChart && pathname === "/dashboard" && (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Portfolio Overview</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowChart(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Share Options */}
      {showShareOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Share StockWiseCare</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowShareOptions(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ShareButtons />
          </div>
        </div>
      )}
    </>
  );
}