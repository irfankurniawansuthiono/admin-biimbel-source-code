import { supabase } from "../../lib/supabase";

export const deleteVideoSupabase = async (videoId) => {
  const { data, error } = await supabase
    .from("videos")
    .delete()
    .eq("id", videoId);

  if (error) {
    console.error("Error deleting video:", error.message);
    return false;
  } else {
    return true;
  }
};
