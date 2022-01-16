import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Dog } from '../types';

export default function DogCard({
  id,
  breed,
  age,
  description,
  owner,
  onDelete,
  onUpdate,
  ...boxProps
}: Dog & BoxProps & { onDelete: () => void; onUpdate: () => void }) {
  const { imageUrl } = useDogImage(id, breed);
  return (
    <Box
      bg="white"
      boxShadow="2xl"
      rounded="md"
      p={6}
      overflow="hidden"
      {...boxProps}
    >
      <Box bg="gray.100" mt={-6} mx={-6} mb={6} pos="relative">
        <Image src={imageUrl} objectFit="cover" height="200px" />
      </Box>
      <Stack>
        <Text
          color="green.500"
          textTransform="uppercase"
          fontWeight={700}
          fontSize="sm"
          letterSpacing={1.1}
        >
          {breed}
        </Text>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          {age}
        </Heading>
        <Text color="gray.500">{description}</Text>
        <Stack direction="row" spacing={1} fontSize="sm">
          <Text fontWeight={600}>Owner</Text>
          <Text color="gray.500">{owner}</Text>
        </Stack>
      </Stack>
      <Stack mt={6} direction="row" spacing={4} align="center">
        <IconButton
          aria-label="edit button"
          isRound
          varian="ghost"
          onClick={onUpdate}
          icon={<EditIcon />}
        />
        <IconButton
          aria-label="delete button"
          isRound
          varian="ghost"
          onClick={onDelete}
          icon={<DeleteIcon />}
        />
      </Stack>
    </Box>
  );
}

function useDogImage(dogId: string, breed: string) {
  const { data, ...rest } = useQuery<{ message: string }, Error>(
    ['getDogImage', breed, dogId],
    async () => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      return await response.json();
    }
  );
  return { imageUrl: data?.message, ...rest };
}
