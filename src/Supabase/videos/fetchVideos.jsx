import { supabase } from "../../lib/supabase";
export const fetchVideosSupabase = async () => {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    console.log(error);
    return false;
  } else {
    return data;
  }
};
