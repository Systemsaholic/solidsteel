import { getIronSession, type IronSession, type SessionOptions } from "iron-session"
import { cookies } from "next/headers"

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "solid-steel-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  },
}

export interface AdminSessionData {
  isLoggedIn: boolean
}

export async function getAdminSession(): Promise<IronSession<AdminSessionData>> {
  const cookieStore = await cookies()
  const session = await getIronSession<AdminSessionData>(cookieStore, sessionOptions)
  return session
}

export async function requireAuth() {
  const session = await getAdminSession()

  if (!session.isLoggedIn) {
    throw new Error("Unauthorized")
  }

  return session
}
