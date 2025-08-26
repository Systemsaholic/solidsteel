import type React from "react"
import { getAdminSession } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import AdminNavigation from "@/components/admin/admin-navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()

  if (!session.isLoggedIn) {
    redirect("/my-admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}
