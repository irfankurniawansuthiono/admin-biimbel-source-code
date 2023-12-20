import { Input, Box, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (value) => {
    if (value !== "") {
      searchParams.set("q", value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };
  return (
    <Box maxW={"50%"}>
      <InputGroup>
        <InputLeftElement pointerEvents={"none"}>
          <IoIosSearch />
        </InputLeftElement>
        <Input
          type="text"
          variant={"filled"}
          placeholder="Search by title"
          border={"1px solid black"}
          leftIcon={<IoIosSearch />}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </InputGroup>
    </Box>
  );
}
