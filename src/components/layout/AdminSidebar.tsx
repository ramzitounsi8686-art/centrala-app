import { useState } from "react";
import { 
  Users, 
  Shield, 
  Menu, 
  Bell, 
  AlertTriangle, 
  Activity, 
  Settings, 
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Mail,
  Database,
  BarChart3,
  FileText,
  UserCheck,
  Globe
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

interface MenuItem {
  title: string;
  url: string;
  icon: any;
  badge?: number;
  children?: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "Vue d'ensemble",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Activité", url: "/activity", icon: Activity, badge: 12 }
    ]
  },
  {
    label: "Gestion des utilisateurs",
    items: [
      { 
        title: "Utilisateurs", 
        url: "/users", 
        icon: Users,
        children: [
          { title: "Tous les utilisateurs", url: "/users", icon: Users },
          { title: "Profils & Rôles", url: "/users/profiles", icon: Shield },
          { title: "Vérifications", url: "/users/verifications", icon: UserCheck },
        ]
      },
    ]
  },
  {
    label: "Administration",
    items: [
      {
        title: "Système",
        url: "/system",
        icon: Settings,
        children: [
          { title: "Menus dynamiques", url: "/system/menus", icon: Menu },
          { title: "Permissions", url: "/system/permissions", icon: Shield },
          { title: "Configuration", url: "/system/config", icon: Settings },
        ]
      },
      {
        title: "Communications",
        url: "/communications",
        icon: Mail,
        children: [
          { title: "Notifications", url: "/communications/notifications", icon: Bell, badge: 5 },
          { title: "Templates emails", url: "/communications/templates", icon: FileText },
          { title: "Multilingue", url: "/communications/languages", icon: Globe },
        ]
      },
    ]
  },
  {
    label: "Monitoring",
    items: [
      { title: "Exceptions", url: "/exceptions", icon: AlertTriangle, badge: 3 },
      { title: "Traçabilité", url: "/audit", icon: Database },
      { title: "Statistiques", url: "/analytics", icon: BarChart3 },
    ]
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Vue d'ensemble"]);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupLabel) 
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuTitle) 
        ? prev.filter(m => m !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  
  const isGroupActive = (items: MenuItem[]) => {
    return items.some(item => {
      if (isActive(item.url)) return true;
      if (item.children) {
        return item.children.some(child => isActive(child.url));
      }
      return false;
    });
  };

  const isMenuActive = (item: MenuItem) => {
    if (isActive(item.url)) return true;
    if (item.children) {
      return item.children.some(child => isActive(child.url));
    }
    return false;
  };

  const getNavClass = (active: boolean) =>
    cn(
      "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    );

  return (
    <Sidebar className={cn("border-r border-sidebar-border", collapsed ? "w-16" : "w-72")}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-sidebar-accent-foreground">
            Admin Panel
          </h2>
        )}
        <SidebarTrigger className="text-sidebar-foreground hover:text-sidebar-accent-foreground" />
      </div>

      <SidebarContent className="px-3 py-4">
        {menuGroups.map((group) => {
          const isGroupExpanded = expandedGroups.includes(group.label);
          const groupActive = isGroupActive(group.items);

          return (
            <SidebarGroup key={group.label} className="mb-6">
              <div 
                className={cn(
                  "flex items-center justify-between cursor-pointer mb-2",
                  !collapsed && "px-3"
                )}
                onClick={() => !collapsed && toggleGroup(group.label)}
              >
                {!collapsed && (
                  <>
                    <SidebarGroupLabel 
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wider",
                        groupActive ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                      )}
                    >
                      {group.label}
                    </SidebarGroupLabel>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isGroupExpanded ? "rotate-0" : "-rotate-90",
                      groupActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"
                    )} />
                  </>
                )}
              </div>

              {(!collapsed && isGroupExpanded) && (
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {group.items.map((item) => {
                      const hasChildren = item.children && item.children.length > 0;
                      const isMenuExp = expandedMenus.includes(item.title);
                      const menuActive = isMenuActive(item);

                      return (
                        <SidebarMenuItem key={item.title}>
                          <div>
                            <SidebarMenuButton asChild className="p-0">
                              <div
                                className={getNavClass(menuActive)}
                                onClick={() => hasChildren && toggleMenu(item.title)}
                              >
                                <div className="flex items-center flex-1">
                                  {!hasChildren ? (
                                    <NavLink 
                                      to={item.url} 
                                      className="flex items-center flex-1"
                                    >
                                      <item.icon className="h-4 w-4 mr-3 shrink-0" />
                                      <span className="truncate">{item.title}</span>
                                      {item.badge && (
                                        <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                          {item.badge}
                                        </span>
                                      )}
                                    </NavLink>
                                  ) : (
                                    <>
                                      <item.icon className="h-4 w-4 mr-3 shrink-0" />
                                      <span className="truncate flex-1">{item.title}</span>
                                      {item.badge && (
                                        <span className="bg-sidebar-primary text-sidebar-primary-foreground text-xs px-2 py-0.5 rounded-full mr-2">
                                          {item.badge}
                                        </span>
                                      )}
                                      <ChevronRight className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        isMenuExp && "rotate-90"
                                      )} />
                                    </>
                                  )}
                                </div>
                              </div>
                            </SidebarMenuButton>

                            {hasChildren && isMenuExp && (
                              <div className="ml-6 mt-1 space-y-1">
                                {item.children!.map((child) => (
                                  <SidebarMenuButton key={child.title} asChild className="p-0">
                                    <NavLink
                                      to={child.url}
                                      className={getNavClass(isActive(child.url))}
                                    >
                                      <child.icon className="h-3 w-3 mr-3 shrink-0" />
                                      <span className="truncate text-sm">{child.title}</span>
                                      {child.badge && (
                                        <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                                          {child.badge}
                                        </span>
                                      )}
                                    </NavLink>
                                  </SidebarMenuButton>
                                ))}
                              </div>
                            )}
                          </div>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}