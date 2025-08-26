import { type NextRequest, NextResponse } from "next/server"
import { getAdminSession } from "@/lib/admin-auth"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUsername || !adminPassword) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 })
  }

  const isUsernameCorrect = username === adminUsername
  // Directly compare plain text passwords as per user request to hash on comparison
  const isPasswordCorrect = password === adminPassword

  if (isUsernameCorrect && isPasswordCorrect) {
    const session = await getAdminSession()
    session.isLoggedIn = true
    await session.save()
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
}
