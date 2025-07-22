import '@/'

const fn = jest.fn() as unknown as {
  (): string | undefined
  mockReturnForDescribe: (value: unknown, override?: boolean) => void
  mockReturnForTestcase: (value: unknown, override?: boolean) => void
  mockImplementationForDescribe: (fn: () => string) => void
  mockImplementationForTestcase: (fn: () => string) => void
}

describe('mock-integration', () => {
  describe('when mocking simple values', () => {
    describe('foo', () => {
      fn.mockReturnForDescribe('foo')
      it('returns foo', () => {
        expect(fn()).toBe('foo')
      })
    })
    describe('bar', () => {
      fn.mockReturnForDescribe('bar')
      it('returns bar', () => {
        expect(fn()).toBe('bar')
      })
    })
  })
  describe('when mocking objects', () => {
    describe('foo', () => {
      fn.mockReturnForDescribe({ foo: 'foo' })
      describe('bar', () => {
        fn.mockReturnForDescribe({ bar: 'bar' }, true)
        it('returns foo and bar value', () => {
          expect(fn()).toStrictEqual({
            foo: 'foo',
            bar: 'bar',
          })
        })
        describe('foobar', () => {
          fn.mockReturnForDescribe({ foobar: 'foobar' }, true)
          it('returns foo and bar value', () => {
            expect(fn()).toStrictEqual({
              foo: 'foo',
              bar: 'bar',
              foobar: 'foobar',
            })
          })
        })
      })
      it('returns bar as and foo as foo', () => {
        fn.mockReturnForTestcase({ bar: 'bar' }, true)
        expect(fn()).toStrictEqual({
          foo: 'foo',
          bar: 'bar',
        })
      })
    })
    it('returns undefined when out of describe mocks', () => {
      expect(fn()).toBeUndefined()
    })
  })
  describe('mock implementation', () => {
    describe('when mocking simple values', () => {
      describe('foo', () => {
        fn.mockImplementationForDescribe(() => 'foo')
        it('returns foo', () => {
          expect(fn()).toBe('foo')
        })
      })
      describe('bar', () => {
        fn.mockImplementationForDescribe(() => 'bar')
        it('returns bar', () => {
          expect(fn()).toBe('bar')
        })
      })
    })
    describe('when mixing testcases and describes', () => {
      fn.mockImplementationForDescribe(() => 'foo')
      it('returns foo', () => {
        expect(fn()).toBe('foo')
      })
      it('overrides mock with implementation', () => {
        fn.mockImplementationForTestcase(() => 'bar')
        expect(fn()).toBe('bar')
      })
      it('overrides mock with return', () => {
        fn.mockReturnForTestcase('foobar')
        expect(fn()).toBe('foobar')
      })
      it('keeps returning foo after it override runs', () => {
        expect(fn()).toBe('foo')
      })
    })
  })
})
