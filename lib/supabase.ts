import { createClient } from '@supabase/supabase-js';

const getValidUrl = (url: string | undefined) => {
  try {
    if (url && url.startsWith('http')) {
      new URL(url);
      return url;
    }
  } catch (e) {
    // invalid url
  }
  return 'https://placeholder.supabase.co';
};

const supabaseUrl = getValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
