import faker from 'faker';

export const BREEDS = [
  'maltese',
  'corgi',
  'pug',
  'bulldog/french',
  'pomeranian',
  'shiba',
  'sheepdog/shetland',
];

export function createRandomDog() {
  return {
    breed: faker.helpers.randomize(BREEDS),
    age: faker.datatype.number(13),
    description: faker.lorem.words(5),
    owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
}
