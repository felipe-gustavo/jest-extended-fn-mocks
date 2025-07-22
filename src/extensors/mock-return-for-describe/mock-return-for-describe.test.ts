import { mergeDeepLeft } from 'ramda'

import { mockReturnForDescribe } from './mock-return-for-describe'

import { getLastCallbackFromJestHook, mockJestHook } from 'tests/helpers'

jest.mock('ramda')

const mocks = {
  beforeEach: mockJestHook('beforeEach'),
  beforeAll: mockJestHook('beforeAll'),
  afterEach: mockJestHook('afterEach'),
  afterAll: mockJestHook('afterAll'),
}

const fn = {
  getMockImplementation: jest.fn(),
  mockImplementation: jest.fn(),
}
const mockReturnForDescribeBind = mockReturnForDescribe.bind(c<jest.Mock>(fn))

describe('mockImplementationForDescribe', () => {
  it('calls getMockImplementation with beforeAll', () => {
    mockReturnForDescribeBind('some-value')
    const callback = getLastCallbackFromJestHook(mocks.beforeAll)
    callback()
    expect(fn.getMockImplementation).toHaveBeenCalled()
  })
  describe('when running beforeEach', () => {
    it('calls getMockImplementation', () => {
      mockReturnForDescribeBind('some-value')
      const callback = getLastCallbackFromJestHook(mocks.beforeEach)
      callback()
      expect(fn.getMockImplementation).toHaveBeenCalled()
    })
    it('mocks fn with new implementation', () => {
      mockReturnForDescribeBind('some-value')
      const callback = getLastCallbackFromJestHook(mocks.beforeEach)
      callback()
      expect(fn.mockImplementation).toHaveBeenCalledWith(expect.any(Function))
    })
    describe('when running new implementation', () => {
      describe('when mergeWithPrevious is true', () => {
        it('merges the new value with the previous implementation using mergeDeepLeft', () => {
          const previousValue = { someKey: 'some-value' }
          const newValue = { someAnotherKey: 'some-new-value' }
          j(mergeDeepLeft).mockReturnValueOnce('some-merged-value')

          fn.getMockImplementation.mockReturnValueOnce(() => previousValue)

          mockReturnForDescribeBind(newValue, true)

          const callback = getLastCallbackFromJestHook(mocks.beforeEach)
          callback()

          const mockFn = fn.mockImplementation.mock.lastCall[0]
          expect(mockFn()).toBe('some-merged-value')
          expect(mergeDeepLeft).toHaveBeenCalledWith(newValue, previousValue)
        })
        describe('when mergeWithPrevious is false', () => {
          it('returns new value', () => {
            const newValue = 'some-new-value'

            mockReturnForDescribeBind(newValue, false)

            const callback = getLastCallbackFromJestHook(mocks.beforeEach)
            callback()

            const mockFn = fn.mockImplementation.mock.lastCall[0]
            expect(mockFn()).toBe(newValue)
          })
        })
      })
    })
  })
  describe('when run afterAll', () => {
    it('mocks fn with the first implementation gotten on beforeAll', () => {
      fn.getMockImplementation.mockReturnValueOnce('some-implementation')

      mockReturnForDescribeBind('some-value')

      const beforeAllCallback = getLastCallbackFromJestHook(mocks.beforeAll)
      const afterAllCallback = getLastCallbackFromJestHook(mocks.afterAll)

      beforeAllCallback()
      afterAllCallback()

      expect(fn.mockImplementation).toHaveBeenCalledWith('some-implementation')
    })
  })
  describe('when run afterEach', () => {
    it('mock fn with the previous implementation gotten on beforeEach', () => {
      fn.getMockImplementation.mockReturnValueOnce('some-implementation')

      mockReturnForDescribeBind('some-value')

      const beforeEachCallback = getLastCallbackFromJestHook(mocks.beforeEach)
      const afterEachCallback = getLastCallbackFromJestHook(mocks.afterEach)

      beforeEachCallback()
      afterEachCallback()

      expect(fn.mockImplementation).toHaveBeenCalledWith('some-implementation')
    })
  })
})
