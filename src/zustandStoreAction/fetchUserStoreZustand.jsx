import useUserStore from "../zustandStoreData/userStore";
import { fetchUsersSupabase } from "../Supabase/Users/fetchUsers";
export default async function fetchUsersStoreZustand() {
  try {
    const usersDB = await fetchUsersSupabase();
    useUserStore.setState({ users: usersDB });
  } catch (e) {}
}
