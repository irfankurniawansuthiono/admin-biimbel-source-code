import PageLoggedIn from "../PageLoggedIn/PageLoggedIn";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
  TableCaption,
  Flex,
  Heading,
  TableContainer,
} from "@chakra-ui/react";
import fetchVideosStoreZustand from "../../zustandStoreAction/fetchVideosStoreZustand";
import VideoList from "./VideoList/VideoList";
import useVideoStore from "../../zustandStoreData/videoStore";
import SearchBar from "../SearchBar/SearchBar";
import AddVideo from "./AddVideo/AddVideo";
export default function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const videosDataDB = useVideoStore((state) => state.videos);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const filteredData = q
    ? videos.filter((video) =>
        video.title_video.toLowerCase().includes(q.toLowerCase())
      )
    : null;
  const filteredVideos = q ? (filteredData ? filteredData : null) : videos;
  useEffect(() => {
    setVideos(videosDataDB);
  }, [videosDataDB]);

  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        await fetchVideosStoreZustand();
      } catch (e) {}
    };
    fetchVideosData();
  }, []);

  return (
    <PageLoggedIn>
      <Box mt={20}>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Heading>Tutorial</Heading>
          <Box
            h={{ base: "200px", sm: "300px" }}
            bg={"gray.100"}
            w={{ base: "300px", sm: "500px" }}
          >
            <iframe
              width="100%"
              height="100%"
              src={
                "https://www.youtube.com/embed/wNuLRHaMNSQ?si=l_i3u9H9ccwqtobV"
              }
              title={"tutorial copy link videos"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
        </Flex>
        <Flex align={"center"} mt={10} justifyContent={"space-between"}>
          <AddVideo />
          <SearchBar placeHolder={"Search Video by title"} />
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Manage Videos of BiimBel courses</TableCaption>
            <Thead>
              <Tr>
                <Th>Video</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {videos && videos.length > 0
                ? filteredVideos.map((video) => (
                    <VideoList key={video.id} {...video} />
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PageLoggedIn>
  );
}
