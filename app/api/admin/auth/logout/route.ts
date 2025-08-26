import { type NextRequest, NextResponse } from "next/server"
import { getAdminSession } from "@/lib/admin-auth"

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  session.destroy()
  return NextResponse.json({ success: true })
}
