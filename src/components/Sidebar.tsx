import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  LayoutDashboard, ChartPieIcon, User, Settings, Shield, Menu, X, ChevronLeft, ChevronRight 
} from "lucide-react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const isActive = (path: string) => location.pathname.startsWith(path);

  const sidebarItems = [
    {
      name: t('dashboard'),
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      showAlways: true
    },
    {
      name: t('charts'),
      path: "/charts",
      icon: <ChartPieIcon size={20} />,
      showAlways: true
    },
    {
      name: t('profile'),
      path: "/profile",
      icon: <User size={20} />,
      showAlways: true
    },
    {
      name: t('settings'),
      path: "/settings",
      icon: <Settings size={20} />,
      showAlways: true
    },
    {
      name: t('admin'),
      path: "/admin",
      icon: <Shield size={20} />,
      showAlways: user.role === "admin"
    }
  ];

  return (
    <div className="relative">
      <aside
        className={cn(
          "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <span className="font-bold text-xl">
              Prism<span className="text-primary">View</span>
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <div className="flex-1 pt-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {sidebarItems
              .filter(item => item.showAlways)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => {}}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
          </button>
        </div>
      </aside>

      {/* Mobile menu overlay trigger */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
    </div>
  );
};
