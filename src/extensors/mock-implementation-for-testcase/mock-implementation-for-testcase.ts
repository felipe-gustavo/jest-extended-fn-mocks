import { BACKUP_TESTCASE_VALUES } from './backup-testcase-values'

import { ImplementationFn } from '@/types/helpers'

export function mockImplementationForTestcase(
  this: jest.Mock,
  implementation: NonNullable<ImplementationFn>,
) {
  const previousImplementation = this.getMockImplementation()

  if (!BACKUP_TESTCASE_VALUES.has(this))
    BACKUP_TESTCASE_VALUES.set(this, previousImplementation)

  return this.mockImplementation(implementation)
}
