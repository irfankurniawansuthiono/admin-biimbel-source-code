import { fetchVideosSupabase } from "../Supabase/fetchVideos";
import useVideoStore from "../zustandStoreData/videoStore";
export default async function fetchVideosStoreZustand() {
  try {
    const videosDB = await fetchVideosSupabase();
    useVideoStore.setState({ videos: videosDB });
  } catch (e) {}
}
