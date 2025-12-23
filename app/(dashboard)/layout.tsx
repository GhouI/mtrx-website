import Sidebar01 from "@/components/sidebar-01"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar01 />
      {children}
    </div>
  )
}