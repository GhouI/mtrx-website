"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  DollarSign,
  Home,
  Infinity,
  HatGlasses,
  PieChart,
  Settings,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { Logo } from "@/components/sidebar/logo";
import type { Route } from "./nav-main";
import DashboardNavigation from "@/components/sidebar/nav-main";
import { NotificationsPopover } from "@/components/sidebar/nav-notifications";
import { NavUser } from "@/components/sidebar/nav-user";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const sampleNotifications = [
  {
    id: "1",
    avatar: "/avatars/01.png",
    fallback: "OM",
    text: "New order received.",
    time: "10m ago",
  },
  {
    id: "2",
    avatar: "/avatars/02.png",
    fallback: "JL",
    text: "Server upgrade completed.",
    time: "1h ago",
  },
  {
    id: "3",
    avatar: "/avatars/03.png",
    fallback: "HH",
    text: "New user signed up.",
    time: "2h ago",
  },
];

const dashboardRoutes: Route[] = [
  {
    id: "home",
    title: "Home",
    icon: <Home className="size-4" />,
    link: "overview",
  },
  {
    id: "agent",
    title: "Agent",
    icon: <HatGlasses className="size-4" />,
    link: "agent",
  },
  {
    id: "workflows",
    title: "Workflows",
    icon: <PieChart className="size-4" />,
    link: "workflow",
    subs: [
      {
        title: "Image",
        link: "/workflow/image",
        icon: <PieChart className="size-4" />,
      },
      {
        title: "Video",
        link: "/workflow/video",
        icon: <Activity className="size-4" />,
      },
    ],
  },
  {
    id: "facebook",
    title: "Facebook",
    icon: (
      <Image
        src="/facebook.svg"
        alt="facebook"
        width={4}
        height={4}
        className="size-4"
      />
    ),
    link: "facebook",
    subs: [
      {
        title: "Ads Account",
        link: "/facebook/adsaccount",
        icon: <PieChart className="size-4" />,
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="size-4" />,
    link: "#",
    subs: [
      { title: "General", link: "#" },
      { title: "Webhooks", link: "#" },
      { title: "Custom Fields", link: "#" },
    ],
  },
];

const teams = [
  { id: "1", name: "Alpha Inc.", logo: Logo, plan: "Free" },
  { id: "2", name: "Beta Corp.", logo: Logo, plan: "Free" },
  { id: "3", name: "Gamma Tech", logo: Logo, plan: "Free" },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data: session, isPending } = authClient.useSession();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Acme
            </span>
          )}
        </a>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <NotificationsPopover notifications={sampleNotifications} />
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>
      <SidebarFooter className="px-2">
        {!isPending && session ? (
          <NavUser
            user={{
              name: session?.user.name || "user",
              avatar: session?.user.image || "",
              email: session?.user.email || "user@gmail.com",
            }}
          />
        ) : (
          <NavUser
            user={{
              name: "Pending",
              avatar: "pending",
              email: "pending",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
