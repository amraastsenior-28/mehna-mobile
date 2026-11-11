import { createClient } from '@supabase/supabase-js';

/**
 * MEHNA Cloud Backend Client — Supabase Integration
 * 
 * Security Architecture:
 * - We strictly use the Publishable Key (`sb_publishable_...`) on the client/mobile app.
 * - Row-Level Security (RLS) is enabled on all PostgreSQL tables so the publishable
 *   key cannot bypass access controls (e.g., users can only read/write their own records).
 * - The Secret Key (`sb_secret_...`) is intentionally omitted here; it has superuser
 *   bypass powers and must only ever be utilized inside server-side Edge Functions.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://vrzdiozfzowbsdrrnvoc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_0gTrnaZ5B-KWhP-Ig2Ih3Q_56fmbQHj';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Prevents hash collision on Capacitor mobile WebViews
  },
});
