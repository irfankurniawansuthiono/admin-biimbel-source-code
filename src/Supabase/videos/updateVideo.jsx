import { supabase } from "../../lib/supabase";

export default async function updateVideoSupabase(id, values) {
  try {
    await supabase.from("videos").update(values).eq("id", id);
    return true;
  } catch (e) {
    console.error("Error updating video:", e.message);
    return false;
  }
}
