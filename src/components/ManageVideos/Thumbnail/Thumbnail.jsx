import { Box } from "@chakra-ui/react";

export default function Thumbnail(props) {
  return (
    <Box h={"100px"} bg={"gray.100"} w={"150px"}>
      <iframe
        width="100%"
        height="100%"
        src={props.link}
        title={props.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </Box>
  );
}
