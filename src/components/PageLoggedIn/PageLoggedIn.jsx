import { myTheme } from "../../theme/theme";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  useColorMode,
  Button,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  FiChevronDown,
  FiTv,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LinkItems = [
  { name: "Videos", icon: FiTv, href: "/videos", id: "Videos" },
  {
    name: "Users",
    icon: FaUser,
    href: "/users",
    id: "Users",
  },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      id={"pageLoggedIn"}
      transition="3s ease-in-out"
      bg={useColorModeValue(
        myTheme.colors.lightMode.background,
        myTheme.colors.darkMode.background
      )}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          cursor={"pointer"}
          onClick={() => navigate("/")}
          textAlign={"left"}
          ml={2}
          align={"center"}
          fontWeight={"bolder"}
          fontSize={{ base: "3xl", md: "2xl" }}
          color={useColorModeValue(
            myTheme.colors.lightMode.primary,
            myTheme.colors.darkMode.primary
          )}
        >
          BiimBel
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex gap={2} flexDirection={"column"}>
        {LinkItems.map((link) => (
          <NavItem
            id={link.id}
            key={link.name}
            icon={link.icon}
            href={link.href}
            onClick={() => navigate(link.href)}
          >
            {link.name}
          </NavItem>
        ))}
      </Flex>
    </Box>
  );
};

const NavItem = ({ id, icon, children, href, ...rest }) => {
  const location = useLocation();
  const linkColor = useColorModeValue(
    myTheme.colors.lightMode.textColor,
    myTheme.colors.darkMode.textColor
  );
  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        id={id}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        color={location.pathname === href ? "white" : linkColor}
        cursor="pointer"
        bg={location.pathname === href ? myTheme.colors.lightMode.primary : ""}
        _hover={{
          bg: useColorModeValue(
            myTheme.colors.lightMode.backgroundHover,
            myTheme.colors.darkMode.backgroundHover
          ),
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, onToggle, isOpen, ...rest }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={"20"}
      right={"0"}
      left={"0"}
      pos="fixed"
      zIndex={2}
      alignItems="center"
      bg={useColorModeValue(
        myTheme.colors.lightMode.background,
        myTheme.colors.darkMode.background
      )}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onToggle}
        variant="outline"
        aria-label="open menu"
        transition={"all 0.3s"}
        icon={
          isOpen ? (
            <Icon as={FiChevronsLeft} boxSize={8} />
          ) : (
            <Icon as={FiChevronsRight} boxSize={8} />
          )
        }
      />
      <Text
        textAlign={"left"}
        fontWeight={"bolder"}
        fontSize={{ base: "3xl", md: "2xl" }}
        display={{ base: "flex", md: "none" }}
        color={useColorModeValue(
          myTheme.colors.lightMode.primary,
          myTheme.colors.darkMode.primary
        )}
      >
        BiimBel
      </Text>
      <HStack spacing={{ base: "3", md: "6" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {/* <Avatar size={"sm"} src={data.user_metadata.avatar_url} /> */}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">BiimBel</Text>
                  <Text fontSize="xs" color="gray.600">
                    BiimBel.service@gmail.com
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue(
                myTheme.colors.lightMode.background,
                myTheme.colors.darkMode.background
              )}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const PageLoggedIn = memo(({ children }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue(
        myTheme.colors.lightMode.background,
        myTheme.colors.darkMode.background
      )}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={"xs"}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} isOpen={isOpen} onToggle={onToggle} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
});

export default PageLoggedIn;
