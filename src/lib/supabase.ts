import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env que es el estándar en Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Exportamos una función para obtener el cliente o null para prevenir el crash inmediato
export const getSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found in environment variables.');
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    return null;
  }
};

export const supabase = getSupabase();
