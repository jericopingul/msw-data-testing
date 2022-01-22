import { Button, Flex, Grid, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Layout from './Layout';
import { Dog } from '../types';
import DogCard from './DogCard';
import Loading from './Loading';
import { createRandomDog } from '../helpers';

export default function Dogs() {
  const { dogs, isLoading } = useGetAllDogs();
  const { create, isLoading: isCreating } = useCreateDog();
  const { deleteDog } = useDeleteDog();
  const { update } = useUpdateDog();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Flex justifyContent="flex-end">
        <Button
          disabled={isCreating}
          isLoading={isCreating}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={() => create()}
        >
          Add
        </Button>
      </Flex>
      <Grid
        mt="4"
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={6}
        as="ul"
      >
        {dogs?.map((dog) => (
          <DogCard
            as="li"
            key={dog.id}
            {...dog}
            onDelete={() => deleteDog(dog.id)}
            onUpdate={() => update(dog.id)}
          />
        ))}
      </Grid>
    </Layout>
  );
}

function useUpdateDog() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation<Dog, Error, string>(
    async (dogId: string) => {
      const response = await axios(`/api/dogs/${dogId}`, {
        method: 'PUT',
        // imagine getting this data from a form
        data: createRandomDog(),
      });
      return await response.data;
    },
    {
      onSuccess: ({ breed }) => {
        toast({
          status: 'success',
          title: `Updated dog to a ${breed} 🐶`,
        });
        queryClient.invalidateQueries('getAllDogs');
      },
    }
  );
  return { update: mutate, ...rest };
}

function useDeleteDog() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation<unknown, Error, string>(
    (dogId: string) =>
      axios(`/api/dogs/${dogId}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => {
        toast({
          status: 'success',
          title: 'Deleted a dog 🐶',
        });
        queryClient.invalidateQueries('getAllDogs');
      },
    }
  );
  return { deleteDog: mutate, ...rest };
}

function useCreateDog() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation<Dog>(
    async () => {
      const response = await axios('/api/dogs', {
        method: 'POST',
        // imagine getting this data from a form
        data: createRandomDog(),
      });
      return await response.data;
    },
    {
      onSuccess: ({ breed }) => {
        toast({
          status: 'success',
          title: `Added a new ${breed} dog 🐶`,
        });
        queryClient.invalidateQueries('getAllDogs');
      },
    }
  );
  return { create: mutate, ...rest };
}

function useGetAllDogs() {
  const { data: dogs, ...rest } = useQuery<Dog[], Error>(
    'getAllDogs',
    async () => {
      const response = await axios(`/api/dogs`);
      return await response.data;
    }
  );
  return { dogs, ...rest };
}
