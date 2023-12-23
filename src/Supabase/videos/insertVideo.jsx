import { supabase } from "../../lib/supabase";

export const insertVideoSupabase = async (video) => {
  const { data, error } = await supabase.from("videos").insert([video]);
  if (error) {
    console.error("Error inserting video:", error.message);
    return false;
  } else {
    return true;
  }
};
