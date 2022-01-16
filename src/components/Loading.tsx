import { Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Flex>
  );
}
