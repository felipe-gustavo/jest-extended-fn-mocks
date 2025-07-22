import { mergeDeepLeft } from 'ramda'

import { BACKUP_TESTCASE_VALUES } from './backup-testcase-values'

export function mockReturnForTestcase(
  this: jest.Mock,
  value: unknown,
  mergeWithPrevious = false,
) {
  const lastImplementation = this.getMockImplementation()

  if (!BACKUP_TESTCASE_VALUES.has(this))
    BACKUP_TESTCASE_VALUES.set(this, lastImplementation)

  this.mockImplementation(() => {
    const lastValue = mergeWithPrevious && lastImplementation?.()

    if (value instanceof Object && lastValue instanceof Object) {
      return mergeDeepLeft(value, lastValue)
    }

    return value
  })

  return this
}
