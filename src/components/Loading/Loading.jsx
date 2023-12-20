import { myTheme } from "../../theme/theme";
import {
  Spinner,
  useColorModeValue,
  Center,
  Flex,
  calc,
} from "@chakra-ui/react";
export default function LoadingLoggedIn() {
  return (
    <Center className="loading">
      <Flex justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor={useColorModeValue(
            myTheme.colors.lightMode.background,
            myTheme.colors.darkMode.background
          )}
          color={myTheme.colors.lightMode.primary}
          size="xl"
        />
      </Flex>
    </Center>
  );
}
