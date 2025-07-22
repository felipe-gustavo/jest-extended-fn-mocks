import { BACKUP_TESTCASE_VALUES } from './backup-testcase-values'
import { mockImplementationForTestcase } from './mock-implementation-for-testcase'

const fn = {
  getMockImplementation: jest.fn(),
  mockImplementation: jest.fn(),
}

const mockImplementationForTestcaseBind = mockImplementationForTestcase.bind(
  c<jest.Mock>(fn),
)

const newImpl = () => null

describe('mockImplementationForTestcase', () => {
  beforeEach(() => {
    BACKUP_TESTCASE_VALUES.clear()
  })
  it('stores previous implementation in BACKUP_TESTCASE_VALUES', () => {
    const previousImplementation = 'previous-implementation'
    fn.getMockImplementation.mockReturnValue(previousImplementation)

    mockImplementationForTestcaseBind(newImpl)

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

    mockImplementationForTestcaseBind(newImpl)

    expect(BACKUP_TESTCASE_VALUES.get(c<jest.Mock>(fn))).toBe(
      previousImplementation,
    )
  })
  it('calls mockImplementation with the new implementation', () => {
    mockImplementationForTestcaseBind(newImpl)

    expect(fn.mockImplementation).toHaveBeenCalledWith(newImpl)
  })
})
