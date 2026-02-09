
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgumnoxcaebmfwokangc.supabase.co';
const supabaseKey = 'sb_publishable_SW5WDeff6NJwXotivx5ywQ_5A_3O-mI';

export const supabase = createClient(supabaseUrl, supabaseKey);
