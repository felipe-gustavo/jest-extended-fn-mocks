import { BACKUP_TESTCASE_VALUES } from './backup-testcase-values'
import { setup } from './setup-testcase-mock'

import { getLastCallbackFromJestHook, mockJestHook } from 'tests/helpers'

const mocks = {
  afterEach: mockJestHook('afterEach'),
}

const mapClearMock = jest
  .spyOn(BACKUP_TESTCASE_VALUES, 'clear')
  .mockImplementation(() => null)

const fn = {
  mockImplementation: jest.fn(),
}

const impl = () => null

BACKUP_TESTCASE_VALUES.set(c<jest.Mock>(fn), impl)

describe('mock-implementation-for-testcase/setup', () => {
  it('calls afterEach to restore mock implementations', () => {
    setup()

    const callback = getLastCallbackFromJestHook(mocks.afterEach)
    callback()

    expect(fn.mockImplementation).toHaveBeenCalledWith(impl)
    expect(mapClearMock).toHaveBeenCalled()
  })
})
