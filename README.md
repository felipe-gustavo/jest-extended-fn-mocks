# Jest Extended FN Mocks

<a href="https://www.npmjs.com/package/jest-extended-fn-mocks"><img src="https://img.shields.io/npm/v/jest-extended-fn-mocks" alt="npm version"></a>

Enhance `jest.fn()` with custom mockers for more flexible and scoped mocking in your tests.

---

## Why Jest Extended FN Mocks

Mocking functions in Jest can quickly become messy—especially as your test suite grows. Have you ever found yourself juggling `mockReturnValue`, `mockImplementation`, `mockReturnValueOnce`, and endless `mockReset` or `mockRestore` calls, just to keep your mocks in sync with your test scopes? It’s easy to lose track of which mock is active, accidentally leak state between tests, or overwrite a mock you still need elsewhere.

Jest Extended FN Mocks helps you keep your mocks coherent and predictable. It lets you scope mock return values and implementations to specific `describe` or `test` blocks, so you can confidently override behavior for just the tests you want—without worrying about cleanup or side effects. No more manual resets or accidental cross-test pollution: your mocks always revert to their previous state automatically.

With this extension, you can focus on what your tests should do, not on wrangling your mocks.

---

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
