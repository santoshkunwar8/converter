export const DEVICE_COOKIE = "device_id";
export const DEVICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const FAVORITES_STORAGE_KEY = "cc:favorites";
export const RECENT_STORAGE_KEY = "cc:recent";
export const HISTORY_STORAGE_KEY_PREFIX = "cc:history:";

export const MAX_RECENT_TOOLS = 20;
export const MAX_HISTORY_ENTRIES = 20;

export const SITE_NAME = "QuickConvo";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
