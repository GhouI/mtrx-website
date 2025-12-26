import { AppSidebar } from "@/components/sidebar-01/app-sidebar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <AppSidebar />
        </div>
    );
  }
  