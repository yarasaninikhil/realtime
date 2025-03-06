// // src/config/SupabaseClient.js
// import { createClient } from '@supabase/supabase-js';

// // Replace these with your actual Supabase project credentials
// const SUPABASE_URL = "https://ayqgyrpwqdxbgymvnyho.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cWd5cnB3cWR4Ymd5bXZueWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTgwODAsImV4cCI6MjA1MDA5NDA4MH0.Kds_lRYx_D2HV9ey4Gm0Z3fKwRMRN3785QecqgDbcVQ";

// const supabase = createClient("https://ayqgyrpwqdxbgymvnyho.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cWd5cnB3cWR4Ymd5bXZueWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTgwODAsImV4cCI6MjA1MDA5NDA4MH0.Kds_lRYx_D2HV9ey4Gm0Z3fKwRMRN3785QecqgDbcVQ");

// export default supabase;
// src/Client.jsx
// src/Client.jsx
// import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = 'your_supabase_url';
// const SUPABASE_KEY = 'your_supabase_key';

// // Create the Supabase client instance
// export const supabase = createClient("https://ayqgyrpwqdxbgymvnyho.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cWd5cnB3cWR4Ymd5bXZueWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTgwODAsImV4cCI6MjA1MDA5NDA4MH0.Kds_lRYx_D2HV9ey4Gm0Z3fKwRMRN3785QecqgDbcVQ" );  // Named export



import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ayqgyrpwqdxbgymvnyho.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cWd5cnB3cWR4Ymd5bXZueWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTgwODAsImV4cCI6MjA1MDA5NDA4MH0.Kds_lRYx_D2HV9ey4Gm0Z3fKwRMRN3785QecqgDbcVQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
