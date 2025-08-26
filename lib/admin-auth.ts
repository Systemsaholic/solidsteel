import { getIronSession, type IronSession, type SessionOptions } from "iron-session"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "solid-steel-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
}

export interface AdminSessionData {
  isLoggedIn: boolean
}

export async function getAdminSession(): Promise<IronSession<AdminSessionData>> {
  const session = await getIronSession<AdminSessionData>(cookies(), sessionOptions)
  return session
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)
  // Note: In a real app, you'd compare against a stored hash.
  // Here we are comparing the provided password with the one in env vars.
  return bcrypt.compare(password, hashedPassword)
}

export async function requireAuth() {
  const session = await getAdminSession()
  
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized")
  }
  
  return session
}
