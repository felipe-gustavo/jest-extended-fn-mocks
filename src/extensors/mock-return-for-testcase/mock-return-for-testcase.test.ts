import { mergeDeepLeft } from 'ramda'

import { BACKUP_TESTCASE_VALUES } from './backup-testcase-values'
import { mockReturnForTestcase } from './mock-return-for-testcase'

jest.mock('ramda')

const fn = {
  getMockImplementation: jest.fn(),
  mockImplementation: jest.fn(),
}

const mockReturnForTestcaseBind = mockReturnForTestcase.bind(c<jest.Mock>(fn))

describe('mockReturnForTestcase', () => {
  beforeEach(() => {
    BACKUP_TESTCASE_VALUES.clear()
  })
  it('stores previous implementation in BACKUP_TESTCASE_VALUES', () => {
    const previousImplementation = 'previous-implementation'
    fn.getMockImplementation.mockReturnValue(previousImplementation)

    mockReturnForTestcaseBind('some-value')

    expect(BACKUP_TESTCASE_VALUES.get(c<jest.Mock>(fn))).toBe(
      previousImplementation,
    )
  })
  it('does not store previous implementation if it already exists', () => {
    const previousImplementation = 'previous-implementation'
    BACKUP_TESTCASE_VALUES.set(
      c<jest.Mock>(fn),
      c<() => null>(previousImplementation),
    )
    fn.getMockImplementation.mockReturnValue('another-previous-implementation')

    mockReturnForTestcaseBind('some-value')

    expect(BACKUP_TESTCASE_VALUES.get(c<jest.Mock>(fn))).toBe(
      previousImplementation,
    )
  })
  it('calls mockImplementation with a new implementation', () => {
    mockReturnForTestcaseBind('some-value')

    expect(fn.mockImplementation).toHaveBeenCalledWith(expect.any(Function))
  })
  describe('when running new implementation', () => {
    describe('when mergeWithPrevious is true', () => {
      it('merges the new value with the previous implementation using mergeDeepLeft', () => {
        const previousValue = { someKey: 'some-value' }
        const newValue = { someAnotherKey: 'some-new-value' }
        j(mergeDeepLeft).mockReturnValueOnce('some-merged-value')

        fn.getMockImplementation.mockReturnValueOnce(() => previousValue)

        mockReturnForTestcaseBind(newValue, true)

        const mockFn = fn.mockImplementation.mock.lastCall[0]
        expect(mockFn()).toBe('some-merged-value')
        expect(mergeDeepLeft).toHaveBeenCalledWith(newValue, previousValue)
      })
      describe('when mergeWithPrevious is false', () => {
        it('returns new value', () => {
          const newValue = 'some-new-value'

          mockReturnForTestcaseBind(newValue, false)

          const mockFn = fn.mockImplementation.mock.lastCall[0]
          expect(mockFn()).toBe(newValue)
        })
      })
    })
  })
})
