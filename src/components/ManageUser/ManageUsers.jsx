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
import fetchUsersStoreZustand from "../../zustandStoreAction/fetchUserStoreZustand";
import UserList from "./UserList/UserList";
import useUserStore from "../../zustandStoreData/userStore";
import SearchBar from "../SearchBar/SearchBar";
export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const UsersDataDB = useUserStore((state) => state.users);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const filteredData = q
    ? users.filter((user) => user.name.toLowerCase().includes(q.toLowerCase()))
    : null;
  const filteredUsers = q ? (filteredData ? filteredData : null) : users;
  useEffect(() => {
    setUsers(UsersDataDB);
  }, [UsersDataDB]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        await fetchUsersStoreZustand();
      } catch (e) {}
    };
    fetchUsersData();
  }, []);

  return (
    <PageLoggedIn>
      <Box mt={20}>
        <Flex align={"center"} mt={10} justifyContent={"space-between"}>
          <SearchBar placeHolder={"Search by name"} />
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Manage Users of BiimBel courses</TableCaption>
            <Thead>
              <Tr>
                <Th>Created at</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users && users.length > 0
                ? filteredUsers.map((user) => (
                    <UserList key={user.id} {...user} />
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PageLoggedIn>
  );
}
