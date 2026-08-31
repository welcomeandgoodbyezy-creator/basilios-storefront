import { hash, compare } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export const SESSION_COOKIE = 'luto-session'

export async function hashPassword(password: string) {
  return hash(password, 10)
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash)
}

export async function createSessionToken(userId: number, role: string) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return { userId: Number(payload.sub), role: payload.role as string }
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}