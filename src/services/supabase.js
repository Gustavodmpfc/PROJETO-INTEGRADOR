import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Use somente a anon public key no aplicativo. Nunca use service_role no frontend.
const supabaseUrl = 'https://imjxdtyugujvuwyghdbx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltanhkdHl1Z3VqdnV3eWdoZGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMjM4NjAsImV4cCI6MjA5NDc5OTg2MH0.Be2A84L3SdAm79i5FV4ub7gMns85bW-3Aioe34tP90E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
