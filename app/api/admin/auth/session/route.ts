import { type NextRequest, NextResponse } from "next/server"
import { getAdminSession } from "@/lib/admin-auth"

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  return NextResponse.json({ isLoggedIn: session.isLoggedIn ?? false })
}
