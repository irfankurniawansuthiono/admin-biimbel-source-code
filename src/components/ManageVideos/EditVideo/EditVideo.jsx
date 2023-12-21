import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { RxUpdate } from "react-icons/rx";
import { useRef, useState } from "react";
import { fetchVideosEqualsToIdSupabase } from "../../../Supabase/fetchVideosEqualsToID";
import { IoAddOutline } from "react-icons/io5";
import { Formik } from "formik";
import fetchVideosStoreZustand from "../../../zustandStoreAction/fetchVideosStoreZustand";
import updateVideoSupabase from "../../../Supabase/updateVideo";
import Swal from "sweetalert2";
import { MdEditSquare } from "react-icons/md";
export default function EditVideo(id) {
  const [loadingFetchedData, setLoadingFetchedData] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef(null);
  const [dataFetched, setDataFetched] = useState({});
  async function fetchHandlerWhenClickTheToggle(id) {
    onOpen();

    try {
      const dataDB = await fetchVideosEqualsToIdSupabase(id.id);
      if (dataDB) {
        setDataFetched(dataDB);
        setLoadingFetchedData(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Flex alignItems={"center"}>
        <Button
          colorScheme="yellow"
          variant="solid"
          onClick={() => fetchHandlerWhenClickTheToggle(id)}
        >
          <MdEditSquare />
        </Button>
      </Flex>
      <Modal
        initialFocusRef={nameRef}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent transition={"all 0.3s"}>
          <>
            <ModalHeader>Edit Video</ModalHeader>
          </>
          {loadingFetchedData ? null : (
            <>
              <Formik
                initialValues={{
                  link_video: dataFetched
                    ? dataFetched.link_video
                    : "Error Fetched Data",
                  title_video: dataFetched
                    ? dataFetched.title_video
                    : "Error Fetched Data",
                  description_video: dataFetched
                    ? dataFetched.description_video
                    : "Error Fetched Data",
                  category_video: dataFetched
                    ? dataFetched.category_video
                    : "Error Fetched Data",
                  free: dataFetched ? dataFetched.free : "Error Fetched Data",
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
                    const response = await updateVideoSupabase(
                      dataFetched.id,
                      values
                    );
                    if (response) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Video Updated",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      setLoadingFetchedData(true);
                      fetchVideosStoreZustand();
                    } else {
                      Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something went wrong",
                        showConfirmButton: false,
                        timer: 1500,
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
                            {errors.title_video}
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
                        isInvalid={
                          errors.category_video && touched.category_video
                        }
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
                        colorScheme="orange"
                        mr={3}
                        leftIcon={<RxUpdate />}
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                      >
                        Update
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
