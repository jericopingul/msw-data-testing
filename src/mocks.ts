import { BASE_URL } from './config';
import { Dog } from './types';
import { type DefaultRequestBody, rest, PathParams, setupWorker } from 'msw';
import { factory, primaryKey } from '@mswjs/data';
import faker from 'faker';

const BREEDS = [
  'maltese',
  'corgi',
  'pug',
  'bulldog/french',
  'pomeranian',
  'shiba',
  'sheepdog/shetland',
];

const modelDictionary = {
  dog: {
    id: primaryKey(faker.datatype.uuid),
    breed: () => faker.helpers.randomize(BREEDS),
    age: () => faker.datatype.number(13),
    description: () => faker.lorem.words(5),
    owner: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
};

const db = factory(modelDictionary);

function seedDb() {
  for (let i = 0; i < 4; i++) {
    db.dog.create({ breed: BREEDS[i % BREEDS.length] });
  }
}

export const handlers = [
  rest.get<DefaultRequestBody, PathParams, Dog[]>(
    '/api/dogs',
    (_req, res, ctx) => {
      return res(ctx.json(db.dog.getAll()));
    }
  ),
  rest.post<DefaultRequestBody, PathParams, Dog>(
    '/api/dogs',
    (_req, res, ctx) => {
      const created = db.dog.create();
      return res(ctx.json(created));
    }
  ),
  rest.delete<DefaultRequestBody, { id: string }, Dog>(
    '/api/dogs/:id',
    (req, res, ctx) => {
      db.dog.delete({ where: { id: { equals: req.params.id } } });
      return res(ctx.status(204));
    }
  ),
  rest.put<DefaultRequestBody, { id: string }, Dog>(
    '/api/dogs/:id',
    (req, res, ctx) => {
      const updated = db.dog.update({
        where: { id: { equals: req.params.id } },
        data: {
          breed: faker.helpers.randomize(BREEDS),
          age: faker.datatype.number(13),
          description: faker.lorem.words(5),
          owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
        },
      });
      return res(ctx.json(updated!));
    }
  ),
];

export function setupBrowserMock() {
  seedDb();
  setupWorker(...handlers).start();
}
