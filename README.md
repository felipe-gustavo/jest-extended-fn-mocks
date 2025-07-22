# Jest Extended FN Mocks

Enhance `jest.fn()` with custom mockers for more flexible and scoped mocking in your tests.

## Features

- **Scoped mocking**: Temporarily override mock return values or implementations for the duration of a `describe` or `test` block.
- **Merge support**: Optionally merge mock return values across nested scopes.
- **Automatic restoration**: Mocks revert to previous behavior after the block or test ends.

## Installation

```sh
yarn add -D jest-extended-fn-mocks
# or
npm install --save-dev jest-extended-fn-mocks
```

## Usage

Import or require the extension in your Jest setup file:

```ts
// tests/setup.js, jest.setup.js or jest.setup.ts

import 'jest-extended-fn-mocks';
```

Now, all `jest.fn()` mocks have additional methods:

### `mockReturnForDescribe(value, mergeWithPrevious?)`

Temporarily override the return value of a mock for the duration of a `describe` block.

- `value`: The value to return.
- `mergeWithPrevious` (optional): If `true`, merges with the previous return value (useful for objects).

**Example:**

```ts
const myFn = jest.fn().mockReturnForDescribe({ foo: 'foo' });

describe('subtest', () => {
  myFn.mockReturnForDescribe({ bar: 'bar' }, true);

  it('returns merged object', () => {
    expect(myFn()).toStrictEqual({ foo: 'foo', bar: 'bar' });
  });
});
```

### `mockImplementationForDescribe(implementation)`

Temporarily override the mock's implementation for a `describe` block.

**Example:**

```ts
const myFn = jest.fn().mockImplementationForDescribe(() => 'foo');

describe('nested', () => {
  myFn.mockImplementationForDescribe(() => 'bar');

  it('uses nested implementation', () => {
    expect(myFn()).toBe('bar');
  });
});

it('uses original describe implementation', () => {
  expect(myFn()).toBe('foo');
});
```

### `mockReturnForTestcase(value, mergeWithPrevious?)`

Override the return value for a single `test` or `it` block.

**Example:**

```ts
const myFn = jest.fn().mockReturnForDescribe('foo');

it('overrides return for test', () => {
  myFn.mockReturnForTestcase('bar');
  expect(myFn()).toBe('bar');
});

it('returns original describe value', () => {
  expect(myFn()).toBe('foo');
});
```

### `mockImplementationForTestcase(implementation)`

Override the mock's implementation for a single `test` or `it` block.

**Example:**

```ts
const myFn = jest.fn().mockImplementationForDescribe(() => 'foo');

test('uses overridden implementation for test', () => {
  myFn.mockImplementationForTestcase(() => 'bar');
  expect(myFn()).toBe('bar');
});

test('reverts to describe implementation', () => {
  expect(myFn()).toBe('foo');
});
```

## Notes

- **Avoid mixing** these methods with native Jest mocks like `mockReturnValueOnce`, `mockImplementation`, etc., as they may conflict.
- All overrides are automatically reverted after the relevant block or test.
