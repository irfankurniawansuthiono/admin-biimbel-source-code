import { supabase } from "../lib/supabase";

export const fetchAdmin = async ({ username, password }) => {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("username, password")
      .eq("username", username.toLowerCase());

    if (error) {
      console.error("Error fetching admin:", error.message);
      return false;
    }

    if (data && data.length > 0) {
      const adminData = data[0];
      if (
        adminData.username.toLowerCase() === username.toLowerCase() &&
        adminData.password.toLowerCase() === password.toLowerCase()
      ) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error during fetchAdmin:", error.message);
    return false;
  }
};
