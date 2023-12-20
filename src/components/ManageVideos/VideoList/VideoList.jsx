import { Tr, Td, Skeleton, Text, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import EditVideo from "../EditVideo/EditVideo";
import Thumbnail from "../Thumbnail/Thumbnail";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteVideoSupabase } from "../../../Supabase/deleteVideo";
import fetchVideosStoreZustand from "../../../zustandStoreAction/fetchVideosStoreZustand";
export default function VideoList(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const deleteHandler = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await deleteVideoSupabase(id);
          if (result) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchVideosStoreZustand();
          }
        }
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Something went wrong");
    }
  };
  const editHandler = async (id) => {
    navigate(`/update?id=${id}`);
  };
  return (
    <Tr>
      <Td>
        <Skeleton isLoaded={!loading} fadeDuration={0.5}>
          <Thumbnail link={props.link_video} title={props.title_video} />
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px", md: "290px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={1}>
          <Text whiteSpace={"normal"}>{props.title_video}</Text>
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px", md: "290px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={1.5}>
          <Text whiteSpace={"normal"}>{props.link_video}</Text>
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px", md: "290px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={2}>
          <Text whiteSpace={"normal"}>{props.description_video}</Text>
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px", md: "290px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={2.5}>
          <Text whiteSpace={"normal"}>{props.category_video}</Text>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!loading} fadeDuration={3}>
          <Text>{props.free ? "Free" : "Paid"}</Text>
        </Skeleton>
      </Td>
      <Td>
        <Flex justifyContent={"space-between"} gap={2}>
          <Skeleton isLoaded={!loading} fadeDuration={4}>
            <EditVideo id={props.id} />
          </Skeleton>
          <Skeleton isLoaded={!loading} fadeDuration={3.5}>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={() => deleteHandler(props.id)}
            >
              <MdDeleteForever />
            </Button>
          </Skeleton>
        </Flex>
      </Td>
    </Tr>
  );
}
