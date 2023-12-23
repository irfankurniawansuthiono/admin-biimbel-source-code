import { supabase } from "../../lib/supabase";
export const fetchUsersSupabase = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.log(error);
    return false;
  } else {
    return data;
  }
};
