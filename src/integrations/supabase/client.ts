
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aztnzmymohftmutxjfqc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dG56bXltb2hmdG11dHhqZnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjcxNzEsImV4cCI6MjA2MTQ0MzE3MX0.7g9UFsItEk3R7Nyv8y8OwycvXvQCIhJFLUq0csvJmPw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
