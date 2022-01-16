import { Container, Flex, FlexProps, Text } from '@chakra-ui/react';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <Container as="main" paddingY={6} maxW="container.lg">
        {children}
      </Container>
    </div>
  );
}

function Header() {
  return (
    <Flex as="header" w="100%" mb={8} p={8} bg="teal.400" color="white">
      <Text fontSize="2xl">Dogs</Text>
    </Flex>
  );
}
