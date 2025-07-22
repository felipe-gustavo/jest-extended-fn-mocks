import { BACKUP_TESTCASE_VALUES } from './backup-testcase-values'

export const setup = () =>
  afterEach(() => {
    for (const fn of BACKUP_TESTCASE_VALUES.keys()) {
      fn.mockImplementation(BACKUP_TESTCASE_VALUES.get(fn))
    }
    BACKUP_TESTCASE_VALUES.clear()
  })
