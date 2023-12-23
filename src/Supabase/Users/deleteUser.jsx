import { supabase } from "../../lib/supabase";

export const deleteUserSupabase = async (userID) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userID);

  if (error) {
    console.error("Error deleting video:", error.message);
    return false;
  } else {
    return true;
  }
};
