import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Select,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react";
import { RiVideoAddFill } from "react-icons/ri";
import { useRef, useState } from "react";

import { IoAddOutline } from "react-icons/io5";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import fetchVideosStoreZustand from "../../../zustandStoreAction/fetchVideosStoreZustand";
import { insertVideoSupabase } from "../../../Supabase/insertVideo";
import Swal from "sweetalert2";
export default function AddVideo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  return (
    <>
      <Flex alignItems={"center"} gap={2} my={5}>
        <Heading
          as={"h3"}
          size={{ base: "sm", md: "md", lg: "lg" }}
          display={{ base: "none", md: "block" }}
        >
          More Videos?
        </Heading>
        <Button
          colorScheme="green"
          variant="solid"
          leftIcon={<RiVideoAddFill />}
          onClick={onOpen}
        >
          Add
        </Button>
      </Flex>
      <Modal
        initialFocusRef={nameRef}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Video</ModalHeader>
          <Formik
            initialValues={{
              link_video: "",
              title_video: "",
              description_video: "",
              category_video: "",
              free: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.link_video) {
                errors.link_video = "Required";
              } else if (
                !values.link_video.includes("https://www.youtube.com/embed")
              ) {
                errors.link_video = "Invalid Link";
              }
              if (!values.title_video) {
                errors.title_video = "Required";
              }
              if (!values.description_video) {
                errors.description_video = "Required";
              }
              if (!values.category_video) {
                errors.category_video = "Required";
              }
              if (!values.free) {
                errors.free = "Required";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              try {
                const response = await insertVideoSupabase(values);
                if (response) {
                  Swal.fire({
                    title: "Success",
                    text: "Video Added",
                    icon: "success",
                    confirmButtonText: "Ok",
                  });
                  fetchVideosStoreZustand();
                } else {
                  Swal.fire({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error",
                    confirmButtonText: "Ok",
                  });
                }
                onClose();
              } catch (error) {
                console.log(error);
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
              <>
                <ModalBody pb={6}>
                  <FormControl
                    isRequired
                    isInvalid={errors.link_video && touched.link_video}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Youtube Link</FormLabel>
                      <FormErrorMessage color={"red.500"}>
                        {errors.link_video}
                      </FormErrorMessage>
                    </Flex>
                    <Input
                      name={"link_video"}
                      placeholder="Enter Youtube Embed Link"
                      value={values.link_video}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>

                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={errors.title_video && touched.title_video}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Title</FormLabel>
                      <FormErrorMessage>
                        {" "}
                        {errors.title_video}{" "}
                      </FormErrorMessage>
                    </Flex>
                    <Input
                      name={"title_video"}
                      placeholder="Enter the title"
                      value={values.title_video}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={errors.category_video && touched.category_video}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Category</FormLabel>
                      <FormErrorMessage>
                        {errors.category_video}
                      </FormErrorMessage>
                    </Flex>

                    <Input
                      name={"category_video"}
                      placeholder={"enter category address"}
                      value={values.category_video}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={errors.free && touched.free}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Status</FormLabel>
                      <FormErrorMessage>{errors.free}</FormErrorMessage>
                    </Flex>
                    <Select
                      name="free"
                      value={values.free}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="true">Free</option>
                      <option value="false">Paid</option>
                    </Select>
                  </FormControl>
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={
                      errors.description_video && touched.description_video
                    }
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Description</FormLabel>
                      <FormErrorMessage>
                        {errors.description_video}
                      </FormErrorMessage>
                    </Flex>
                    <Textarea
                      name="description_video"
                      placeholder="Enter description"
                      value={values.description_video}
                      resize="vertical"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    leftIcon={<IoAddOutline />}
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                  >
                    Add
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
