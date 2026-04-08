import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://espkubufhxvmzitnlnyf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcGt1YnVmaHh2bXppdG5sbnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzEwNDIsImV4cCI6MjA4NzU0NzA0Mn0.irksCW0wbFygiHhMNv9TgFkxbKmVMqzLHv5Ukdlh5nQ";

export const supabase = createClient(supabaseUrl, supabaseKey);