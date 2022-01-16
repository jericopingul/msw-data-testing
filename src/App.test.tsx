import {
  test,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import App from './App';
import { handlers, seedDb } from './mocks';

function setupTestsMock() {
  seedDb();
  return setupServer(...handlers);
}
const server = setupTestsMock();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

afterAll(() => {
  server.close();
});

test('Displays 2 dogs initially', async () => {
  render(<App />);
  await screen.findByRole('button', { name: /add/i });
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('Removes a dog', async () => {
  render(<App />);
  const deleteDogButton = await screen.findByRole('button', {
    name: /delete jerico's dog/i,
  });
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  userEvent.click(deleteDogButton);
  waitForElementToBeRemoved(deleteDogButton);
  await screen.findByRole('alert', { name: /deleted a dog/i });
  waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1));
});

test('Updates a dog', async () => {
  render(<App />);
  const editButton = await screen.findByRole('button', {
    name: /update jerry's dog/i,
  });
  userEvent.click(editButton);
  await screen.findByRole('alert', { name: /updated dog/i });
  waitFor(() => expect(editButton.ariaLabel).not.toBe("update Jerry's dog"));
});

test('Create a dog', async () => {
  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  const initialListItemsLength = listItems.length;
  userEvent.click(screen.getByRole('button', { name: /add/i }));
  await screen.findByRole('alert', { name: /added/i });
  waitFor(() => expect(listItems).toHaveLength(initialListItemsLength + 1));
});
