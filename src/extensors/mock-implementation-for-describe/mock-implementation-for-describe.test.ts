import { mockImplementationForDescribe } from './mock-implementation-for-describe'

import { getLastCallbackFromJestHook, mockJestHook } from 'tests/helpers'

const mocks = {
  beforeEach: mockJestHook('beforeEach'),
  beforeAll: mockJestHook('beforeAll'),
  afterEach: mockJestHook('afterEach'),
  afterAll: mockJestHook('afterAll'),
}

const newImpl = () => null

const fn = {
  getMockImplementation: jest.fn(),
  mockImplementation: jest.fn(),
}
const mockImplementationForDescribeBind = mockImplementationForDescribe.bind(
  c<jest.Mock>(fn),
)

describe('mockImplementationForDescribe', () => {
  it('calls getMockImplementation with beforeAll', () => {
    mockImplementationForDescribeBind(newImpl)
    const callback = getLastCallbackFromJestHook(mocks.beforeAll)
    callback()
    expect(fn.getMockImplementation).toHaveBeenCalled()
  })
  describe('when running beforeEach', () => {
    it('calls getMockImplementation', () => {
      mockImplementationForDescribeBind(newImpl)
      const callback = getLastCallbackFromJestHook(mocks.beforeEach)
      callback()
      expect(fn.getMockImplementation).toHaveBeenCalled()
    })
    it('mocks fn with new implementation', () => {
      mockImplementationForDescribeBind(newImpl)
      const callback = getLastCallbackFromJestHook(mocks.beforeEach)
      callback()
      expect(fn.mockImplementation).toHaveBeenCalledWith(newImpl)
    })
  })
  describe('when run afterAll', () => {
    it('mocks fn with the first implementation gotten on beforeAll', () => {
      fn.getMockImplementation.mockReturnValueOnce('some-implementation')

      mockImplementationForDescribeBind(newImpl)

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

      mockImplementationForDescribeBind(newImpl)

      const beforeEachCallback = getLastCallbackFromJestHook(mocks.beforeEach)
      const afterEachCallback = getLastCallbackFromJestHook(mocks.afterEach)

      beforeEachCallback()
      afterEachCallback()

      expect(fn.mockImplementation).toHaveBeenCalledWith('some-implementation')
    })
  })
})
