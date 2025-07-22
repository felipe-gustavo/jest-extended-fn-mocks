/// <reference types="jest" />

declare global {
  namespace jest {
    interface MockInstance {
      /**
       * Temporarily overrides the return value of a mock for the duration of a `describe` block.
       *
       * Once the `describe` block completes, the mock reverts to its previous return value or implementation.
       *
       * NOTE: **Avoid mixing** this method with native Jest mocks like `mockReturnValueOnce`, `mockImplementation`, etc.,
       * as they can conflict and produce unexpected results.
       *
       * @example
       * ```ts
       * const myFn = jest.fn().mockReturnForDescribe('foo');
       *
       * describe('conditional case', () => {
       *   myFn.mockReturnForDescribe('bar');
       *
       *   it('returns bar', () => {
       *     expect(myFn()).toBe('bar');
       *   });
       * });
       *
       * it('returns foo', () => {
       *   expect(myFn()).toBe('foo');
       * });
       * ```
       *
       * @param value - The value to return from the mock during the `describe` block.
       */
      mockReturnForDescribe(value: unknown): this

      /**
       * Same as `mockReturnForDescribe`, but merges the given object with the return value from any parent `describe`.
       *
       * Useful for building on top of a default mock return across nested `describe` blocks.
       *
       * NOTE: **Avoid mixing** this method with native Jest mocks like `mockReturnValueOnce`, `mockImplementation`, etc.,
       * as they can conflict and produce unexpected results.
       *
       * @example
       * ```ts
       * const myFn = jest.fn().mockReturnForDescribe({ foo: 'foo' });
       *
       * describe('subtest', () => {
       *   myFn.mockReturnForDescribe({ bar: 'bar' }, true);
       *
       *   it('returns merged object', () => {
       *     expect(myFn()).toStrictEqual({ foo: 'foo', bar: 'bar' });
       *   });
       * });
       * ```
       *
       * @param value - The value to return.
       * @param mergeWithPrevious - If `true`, merges the new value with the previous one.
       */
      mockReturnForDescribe(value: unknown, mergeWithPrevious: boolean): this

      /**
       * Temporarily overrides the mock's implementation function for the duration of a `describe` block.
       *
       * After the block finishes, the previous implementation is restored.
       *
       * NOTE: **Avoid mixing** this method with native Jest mocks like `mockImplementation`, `mockReturnValueOnce`, etc.
       *
       * @example
       * ```ts
       * const myFn = jest.fn().mockImplementationForDescribe(() => 'foo');
       *
       * describe('nested', () => {
       *   myFn.mockImplementationForDescribe(() => 'bar');
       *
       *   it('uses nested implementation', () => {
       *     expect(myFn()).toBe('bar');
       *   });
       * });
       *
       * it('uses original describe implementation', () => {
       *   expect(myFn()).toBe('foo');
       * });
       * ```
       *
       * @param implementation - The mock implementation to use within the `describe` block.
       */
      mockImplementationForDescribe(
        implementation: import('@/types/helpers').ImplementationFn,
      ): this

      /**
       * Temporarily overrides the return value of a mock for the duration of a `test` or `it` block.
       *
       * Once the test case ends, the mock is restored to its previous behavior.
       *
       * NOTE: **Avoid mixing** this method with native Jest mocks like `mockReturnValueOnce`, `mockImplementation`, etc.
       *
       * @example
       * ```ts
       * const myFn = jest.fn().mockReturnForDescribe('foo');
       *
       * it('overrides return for test', () => {
       *   myFn.mockReturnForTestcase('bar');
       *   expect(myFn()).toBe('bar');
       * });
       *
       * it('returns original describe value', () => {
       *   expect(myFn()).toBe('foo');
       * });
       * ```
       *
       * @param value - The value to return during the test case.
       */
      mockReturnForTestcase(value: unknown): this

      /**
       * Same as `mockReturnForTestcase`, but merges the given object with the return value from the outer scope.
       *
       * Useful for composing mock returns across describe + test levels.
       *
       * NOTE: **Avoid mixing** this method with native Jest mocks like `mockReturnValueOnce`, `mockImplementation`, etc.
       *
       * @example
       * ```ts
       * const myFn = jest.fn().mockReturnForDescribe({ foo: 'foo' });
       *
       * it('returns merged object', () => {
       *   myFn.mockReturnForTestcase({ bar: 'bar' }, true);
       *   expect(myFn()).toStrictEqual({ foo: 'foo', bar: 'bar' });
       * });
       * ```
       *
       * @param value - The value to return.
       * @param mergeWithPrevious - If `true`, merges with existing return value.
       */
      mockReturnForTestcase(value: unknown, mergeWithPrevious: boolean): this

      /**
       * Temporarily overrides the mock's implementation function for the duration of a single test (`it` or `test`).
       *
       * After the test finishes, the previous implementation is restored.
       *
       * NOTE: **Avoid mixing** this method with native Jest mocks like `mockImplementation`, `mockReturnValueOnce`, etc.
       *
       * @example
       * ```ts
       * const myFn = jest.fn().mockImplementationForDescribe(() => 'foo');
       *
       * test('uses overridden implementation for test', () => {
       *   myFn.mockImplementationForTestcase(() => 'bar');
       *   expect(myFn()).toBe('bar');
       * });
       *
       * test('reverts to describe implementation', () => {
       *   expect(myFn()).toBe('foo');
       * });
       * ```
       *
       * @param implementation - The mock implementation to use for the test case.
       */
      mockImplementationForTestcase(
        implementation: import('@/types/helpers').ImplementationFn,
      ): this
    }
  }
}
