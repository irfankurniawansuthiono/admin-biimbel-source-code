import { Tr, Td, Skeleton, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteUserSupabase } from "../../../Supabase/Users/deleteUser";
import fetchUsersStoreZustand from "../../../zustandStoreAction/fetchUserStoreZustand";
export default function UserList(props) {
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
          const result = await deleteUserSupabase(id);
          if (result) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchUsersStoreZustand();
          }
        }
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Something went wrong");
    }
  };
  return (
    <Tr>
      <Td maxW={{ base: "200px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={1}>
          <Text whiteSpace={"normal"}>{props.created_at}</Text>
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={1}>
          <Text whiteSpace={"normal"}>{props.name}</Text>
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px", md: "290px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={2}>
          <Text whiteSpace={"pre-wrap"}>{props.email}</Text>
        </Skeleton>
      </Td>
      <Td maxW={{ base: "200px", md: "290px" }}>
        <Skeleton isLoaded={!loading} fadeDuration={2.5}>
          <Text whiteSpace={"normal"}>
            {props.phone ? props.phone : "Not Verified"}
          </Text>
        </Skeleton>
      </Td>
      <Td>
        <Flex justifyContent={"space-between"}>
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
