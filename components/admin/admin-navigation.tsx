"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut, LayoutDashboard, Briefcase, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/my-admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-admin/projects", label: "Projects", icon: Briefcase },
  { href: "/my-admin/case-studies", label: "Case Studies", icon: FileText },
]

export default function AdminNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.push("/my-admin/login")
    router.refresh()
  }

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn("flex items-center gap-4", isMobile ? "flex-col items-start gap-2" : "hidden md:flex")}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/my-admin" className="text-lg font-bold text-gray-900">
            Admin Panel
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:flex">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4">
                  <NavLinks isMobile />
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
