import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { myTheme } from "../../theme/theme";
import { fetchAdmin } from "../../Supabase/FetchAdmin";
export default function SignInPage() {
  const navigate = useNavigate();
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign In to access this page</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = "Required";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const admin = await fetchAdmin(values);
                  if (admin) {
                    setSubmitting(false);
                    sessionStorage.setItem("admin", true);
                    navigate("/videos");
                  } else {
                    alert("Wrong username or password");
                  }
                } catch (error) {
                  alert("An error occurred during login", error);
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <>
                    <FormControl id="username" isInvalid={errors.username}>
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Username</FormLabel>
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                      </Flex>
                      <Input
                        focusBorderColor={myTheme.colors.darkMode.primary}
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </>
                  <FormControl id="password" isInvalid={errors.password}>
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Password</FormLabel>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </Flex>
                    <Input
                      focusBorderColor={myTheme.colors.darkMode.primary}
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <Stack spacing={10} mt={5}>
                    <Button
                      bg={myTheme.colors.darkMode.primary}
                      color={"white"}
                      _hover={{
                        opacity: 0.7,
                      }}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
