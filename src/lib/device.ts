import { cookies } from "next/headers";
import { DEVICE_COOKIE, DEVICE_COOKIE_MAX_AGE } from "@/lib/constants";

/** Reads the anonymous device id cookie, if present. Safe in Server Components (read-only). */
export async function getDeviceId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(DEVICE_COOKIE)?.value;
}

/**
 * Reads the device id cookie, creating and persisting one if missing.
 * Only callable from Route Handlers / Server Actions (where cookie writes are allowed).
 */
export async function getOrCreateDeviceId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(DEVICE_COOKIE)?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  store.set(DEVICE_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: DEVICE_COOKIE_MAX_AGE,
    path: "/",
  });
  return id;
}
