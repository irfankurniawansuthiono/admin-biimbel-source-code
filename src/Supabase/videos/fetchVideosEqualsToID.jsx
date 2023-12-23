import { supabase } from "../../lib/supabase";
export const fetchVideosEqualsToIdSupabase = async (id) => {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id);
  if (error) {
    console.log(error);
    return false;
  } else {
    return data[0];
  }
};
